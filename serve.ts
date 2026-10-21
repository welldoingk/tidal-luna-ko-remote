import { createServer } from "http";
import { readFile } from "fs/promises";
import { join, extname } from "path";

const distDir = join(process.cwd(), "dist");
const port = Number(process.env.PORT || 3000);

const mimeTypes: Record<string, string> = {
	".json": "application/json; charset=utf-8",
	".mjs": "application/javascript; charset=utf-8",
	".js": "application/javascript; charset=utf-8",
	".map": "application/json; charset=utf-8",
};

const server = createServer(async (req, res) => {
	const headers: Record<string, string> = {
		"Access-Control-Allow-Origin": req.headers.origin || "*",
		"Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
		"Access-Control-Allow-Headers": "*",
		"Access-Control-Allow-Private-Network": "true",
		"Cache-Control": "no-store, no-cache, must-revalidate",
	};

	if (req.method === "OPTIONS") {
		res.writeHead(204, headers);
		res.end();
		return;
	}

	const urlPath = (req.url || "/").split("?")[0].replace(/^\/+/, "");
	const filePath = join(distDir, urlPath || "store.json");
	if (!filePath.startsWith(distDir)) {
		res.writeHead(403, headers);
		res.end("Forbidden");
		return;
	}

	try {
		const data = await readFile(filePath);
		const ext = extname(filePath);
		res.writeHead(200, {
			...headers,
			"Content-Type": mimeTypes[ext] || "application/octet-stream",
		});
		res.end(data);
	} catch {
		res.writeHead(404, headers);
		res.end("Not found");
	}
});

server.listen(port, "0.0.0.0", () => {
	console.log(`Plugin server with Private-Network-Access listening on 0.0.0.0:${port}`);
});
