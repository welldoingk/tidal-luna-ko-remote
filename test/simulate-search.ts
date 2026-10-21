import { get as httpsGet } from "https";
import * as readline from "readline";
import {
	formatDisplayPair,
	resolveKoreanMetadata,
	resolveKoreanSearchQuery,
	setCustomJsonFetcher,
} from "../plugins/ko-remote/src/koreanResolver";

// Use IPv4 fetcher in Node.js CLI to avoid WSL/Linux IPv6 timeout issues
setCustomJsonFetcher((url, headers = {}, timeoutMs = 6000) => {
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
							resolve(JSON.parse(raw));
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
});

const SAMPLE_QUERIES = [
	"놓아 놓아 놓아",
	"밤편지",
	"아이유 에잇",
	"아이유 라일락",
	"아이유 좋은 날",
	"아이유 러브 윈즈 올",
	"태연 사계",
	"사계",
	"데이식스 예뻤어",
	"예뻤어",
	"어떻게 이별까지 사랑하겠어",
	"악뮤 어떻게 이별까지 사랑하겠어",
	"방탄소년단 봄날",
	"봄날",
	"뉴진스 하입보이",
	"에스파 슈퍼노바",
	"아이브 해야",
	"르세라핌 이지",
	"로제 아파트",
];

async function simulateOne(query: string) {
	const t0 = Date.now();
	const res = await resolveKoreanSearchQuery(query);
	const elapsed = Date.now() - t0;
	const bestEn = res.searchQueries.find((q) => !/[가-힣]/.test(q)) || res.searchQueries[0];

	console.log(`\n🔎 입력 검색어: "${query}" (${elapsed}ms)`);
	console.log(`   ├─ TIDAL 자동 변환 검색어 (1순위): "${bestEn}"`);
	console.log(`   ├─ 후보 검색어 목록: ${JSON.stringify(res.searchQueries)}`);
	console.log(
		`   ├─ 매칭 정보: 영문곡명="${res.enTitle || "-"}" | 영문가수="${res.enArtist || "-"}" | 한글곡명="${res.koTitle || "-"}" | ISRC="${res.isrc || "-"}"`,
	);

	if (res.enTitle && res.enArtist) {
		const meta = await resolveKoreanMetadata({
			trackId: "sim-1",
			title: res.enTitle,
			artist: res.enArtist,
			album: res.enAlbum,
			trackNumber: res.trackNumber,
			isrc: res.isrc,
			formatMode: "ko_with_orig",
		});
		console.log(
			`   └─ TIDAL UI 한글 표기 결과: ${meta.displayArtist} — ${meta.displayTitle} [출처: ${meta.source}]`,
		);
	} else if (res.enTitle) {
		console.log(`   └─ TIDAL UI 한글 표기 결과: ${formatDisplayPair(res.enTitle, res.koTitle, "ko_with_orig")}`);
	}
}

async function main() {
	const args = process.argv.slice(2).filter((a) => a !== "--interactive" && a !== "-i");
	const interactive = process.argv.includes("--interactive") || process.argv.includes("-i");

	if (args.length > 0) {
		for (const q of args) {
			await simulateOne(q);
		}
		if (!interactive) return;
	} else {
		console.log("====================================================================");
		console.log("  🎵 TidaLuna 한글 검색 → 영문 변환 & 한글 표기 로컬 시뮬레이터");
		console.log("====================================================================");
		for (const q of SAMPLE_QUERIES) {
			await simulateOne(q);
		}
	}

	if (interactive) {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		const ask = () => {
			rl.question("\n직접 테스트할 한글 검색어를 입력하세요 (종료: q): ", async (answer) => {
				const trimmed = answer.trim();
				if (!trimmed || trimmed.toLowerCase() === "q" || trimmed.toLowerCase() === "exit") {
					rl.close();
					return;
				}
				await simulateOne(trimmed);
				ask();
			});
		};
		ask();
	}
}

main().catch(console.error);
