import { createServer, type IncomingMessage, type ServerResponse } from "http";
import { setDefaultAutoSelectFamily } from "net";
import { WebSocket, WebSocketServer } from "ws";
import { resolveKoreanMetadata, resolveKoreanSearchQuery } from "../plugins/ko-remote/src/koreanResolver";
import { REMOTE_UI_HTML } from "../plugins/ko-remote/src/remoteUiHtml";
import type { RemoteCommandPayload, RemotePlaybackState } from "../plugins/ko-remote/src/types";

try {
	setDefaultAutoSelectFamily(false);
} catch {}

const MOCK_TRACKS = [
	{
		trackId: "73128401",
		title: "Through the Night",
		artist: "IU",
		album: "Palette",
		trackNumber: 4,
		isrc: "KRA381700399",
		duration: 253,
		audioQuality: "HI_RES_LOSSLESS",
		coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/1b/5c/75/1b5c7508-2905-8722-5b6b-61201829e653/cover.jpg/600x600bb.jpg",
		lyrics: {
			subtitles: "[00:00.00] 밤편지 - 아이유 (IU)\n[00:18.50] 이 밤 그날의 반딧불을 당신의 창 가까이 보낼게요\n[00:29.10] 음 사랑한다는 말이에요\n[00:39.40] 나 우리의 첫 입맞춤을 떠올려\n[00:46.80] 그럼 언제든 눈을 감고 음 가장 먼 곳으로 가요",
		},
	},
	{
		trackId: "11029384",
		title: "You Were Beautiful",
		artist: "DAY6",
		album: "SUNRISE",
		trackNumber: 2,
		isrc: "US5TA1700019",
		duration: 283,
		audioQuality: "LOSSLESS",
		coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7c/0c/92/7c0c92b7-4e64-9d0a-92a9-e5e7d06d07b0/cover.jpg/600x600bb.jpg",
		lyrics: {
			subtitles: "[00:00.00] 예뻤어 - 데이식스 (DAY6)\n[00:14.00] 지금 이 말이 우리가 다시 시작하자는 건 아냐\n[00:26.00] 그저 너의 남있던 기억들이 떠올랐을 뿐야\n[00:38.50] 예뻤어 날 바라봐 주던 그 눈빛",
		},
	},
	{
		trackId: "11894021",
		title: "How can I love the heartbreak, you're the one I love",
		artist: "AKMU",
		album: "SAILING",
		trackNumber: 3,
		isrc: "KRA401900105",
		duration: 290,
		audioQuality: "HI_RES_LOSSLESS",
		coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/54/2f/6e/542f6e1c-7c4e-6e11-3192-928371928371/cover.jpg/600x600bb.jpg",
		lyrics: {
			subtitles: "[00:00.00] 어떻게 이별까지 사랑하겠어, 널 사랑하는 거지 - 악뮤\n[00:16.00] 일부러 몇 발자국 물러나\n[00:24.00] 내가 없이 혼자 걷는 널 바라본다",
		},
	},
	{
		trackId: "10592831",
		title: "Four Seasons",
		artist: "Taeyeon",
		album: "Four Seasons - Single",
		trackNumber: 2,
		isrc: "KRA301900250",
		duration: 188,
		audioQuality: "LOSSLESS",
		coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/88/11/22/88112233-4455-6677-8899-aabbccddeeff/cover.jpg/600x600bb.jpg",
		lyrics: {
			subtitles: "[00:00.00] 사계 (Four Seasons) - 태연\n[00:12.00] 사계절이 와, 그리고 또 떠나\n[00:20.00] 내 겨울을 주고 또 여름도 주었던 온 세상이던 너를 보낼래",
		},
	},
	{
		trackId: "99283712",
		title: "Hype Boy",
		artist: "NewJeans",
		album: "NewJeans 1st EP 'New Jeans'",
		trackNumber: 2,
		isrc: "KRA402200010",
		duration: 179,
		audioQuality: "HI_RES_LOSSLESS",
		coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/11/22/33/11223344-5566-7788-99aa-bbccddeeff00/cover.jpg/600x600bb.jpg",
		lyrics: {
			subtitles: "[00:00.00] Hype Boy - 뉴진스 (NewJeans)\n[00:15.00] Baby, got me looking so crazy\n[00:20.00] 빠져버리는 daydream",
		},
	},
];

async function runTests() {
	console.log("=== [1/2] 한국 음원 메타데이터 한글 변환 파이프라인 테스트 ===");
	const resolvedList = [];
	for (const t of MOCK_TRACKS) {
		const res = await resolveKoreanMetadata({
			trackId: t.trackId,
			title: t.title,
			artist: t.artist,
			album: t.album,
			trackNumber: t.trackNumber,
			isrc: t.isrc,
			formatMode: "ko_with_orig",
		});
		resolvedList.push({ raw: t, meta: res });
		console.log(
			`  ✔ [${t.artist} - ${t.title}] => 아티스트: "${res.displayArtist}" | 곡명: "${res.displayTitle}" (출처: ${res.source})`,
		);
	}

	console.log("\n=== [1.5/2] 한글 검색어 → TIDAL 영문 검색어 역변환 테스트 ===");
	for (const koQuery of ["놓아 놓아 놓아", "밤편지", "태연 사계", "데이식스 예뻤어"]) {
		const qRes = await resolveKoreanSearchQuery(koQuery);
		console.log(
			`  ✔ 검색어 "${koQuery}" => 변환된 TIDAL 검색어: ${JSON.stringify(qRes.searchQueries.slice(0, 2))} (ISRC: ${qRes.isrc || "-"})`,
		);
	}

	const isDemoServer = process.argv.includes("--demo");
	const port = Number(process.env.PORT || 24123);

	console.log(`\n=== [2/2] HTTP + WebSocket 원격 제어 서버 테스트 (포트: ${port}) ===`);

	let curIdx = 0;
	let playing = true;
	let currentTime = 22;
	let volume = 85;
	let muted = false;
	let shuffle = false;
	let repeatMode = 1;
	const overrides = new Map<string, { koTitle?: string; koArtist?: string }>();

	function buildCurrentState(): RemotePlaybackState {
		const item = resolvedList[curIdx];
		const ov = overrides.get(item.raw.trackId);
		const koTitle = ov?.koTitle || item.meta.koTitle;
		const koArtist = ov?.koArtist || item.meta.koArtist;
		const displayTitle = koTitle ? `${koTitle} (${item.raw.title})` : item. meta.displayTitle;
		const displayArtist = koArtist ? `${koArtist} (${item.raw.artist})` : item.meta.displayArtist;

		return {
			playing,
			playbackState: playing ? "PLAYING" : "PAUSED",
			currentTime,
			duration: item.raw.duration,
			volume,
			muted,
			shuffle,
			repeatMode,
			trackId: item.raw.trackId,
			title: displayTitle,
			originalTitle: item.raw.title,
			artist: displayArtist,
			originalArtist: item.raw.artist,
			album: item.meta.displayAlbum || item.raw.album,
			originalAlbum: item.raw.album,
			koTitle,
			koArtist,
			isKorean: item.meta.isKorean,
			metaSource: ov ? "override" : item.meta.source,
			coverUrl: item.raw.coverUrl,
			isrc: item.raw.isrc,
			audioQuality: item.raw.audioQuality,
			lyrics: item.raw.lyrics,
			queue: resolvedList.map((entry, index) => ({
				index,
				trackId: entry.raw.trackId,
				title: entry.meta.displayTitle,
				originalTitle: entry.raw.title,
				artist: entry.meta.displayArtist,
				originalArtist: entry.raw.artist,
				album: entry.raw.album,
				duration: entry.raw.duration,
				coverUrl: entry.raw.coverUrl,
				isKorean: entry.meta.isKorean,
			})),
			currentIndex: curIdx,
			updatedAt: Date.now(),
		};
	}

	let wss: WebSocketServer;
	function broadcast() {
		if (!wss) return;
		const msg = JSON.stringify({ type: "state", state: buildCurrentState() });
		for (const client of wss.clients) {
			if (client.readyState === WebSocket.OPEN) client.send(msg);
		}
	}

	function handleCommand(cmd: RemoteCommandPayload): unknown {
		switch (cmd.action) {
			case "play":
				playing = true;
				break;
			case "pause":
				playing = false;
				break;
			case "toggle":
				playing = !playing;
				break;
			case "next":
				curIdx = (curIdx + 1) % resolvedList.length;
				currentTime = 0;
				break;
			case "previous":
				curIdx = (curIdx - 1 + resolvedList.length) % resolvedList.length;
				currentTime = 0;
				break;
			case "seek":
				if (typeof cmd.time === "number") currentTime = cmd.time;
				break;
			case "volume":
				if (typeof cmd.volume === "number") volume = cmd.volume;
				break;
			case "mute":
				if (typeof cmd.muted === "boolean") muted = cmd.muted;
				break;
			case "setShuffle":
				if (typeof cmd.shuffle === "boolean") shuffle = cmd.shuffle;
				break;
			case "setRepeatMode":
				if (typeof cmd.repeatMode === "number") repeatMode = cmd.repeatMode;
				break;
			case "playQueueIndex":
				if (typeof cmd.index === "number" && resolvedList[cmd.index]) {
					curIdx = cmd.index;
					currentTime = 0;
					playing = true;
				}
				break;
			case "playTrack":
				if (cmd.trackId) {
					const idx = resolvedList.findIndex((r) => r.raw.trackId === String(cmd.trackId));
					if (idx >= 0) {
						curIdx = idx;
						currentTime = 0;
						playing = true;
					}
				}
				break;
			case "setOverride":
				if (cmd.trackId) {
					overrides.set(String(cmd.trackId), {
						koTitle: cmd.koTitle,
						koArtist: cmd.koArtist,
					});
				}
				break;
			case "search": {
				const q = (cmd.query || "").toLowerCase();
				return resolvedList
					.filter(
						(r) =>
							r.meta.displayTitle.toLowerCase().includes(q) ||
							r.meta.displayArtist.toLowerCase().includes(q),
					)
					.map((r) => ({
						trackId: r.raw.trackId,
						title: r.meta.displayTitle,
						artist: r.meta.displayArtist,
						album: r.raw.album,
						duration: r.raw.duration,
						coverUrl: r.raw.coverUrl,
					}));
			}
		}
		broadcast();
		return { ok: true };
	}

	const server = createServer((req: IncomingMessage, res: ServerResponse) => {
		const url = new URL(req.url || "/", "http://localhost");
		if (req.method === "GET" && url.pathname === "/") {
			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.end(REMOTE_UI_HTML);
			return;
		}
		if (req.method === "GET" && url.pathname === "/api/state") {
			res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
			res.end(JSON.stringify({ ok: true, state: buildCurrentState() }));
			return;
		}
		if (req.method === "POST" && url.pathname === "/api/command") {
			let body = "";
			req.on("data", (c) => (body += c));
			req.on("end", () => {
				const payload = JSON.parse(body || "{}") as RemoteCommandPayload;
				const data = handleCommand(payload);
				res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
				res.end(JSON.stringify({ ok: true, data, state: buildCurrentState() }));
			});
			return;
		}
		res.writeHead(404);
		res.end();
	});

	wss = new WebSocketServer({ server });
	wss.on("connection", (ws) => {
		ws.send(JSON.stringify({ type: "state", state: buildCurrentState() }));
		ws.on("message", (raw) => {
			const payload = JSON.parse(raw.toString()) as RemoteCommandPayload;
			const data = handleCommand(payload);
			ws.send(JSON.stringify({ type: "ack", action: payload.action, data, state: buildCurrentState() }));
		});
	});

	await new Promise<void>((resolve) => server.listen(port, "0.0.0.0", resolve));
	console.log(`  ✔ 서버 바인딩 완료: http://127.0.0.1:${port}`);

	// Automated WebSocket client verification
	const client = new WebSocket(`ws://127.0.0.1:${port}/ws`);
	await new Promise<void>((resolve, reject) => {
		client.on("open", () => {
			console.log("  ✔ WebSocket 클라이언트 연결 성공");
		});
		let step = 0;
		client.on("message", (data) => {
			const msg = JSON.parse(data.toString());
			if (step === 0 && msg.type === "state") {
				console.log(`  ✔ 초기 상태 수신: ${msg.state.artist} - ${msg.state.title}`);
				step = 1;
				client.send(JSON.stringify({ action: "next" }));
			} else if (step === 1 && msg.type === "ack" && msg.action === "next") {
				console.log(`  ✔ 원격 [다음 곡(next)] 제어 후 상태: ${msg.state.artist} - ${msg.state.title}`);
				step = 2;
				client.send(JSON.stringify({ action: "volume", volume: 55 }));
			} else if (step === 2 && msg.type === "ack" && msg.action === "volume") {
				console.log(`  ✔ 원격 [볼륨 조절(55%)] 제어 후 볼륨: ${msg.state.volume}%`);
				client.close();
				resolve();
			}
		});
		client.on("error", reject);
	});

	if (!isDemoServer) {
		server.close();
		wss.close();
		console.log("\n=== 모든 자동 검증 완료! ===");
		process.exit(0);
	} else {
		console.log(`\n🚀 데모 리모컨 서버가 http://0.0.0.0:${port} 에서 실행 중입니다.`);
		setInterval(() => {
			if (playing) {
				currentTime = (currentTime + 1) % resolvedList[curIdx].raw.duration;
				broadcast();
			}
		}, 1000);
	}
}

runTests().catch((err) => {
	console.error(err);
	process.exit(1);
});
