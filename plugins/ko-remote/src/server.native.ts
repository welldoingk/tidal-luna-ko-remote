import { BrowserWindow } from "electron";
import { createServer, type IncomingMessage, type Server, type ServerResponse } from "http";
import { get as httpsGet } from "https";
import { setDefaultAutoSelectFamily } from "net";
import { networkInterfaces } from "os";
import { WebSocket, WebSocketServer } from "ws";
import { REMOTE_UI_HTML } from "./remoteUiHtml";
import type { RemoteCommandPayload, RemotePlaybackState } from "./types";

try {
	setDefaultAutoSelectFamily(false);
} catch {}

export async function nativeFetchJson<T>(url: string, headers: Record<string, string> = {}, timeoutMs = 6000): Promise<T | null> {
	return new Promise((resolve) => {
		try {
			const req = httpsGet(
				url,
				{
					family: 4,
					timeout: timeoutMs,
					headers: {
						Accept: "application/json",
						"User-Agent": "TidaLunaKoRemote/1.0.0 (https://github.com/welldoingk/tidal-luna-ko-remote)",
						...headers,
					},
				},
				(res) => {
					if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
						res.resume();
						resolve(null);
						return;
					}
					let raw = "";
					res.setEncoding("utf8");
					res.on("data", (chunk) => (raw += chunk));
					res.on("end", () => {
						try {
							resolve(JSON.parse(raw) as T);
						} catch {
							resolve(null);
						}
					});
				},
			);
			req.on("timeout", () => {
				req.destroy();
				resolve(null);
			});
			req.on("error", () => resolve(null));
		} catch {
			resolve(null);
		}
	});
}

let server: Server | null = null;
let wss: WebSocketServer | null = null;
let pingTimer: ReturnType<typeof setInterval> | null = null;
let currentPort = 24123;
let currentHost = "0.0.0.0";
let authToken = "";

let latestState: RemotePlaybackState = {
	playing: false,
	playbackState: "IDLE",
	currentTime: 0,
	duration: 0,
	volume: 100,
	muted: false,
	shuffle: false,
	repeatMode: 0,
	trackId: "",
	title: "재생 중인 곡 없음",
	originalTitle: "",
	artist: "-",
	originalArtist: "",
	album: "",
	originalAlbum: "",
	koTitle: null,
	koArtist: null,
	isKorean: false,
	metaSource: "none",
	coverUrl: "",
	isrc: "",
	audioQuality: "LOSSLESS",
	lyrics: null,
	queue: [],
	currentIndex: 0,
	updatedAt: Date.now(),
};

function getTidalWindow(): BrowserWindow | undefined {
	const all = BrowserWindow.getAllWindows();
	return all.find((w) => !w.isDestroyed()) ?? BrowserWindow.fromId(1) ?? undefined;
}

async function invokeRendererCommand(payload: RemoteCommandPayload): Promise<unknown> {
	const win = getTidalWindow();
	if (!win) {
		return { ok: false, error: "TIDAL window not found" };
	}
	try {
		const res = await win.webContents.executeJavaScript(
			`window.__koRemoteInvokeCommand?.(${JSON.stringify(payload)})`,
		);
		return res;
	} catch (err) {
		console.error("[KoRemote.native] invokeRendererCommand error:", err);
		return { ok: false, error: err instanceof Error ? err.message : String(err) };
	}
}

function extractToken(req: IncomingMessage, url: URL): string {
	const queryToken = url.searchParams.get("token");
	if (queryToken) return queryToken.trim();
	const customHeader = req.headers["x-ko-token"];
	if (typeof customHeader === "string" && customHeader.trim()) return customHeader.trim();
	const headerAuth = req.headers["authorization"];
	if (typeof headerAuth === "string" && headerAuth.trim()) {
		return headerAuth.replace(/^Bearer\s+/i, "").trim();
	}
	return "";
}

function checkToken(req: IncomingMessage, url: URL): boolean {
	if (!authToken || !authToken.trim()) return true;
	const expected = authToken.trim();
	return extractToken(req, url) === expected;
}

function parseJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
	return new Promise((resolve, reject) => {
		let raw = "";
		req.on("data", (chunk) => {
			raw += chunk;
			if (raw.length > 1_000_000) {
				reject(new Error("Payload too large"));
			}
		});
		req.on("end", () => {
			try {
				resolve(raw ? JSON.parse(raw) : {});
			} catch (err) {
				reject(err);
			}
		});
		req.on("error", reject);
	});
}

function sendJson(res: ServerResponse, status: number, data: unknown) {
	res.writeHead(status, {
		"Content-Type": "application/json; charset=utf-8",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization, X-Ko-Token",
	});
	res.end(JSON.stringify(data));
}

function broadcastState() {
	if (!wss) return;
	const msg = JSON.stringify({ type: "state", state: latestState });
	for (const client of wss.clients) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(msg);
		}
	}
}

async function handleHttpRequest(req: IncomingMessage, res: ServerResponse) {
	const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

	if (req.method === "OPTIONS") {
		res.writeHead(204, {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization, X-Ko-Token",
		});
		res.end();
		return;
	}

	// Always allow serving the HTML UI shell (contains no user/playback data)
	// Injects whether token authentication is enabled so the UI immediately renders ONLY the token screen when required.
	if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
		const tokenRequired = Boolean(authToken && authToken.trim());
		const isAuthorized = checkToken(req, url);
		const html = REMOTE_UI_HTML.replace("__KO_TOKEN_REQUIRED__", tokenRequired ? "true" : "false").replace(
			"__KO_INITIAL_AUTH__",
			isAuthorized ? "true" : "false",
		);
		res.writeHead(200, {
			"Content-Type": "text/html; charset=utf-8",
			"Cache-Control": "no-store",
		});
		res.end(html);
		return;
	}

	if (!checkToken(req, url)) {
		sendJson(res, 401, { ok: false, error: "Unauthorized (Invalid or missing token)" });
		return;
	}

	if (req.method === "GET" && url.pathname === "/api/state") {
		sendJson(res, 200, { ok: true, state: latestState });
		return;
	}

	if (req.method === "GET" && url.pathname === "/api/network") {
		sendJson(res, 200, { ok: true, urls: await getLocalConnectUrls() });
		return;
	}

	if (req.method === "POST" && (url.pathname === "/api/command" || url.pathname.startsWith("/api/"))) {
		try {
			const body = await parseJsonBody(req);
			const pathAction =
				url.pathname !== "/api/command" ? url.pathname.replace(/^\/api\//, "") : undefined;
			const action = (body.action || pathAction) as RemoteCommandPayload["action"];
			if (!action) {
				sendJson(res, 400, { ok: false, error: "Missing action" });
				return;
			}
			const payload: RemoteCommandPayload = { ...(body as any), action };
			const result = await invokeRendererCommand(payload);
			sendJson(res, 200, { ok: true, action, data: result, state: latestState });
		} catch (err) {
			sendJson(res, 400, {
				ok: false,
				error: err instanceof Error ? err.message : "Bad request",
			});
		}
		return;
	}

	sendJson(res, 404, { ok: false, error: "Not found" });
}

export async function startRemoteServer(
	port: number = 24123,
	host: string = "0.0.0.0",
	token: string = "",
): Promise<{ ok: boolean; port: number; urls: string[]; error?: string }> {
	const nextPort = Number(port) || 24123;
	const nextHost = (host || "0.0.0.0").trim();
	const nextToken = (token || "").trim();

	// If server is already listening on the same host & port, update token in-place without restarting!
	if (server && server.listening && currentPort === nextPort && currentHost === nextHost) {
		authToken = nextToken;
		if (wss && authToken) {
			for (const client of wss.clients) {
				const usedToken = (client as any).__authTokenUsed || "";
				if (usedToken !== authToken) {
					try {
						client.send(JSON.stringify({ type: "auth_required", error: "Unauthorized" }));
						client.close(1008, "Unauthorized");
					} catch {}
				}
			}
		}
		const urls = await getLocalConnectUrls();
		return { ok: true, port: currentPort, urls };
	}

	// Clean up any previous server instance (including across TidaLuna plugin hot-reloads/updates)
	try {
		const prevCleanup = (BrowserWindow as any).__koRemoteServerCleanup;
		if (typeof prevCleanup === "function" && prevCleanup !== stopRemoteServer) {
			await prevCleanup();
		}
	} catch {}

	await stopRemoteServer();
	currentPort = nextPort;
	currentHost = nextHost;
	authToken = nextToken;

	return new Promise((resolve) => {
		try {
			const httpServer = createServer((req, res) => {
				handleHttpRequest(req, res).catch((err) => {
					console.error("[KoRemote.native] HTTP error:", err);
					if (!res.headersSent) sendJson(res, 500, { ok: false, error: "Internal Server Error" });
				});
			});

			const wsServer = new WebSocketServer({ server: httpServer });

			wsServer.on("connection", (ws, req) => {
				const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
				if (!checkToken(req, url)) {
					try {
						ws.send(JSON.stringify({ type: "auth_required", error: "Unauthorized" }));
						ws.close(1008, "Unauthorized");
					} catch {}
					return;
				}

				(ws as any).__authTokenUsed = extractToken(req, url);

				// Send initial state immediately upon connection
				ws.send(JSON.stringify({ type: "state", state: latestState }));

				ws.on("message", async (raw) => {
					try {
						const payload = JSON.parse(raw.toString()) as RemoteCommandPayload & { action?: string };
						if ((payload as any).action === "ping") {
							ws.send(JSON.stringify({ type: "pong" }));
							return;
						}
						if (!payload.action || payload.action === "getState") {
							ws.send(JSON.stringify({ type: "state", state: latestState }));
							return;
						}
						const data = await invokeRendererCommand(payload);
						ws.send(JSON.stringify({ type: "ack", action: payload.action, data, state: latestState }));
					} catch (err) {
						ws.send(
							JSON.stringify({
								type: "error",
								error: err instanceof Error ? err.message : "Invalid message",
							}),
						);
					}
				});
			});

			httpServer.on("error", async (err: any) => {
				console.error("[KoRemote.native] Server error:", err);
				resolve({
					ok: false,
					port: currentPort,
					urls: [],
					error: err?.message || String(err),
				});
			});

			httpServer.listen(currentPort, currentHost, async () => {
				server = httpServer;
				wss = wsServer;
				(BrowserWindow as any).__koRemoteServerCleanup = stopRemoteServer;

				if (pingTimer) clearInterval(pingTimer);
				pingTimer = setInterval(() => {
					if (!wss) return;
					for (const client of wss.clients) {
						if (client.readyState === WebSocket.OPEN) {
							try {
								client.ping();
							} catch {}
						}
					}
				}, 25_000);

				const urls = await getLocalConnectUrls();
				console.log(`[KoRemote.native] Listening on ${currentHost}:${currentPort}`, urls);
				resolve({ ok: true, port: currentPort, urls });
			});
		} catch (err: any) {
			resolve({
				ok: false,
				port: currentPort,
				urls: [],
				error: err?.message || String(err),
			});
		}
	});
}

export async function stopRemoteServer(): Promise<boolean> {
	return new Promise((resolve) => {
		if (pingTimer) {
			clearInterval(pingTimer);
			pingTimer = null;
		}
		if (wss) {
			for (const client of wss.clients) {
				try {
					client.close();
					client.terminate?.();
				} catch {}
			}
			try {
				wss.close();
			} catch {}
			wss = null;
		}
		if (server) {
			const s = server;
			server = null;
			const timer = setTimeout(() => resolve(true), 1000);
			try {
				(s as any).closeAllConnections?.();
				(s as any).closeIdleConnections?.();
				s.close(() => {
					clearTimeout(timer);
					resolve(true);
				});
			} catch {
				clearTimeout(timer);
				resolve(true);
			}
		} else {
			resolve(true);
		}
	});
}

export async function pushRemoteState(partialState: Partial<RemotePlaybackState>): Promise<boolean> {
	latestState = {
		...latestState,
		...partialState,
		updatedAt: Date.now(),
	};
	broadcastState();
	return true;
}

export async function getLocalConnectUrls(): Promise<string[]> {
	const nets = networkInterfaces();
	const urls: string[] = [];
	for (const name of Object.keys(nets)) {
		for (const net of nets[name] ?? []) {
			if (net.family === "IPv4" && !net.internal) {
				urls.push(`http://${net.address}:${currentPort}`);
			}
		}
	}
	if (urls.length === 0) {
		urls.push(`http://127.0.0.1:${currentPort}`);
	}
	return urls;
}
