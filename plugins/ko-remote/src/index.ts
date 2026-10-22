import { LunaUnload, reduxStore, Tracer } from "@luna/core";
import { MediaItem, PlayState, redux, safeInterval, StyleTag, TidalApi } from "@luna/lib";
import {
	formatDisplayPair,
	hasHangul,
	lookupArtistDict,
	resolveKoreanMetadata,
	resolveKoreanSearchQuery,
	setCustomJsonFetcher,
} from "./koreanResolver";
import { nativeFetchJson, pushRemoteState, startRemoteServer, stopRemoteServer } from "./server.native";
import { Settings, settings } from "./Settings";
import type { KoreanTrackMeta, QueueTrackItem, RemoteCommandPayload, SearchTrackItem } from "./types";

setCustomJsonFetcher(nativeFetchJson);

export const { trace } = Tracer("[KoRemote]");
export const unloads = new Set<LunaUnload>();
export { Settings };

declare global {
	interface Window {
		__koRemoteInvokeCommand?: (payload: RemoteCommandPayload) => Promise<unknown>;
	}
}

const BADGE_STYLE = `
#luna-ko-remote-badge {
	position: fixed;
	bottom: 96px;
	left: 18px;
	z-index: 99990;
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 6px 12px;
	border-radius: 10px;
	background: rgba(12, 16, 26, 0.88);
	backdrop-filter: blur(12px);
	border: 1px solid rgba(56, 189, 248, 0.4);
	box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
	color: #f8fafc;
	font-size: 13px;
	pointer-events: auto;
	cursor: pointer;
	transition: opacity 0.25s ease, transform 0.25s ease;
	max-width: 420px;
}
#luna-ko-remote-badge.hidden {
	opacity: 0;
	pointer-events: none;
	transform: translateY(8px);
}
#luna-ko-remote-badge .ko-tag {
	background: rgba(56, 189, 248, 0.2);
	color: #38bdf8;
	font-weight: 700;
	font-size: 11px;
	padding: 2px 6px;
	border-radius: 6px;
	flex-shrink: 0;
}
#luna-ko-remote-badge .ko-text {
	font-weight: 600;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
`;

new StyleTag("luna-ko-remote-style", unloads, BADGE_STYLE);

// Runtime memory caches so we never lose original English strings
const originalTrackMap = new Map<string, { title: string; artist: string; album?: string }>();
const pendingResolves = new Map<string, Promise<KoreanTrackMeta>>();
let currentResolvedMeta: KoreanTrackMeta | null = null;
let currentLyrics: { plain?: string; subtitles?: string } | null = null;
let currentCoverUrl = "";

function getOrSaveOriginalTrack(track: any): { title: string; artist: string; album?: string } {
	const id = String(track.id);
	const existing = originalTrackMap.get(id);
	if (existing) return existing;

	const title = String(track.title || "");
	const artist = String(track.artist?.name || track.artists?.[0]?.name || "");
	const album = track.album?.title ? String(track.album.title) : undefined;
	const entry = { title, artist, album };
	originalTrackMap.set(id, entry);
	return entry;
}

/**
 * Applies resolved Korean metadata onto TIDAL's Redux store and footer player DOM
 */
function applyKoreanToTidalUi(meta: KoreanTrackMeta) {
	if (!settings.enableKoreanPatch) return;

	// 1. Update Floating Badge in TIDAL Desktop UI
	updateFloatingBadge(meta);

	if (!settings.patchTidalDom) return;

	// 2. Patch Redux store mediaItems entry so React components re-render or read Korean title
	try {
		const state = redux.store.getState();
		const mediaItemEntry = state?.content?.mediaItems?.[meta.trackId];
		if (mediaItemEntry?.item) {
			const itemObj = mediaItemEntry.item as any;
			itemObj.title = meta.displayTitle;
			if (itemObj.artist && meta.koArtist) {
				itemObj.artist.name = meta.displayArtist;
			}
			if (Array.isArray(itemObj.artists) && itemObj.artists[0] && meta.koArtist) {
				itemObj.artists[0].name = meta.displayArtist;
			}
		}
	} catch (err) {
		trace.warn("Failed to patch Redux store mediaItem:", err);
	}

	// 3. Patch Footer Player DOM directly for immediate visual update
	patchFooterPlayerDom(meta);
}

function updateFloatingBadge(meta: KoreanTrackMeta | null) {
	let badge = document.getElementById("luna-ko-remote-badge");
	if (!settings.enableKoreanPatch || !settings.showFloatingKoBadge || !meta || !meta.isKorean || (!meta.koTitle && !meta.koArtist)) {
		if (badge) badge.classList.add("hidden");
		return;
	}

	if (!badge) {
		badge = document.createElement("div");
		badge.id = "luna-ko-remote-badge";
		badge.title = "클릭하여 한글/원제 표기 모드 전환";
		badge.addEventListener("click", () => {
			const modes: Array<typeof settings.formatMode> = ["ko_with_orig", "ko_only", "orig_with_ko"];
			const nextIdx = (modes.indexOf(settings.formatMode) + 1) % modes.length;
			settings.formatMode = modes[nextIdx];
			if (currentResolvedMeta) {
				currentResolvedMeta.displayTitle = formatDisplayPair(
					currentResolvedMeta.originalTitle,
					currentResolvedMeta.koTitle,
					settings.formatMode,
				);
				currentResolvedMeta.displayArtist = formatDisplayPair(
					currentResolvedMeta.originalArtist,
					currentResolvedMeta.koArtist,
					settings.formatMode,
				);
				applyKoreanToTidalUi(currentResolvedMeta);
				syncStateToServer();
			}
		});
		document.body.appendChild(badge);
		unloads.add(() => badge?.remove());
	}

	const koTitleText = meta.koTitle || meta.originalTitle;
	const koArtistText = meta.koArtist || meta.originalArtist;
	badge.innerHTML = `<span class="ko-tag">KR</span><span class="ko-text">${koArtistText} — ${koTitleText}</span>`;
	badge.classList.remove("hidden");
}

function patchFooterPlayerDom(meta: KoreanTrackMeta) {
	if (!meta.isKorean) return;
	const footer =
		document.querySelector('[data-test="footer-player"]') ||
		document.querySelector('[data-test="now-playing-bar"]') ||
		document.querySelector("footer");
	if (!footer) return;

	// Title selectors in TIDAL Desktop
	const titleSelectors = [
		'[data-test="footer-track-title"] a',
		'[data-test="footer-track-title"] span',
		'[data-test="footer-track-title"]',
		'[data-test="now-playing-track-title"]',
	];
	for (const sel of titleSelectors) {
		const el = footer.querySelector(sel) as HTMLElement | null;
		if (el && el.children.length === 0 && el.textContent) {
			if (el.textContent !== meta.displayTitle) {
				el.textContent = meta.displayTitle;
			}
			break;
		}
	}

	// Artist selectors in TIDAL Desktop
	if (meta.koArtist) {
		const artistSelectors = [
			'[data-test="grid-item-detail-text-title-artist"] a',
			'[data-test="footer-artist-name"]',
			'a[href^="/artist/"]',
		];
		for (const sel of artistSelectors) {
			const el = footer.querySelector(sel) as HTMLElement | null;
			if (el && el.children.length === 0 && el.textContent) {
				if (el.textContent === meta.originalArtist && el.textContent !== meta.displayArtist) {
					el.textContent = meta.displayArtist;
					break;
				}
			}
		}
	}
}

/**
 * Resolves Korean metadata for a track and caches it in plugin storage
 */
async function resolveAndCacheTrack(
	trackId: string,
	title: string,
	artist: string,
	album?: string,
	trackNumber?: number,
	isrc?: string | null,
	forceRefresh = false,
): Promise<KoreanTrackMeta> {
	const id = String(trackId);
	if (!forceRefresh && pendingResolves.has(id)) {
		return pendingResolves.get(id)!;
	}

	const promise = (async () => {
		const override = settings.overrides?.[id] ?? null;
		const cached = !forceRefresh ? (settings.cache?.[id] ?? null) : null;

		const resolved = await resolveKoreanMetadata({
			trackId: id,
			title,
			artist,
			album,
			trackNumber,
			isrc,
			formatMode: settings.formatMode,
			override,
			cached,
		});

		// Assign the nested key, never `settings.cache = { ...settings.cache }`: spreading the reactive store copies
		// its Proxy children into the persisted object, IndexedDB then fails with DataCloneError and every later
		// settings write is lost on restart.
		if (resolved.koTitle || resolved.koArtist) {
			settings.cache[id] = resolved;
		}
		return resolved;
	})();

	pendingResolves.set(id, promise);
	try {
		return await promise;
	} finally {
		pendingResolves.delete(id);
	}
}

/**
 * Triggered whenever the active track in TIDAL transitions
 */
async function onMediaItemChanged(item?: MediaItem, forceRefresh = false) {
	if (!item) return;
	const trackId = String(item.id);
	const tidalTrack = item.tidalItem;
	const orig = getOrSaveOriginalTrack(tidalTrack);

	const [albumObj, artistObj, coverUrl, isrc, lyricsObj] = await Promise.all([
		item.album().catch(() => undefined),
		item.artist().catch(() => undefined),
		item.coverUrl().catch(() => undefined),
		item.isrc().catch(() => tidalTrack.isrc ?? undefined),
		item.lyrics().catch(() => undefined),
	]);

	currentCoverUrl = coverUrl || "";
	currentLyrics = lyricsObj
		? {
				plain: lyricsObj.lyrics,
				subtitles: lyricsObj.subtitles,
			}
		: null;

	const origTitle = orig.title || tidalTrack.title || "";
	const origArtist = orig.artist || artistObj?.name || tidalTrack.artist?.name || "";
	const origAlbum = orig.album || albumObj?.tidalAlbum?.title || tidalTrack.album?.title || "";

	// First set a quick preliminary resolved meta (using dictionary/cache immediately)
	const quickDictArtist = lookupArtistDict(origArtist);
	const cachedMeta = !forceRefresh ? settings.cache?.[trackId] : undefined;
	currentResolvedMeta = cachedMeta ?? {
		trackId,
		isrc: isrc ?? null,
		originalTitle: origTitle,
		originalArtist: origArtist,
		originalAlbum: origAlbum,
		koTitle: hasHangul(origTitle) ? origTitle : null,
		koArtist: quickDictArtist,
		displayTitle: origTitle,
		displayArtist: formatDisplayPair(origArtist, quickDictArtist, settings.formatMode),
		displayAlbum: origAlbum,
		isKorean: !!quickDictArtist || hasHangul(origTitle),
		source: quickDictArtist ? "dictionary" : "none",
		updatedAt: Date.now(),
	};

	await syncStateToServer();

	// Resolve full Korean metadata asynchronously
	const meta = await resolveAndCacheTrack(
		trackId,
		origTitle,
		origArtist,
		origAlbum,
		tidalTrack.trackNumber,
		isrc,
		forceRefresh,
	);

	currentResolvedMeta = meta;
	applyKoreanToTidalUi(meta);
	await syncStateToServer();
}

/**
 * Intercepts batch track loads in Redux so track lists also get Korean titles/artists
 */
redux.intercept("content/LAZY_LOAD_MEDIA_ITEMS_SUCCESS", unloads, (payload) => {
	if (!settings.enableKoreanPatch || !settings.patchTidalDom || !payload?.items) return;

	for (const [id, mediaItem] of Object.entries(payload.items)) {
		const track = mediaItem?.item as any;
		if (!track || mediaItem.type !== "track") continue;
		const orig = getOrSaveOriginalTrack(track);

		// Check if already cached or in dictionary
		const cached = settings.cache?.[id];
		const override = settings.overrides?.[id];
		const dictArtist = lookupArtistDict(orig.artist);

		if (override || cached) {
			const koTitle = override?.koTitle ?? cached?.koTitle;
			const koArtist = override?.koArtist ?? cached?.koArtist ?? dictArtist;
			track.title = formatDisplayPair(orig.title, koTitle, settings.formatMode);
			if (koArtist && track.artist) {
				track.artist.name = formatDisplayPair(orig.artist, koArtist, settings.formatMode);
			}
		} else if (dictArtist || hasHangul(orig.title)) {
			if (dictArtist && track.artist) {
				track.artist.name = formatDisplayPair(orig.artist, dictArtist, settings.formatMode);
			}
			// Trigger background resolution for Korean artists' tracks
			resolveAndCacheTrack(id, orig.title, orig.artist, orig.album, track.trackNumber, track.isrc).then((resolved) => {
				if (resolved.koTitle) {
					track.title = resolved.displayTitle;
				}
			});
		}
	}
});

/**
 * Builds queue items with Korean titles for the remote UI
 */
function buildQueueList(): QueueTrackItem[] {
	try {
		const state = redux.store.getState();
		const elements = PlayState.playQueue?.elements ?? [];
		const mediaItems = state?.content?.mediaItems ?? {};

		return elements.slice(0, 60).map((el, index) => {
			const id = String(el.mediaItemId);
			const mItem = mediaItems[id]?.item as any;
			const orig = mItem ? getOrSaveOriginalTrack(mItem) : { title: `Track #${id}`, artist: "" };
			const cached = settings.cache?.[id];
			const override = settings.overrides?.[id];
			const dictArtist = lookupArtistDict(orig.artist);

			const koTitle = override?.koTitle ?? cached?.koTitle ?? null;
			const koArtist = override?.koArtist ?? cached?.koArtist ?? dictArtist ?? null;

			const displayTitle = settings.enableKoreanPatch
				? formatDisplayPair(orig.title, koTitle, settings.formatMode)
				: orig.title;
			const displayArtist = settings.enableKoreanPatch
				? formatDisplayPair(orig.artist, koArtist, settings.formatMode)
				: orig.artist;

			let coverUrl: string | undefined;
			const coverId = mItem?.album?.cover;
			if (coverId && typeof coverId === "string") {
				coverUrl = `https://resources.tidal.com/images/${coverId.replace(/-/g, "/")}/160x160.jpg`;
			}

			return {
				index,
				trackId: id,
				title: displayTitle,
				originalTitle: orig.title,
				artist: displayArtist,
				originalArtist: orig.artist,
				album: orig.album,
				duration: mItem?.duration,
				coverUrl,
				isKorean: !!(koTitle || koArtist),
			};
		});
	} catch {
		return [];
	}
}

/**
 * Pushes current playback + Korean metadata state to the Native WebSocket/HTTP server
 */
async function syncStateToServer() {
	if (!settings.enableRemoteServer) return;
	try {
		const state = redux.store.getState();
		const { playbackControls } = state;
		const { playing, currentTime, repeatMode, shuffle, playQueue } = PlayState;

		const meta = currentResolvedMeta;
		const useKo = settings.enableKoreanPatch;

		if (meta && settings.patchTidalDom) {
			patchFooterPlayerDom(meta);
		}

		await pushRemoteState({
			playing,
			playbackState: PlayState.state,
			currentTime: Number.isNaN(currentTime) ? 0 : currentTime,
			duration: playbackControls?.playbackContext?.actualDuration || 0,
			volume: playbackControls?.volume ?? 100,
			muted: !!playbackControls?.muted,
			shuffle: !!shuffle,
			repeatMode: repeatMode ?? 0,
			trackId: meta?.trackId || String(playbackControls?.mediaProduct?.productId || ""),
			title: useKo ? (meta?.displayTitle || "재생 중인 곡 없음") : (meta?.originalTitle || "재생 중인 곡 없음"),
			originalTitle: meta?.originalTitle || "",
			artist: useKo ? (meta?.displayArtist || "-") : (meta?.originalArtist || "-"),
			originalArtist: meta?.originalArtist || "",
			album: useKo ? (meta?.displayAlbum || "") : (meta?.originalAlbum || ""),
			originalAlbum: meta?.originalAlbum || "",
			koTitle: meta?.koTitle ?? null,
			koArtist: meta?.koArtist ?? null,
			isKorean: !!meta?.isKorean,
			metaSource: meta?.source || "none",
			coverUrl: currentCoverUrl,
			isrc: meta?.isrc || "",
			audioQuality: playbackControls?.playbackContext?.actualAudioQuality || "LOSSLESS",
			lyrics: currentLyrics,
			queue: buildQueueList(),
			currentIndex: playQueue?.currentIndex ?? 0,
			updatedAt: Date.now(),
		});
	} catch (err) {
		trace.warn("syncStateToServer error:", err);
	}
}

/**
 * Searches TIDAL catalog via authenticated API so remote users can search and play tracks
 * Supports Korean queries (e.g. "놓아 놓아 놓아", "밤편지") by automatically resolving them to English/ISRC!
 */
async function searchTidalTracks(query: string): Promise<SearchTrackItem[]> {
	if (!query || !query.trim()) return [];
	const trimmed = query.trim();
	try {
		const queryArgs = TidalApi.queryArgs();
		const itemsMap = new Map<string, any>();

		// If the user typed Korean, resolve Korean -> English/ISRC first
		let koResolution: Awaited<ReturnType<typeof resolveKoreanSearchQuery>> | null = null;
		if (hasHangul(trimmed)) {
			koResolution = await resolveKoreanSearchQuery(trimmed);
			trace.log("Korean search resolved:", koResolution);

			// 1) Try direct ISRC match on TIDAL if available
			if (koResolution.isrc) {
				try {
					for await (const t of TidalApi.isrc(koResolution.isrc)) {
						if (t?.id) {
							const fullTrack = await TidalApi.track(t.id);
							if (fullTrack) itemsMap.set(String(fullTrack.id), fullTrack);
						}
					}
				} catch {}
			}
		}

		const candidateQueries = koResolution ? koResolution.searchQueries : [trimmed];
		for (const q of candidateQueries.slice(0, 3)) {
			const url = `https://desktop.tidal.com/v1/search/tracks?query=${encodeURIComponent(q)}&limit=15&offset=0&${queryArgs}`;
			const res = await TidalApi.fetch<{ items?: any[] }>(url);
			for (const item of res?.items ?? []) {
				if (item?.id && !itemsMap.has(String(item.id))) {
					itemsMap.set(String(item.id), item);
				}
			}
			if (itemsMap.size >= 10) break;
		}

		const items = Array.from(itemsMap.values());

		// Pre-populate Korean cache for matched tracks if resolved from a Korean query
		if (koResolution?.koTitle && koResolution.enTitle) {
			const normEn = koResolution.enTitle.toLowerCase();
			for (const t of items) {
				const id = String(t.id);
				const tTitle = String(t.title || "");
				if (!settings.cache?.[id] && tTitle.toLowerCase().includes(normEn)) {
					const origArtist = String(t.artist?.name || t.artists?.[0]?.name || "");
					const koArtist = lookupArtistDict(origArtist) || koResolution.koArtist || null;
					settings.cache[id] = {
							trackId: id,
							isrc: t.isrc,
							originalTitle: tTitle,
							originalArtist: origArtist,
							originalAlbum: t.album?.title,
							koTitle: koResolution.koTitle,
							koArtist,
							displayTitle: formatDisplayPair(tTitle, koResolution.koTitle, settings.formatMode),
							displayArtist: formatDisplayPair(origArtist, koArtist, settings.formatMode),
							isKorean: true,
							source: "itunes-kr",
							updatedAt: Date.now(),
					};
				}
			}
		}

		return items.map((t) => {
			const origTitle = String(t.title || "");
			const origArtist = String(t.artist?.name || t.artists?.[0]?.name || "");
			const dictArtist = lookupArtistDict(origArtist);
			const cached = settings.cache?.[String(t.id)];
			const coverId = t.album?.cover;
			const coverUrl =
				coverId && typeof coverId === "string"
					? `https://resources.tidal.com/images/${coverId.replace(/-/g, "/")}/160x160.jpg`
					: undefined;

			return {
				trackId: String(t.id),
				title: cached?.displayTitle || origTitle,
				artist: cached?.displayArtist || formatDisplayPair(origArtist, dictArtist, settings.formatMode),
				album: t.album?.title,
				duration: t.duration,
				coverUrl,
				audioQuality: t.audioQuality,
			};
		});
	} catch (err) {
		trace.warn("searchTidalTracks failed:", err);
		return [];
	}
}

// Intercept Korean search inside TIDAL Desktop App's native search bar (Redux + Router + DOM Input)!
let lastTranslatedSearchSource = "";
let lastTranslatedSearchTarget = "";
let searchInputDebounceTimer: ReturnType<typeof setTimeout> | null = null;

function findTidalSearchInput(): HTMLInputElement | null {
	const selectors = [
		'input[data-test="search-input"]',
		'[data-test*="search"] input',
		'input[type="search"]',
		'[role="search"] input',
		'header input[type="text"]',
	];
	for (const sel of selectors) {
		const el = document.querySelector(sel);
		if (el instanceof HTMLInputElement) return el;
	}
	return null;
}

function setReactInputValue(input: HTMLInputElement, value: string) {
	try {
		const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
		if (setter) {
			setter.call(input, value);
		} else {
			input.value = value;
		}
		input.dispatchEvent(new Event("input", { bubbles: true }));
		input.dispatchEvent(new Event("change", { bubbles: true }));
	} catch {}
}

function triggerDesktopKoreanSearch(trimmed: string) {
	if (!settings.enableKoreanPatch) return;
	if (!hasHangul(trimmed) || trimmed.length < 2) return;
	if (trimmed === lastTranslatedSearchSource || trimmed === lastTranslatedSearchTarget) return;

	lastTranslatedSearchSource = trimmed;
	resolveKoreanSearchQuery(trimmed).then((res) => {
		const bestEn = res.searchQueries.find((q) => !hasHangul(q));
		if (bestEn && bestEn !== trimmed) {
			lastTranslatedSearchTarget = bestEn;
			trace.msg.log(`한글 검색 자동 변환: "${trimmed}" → "${bestEn}"`);

			const inputEl = findTidalSearchInput();
			if (inputEl && hasHangul(inputEl.value)) {
				setReactInputValue(inputEl, bestEn);
			}

			try {
				redux.actions["search/SET_SEARCH_PHRASE"]?.({ searchPhrase: bestEn });
				redux.actions["search/SEARCH_COMMIT"]?.(bestEn);
			} catch {}

			try {
				redux.actions["router/PUSH"]?.({
					pathname: `/search/${encodeURIComponent(bestEn)}`,
					search: "",
					replace: true,
				});
			} catch {}
		}
	});
}

redux.intercept("search/SEARCH_COMMIT", unloads, (phrase) => {
	if (!settings.enableKoreanPatch || typeof phrase !== "string") return;
	if (searchInputDebounceTimer) clearTimeout(searchInputDebounceTimer);
	triggerDesktopKoreanSearch(phrase.trim());
});

redux.intercept("search/SET_SEARCH_PHRASE", unloads, (payload) => {
	if (!settings.enableKoreanPatch || !payload || typeof payload.searchPhrase !== "string") return;
	const trimmed = payload.searchPhrase.trim();
	if (!hasHangul(trimmed) || trimmed.length < 2) return;
	if (searchInputDebounceTimer) clearTimeout(searchInputDebounceTimer);
	searchInputDebounceTimer = setTimeout(() => {
		triggerDesktopKoreanSearch(trimmed);
	}, 900);
});

redux.intercept("router/NAVIGATED", unloads, (payload) => {
	if (!settings.enableKoreanPatch || !payload || typeof payload.path !== "string") return;
	if (payload.path.startsWith("/search/")) {
		try {
			const rawQuery = decodeURIComponent(payload.path.slice("/search/".length).split("/")[0] || "").trim();
			if (hasHangul(rawQuery)) {
				triggerDesktopKoreanSearch(rawQuery);
			}
		} catch {}
	}
});

const onDocKeyDown = (e: KeyboardEvent) => {
	if (!settings.enableKoreanPatch) return;
	const target = e.target;
	if (!(target instanceof HTMLInputElement)) return;
	const searchInput = findTidalSearchInput();
	if (target !== searchInput && !target.closest('[data-test*="search"], [role="search"], header')) return;

	if (e.key === "Enter") {
		const val = target.value.trim();
		if (hasHangul(val) && val.length >= 2) {
			if (searchInputDebounceTimer) clearTimeout(searchInputDebounceTimer);
			lastTranslatedSearchSource = "";
			triggerDesktopKoreanSearch(val);
		}
	}
};

const onDocInput = (e: Event) => {
	if (!settings.enableKoreanPatch) return;
	const target = e.target;
	if (!(target instanceof HTMLInputElement)) return;
	const searchInput = findTidalSearchInput();
	if (target !== searchInput && !target.closest('[data-test*="search"], [role="search"], header')) return;

	const val = target.value.trim();
	if (!hasHangul(val) || val.length < 2) return;
	if (searchInputDebounceTimer) clearTimeout(searchInputDebounceTimer);
	searchInputDebounceTimer = setTimeout(() => {
		lastTranslatedSearchSource = "";
		triggerDesktopKoreanSearch(val);
	}, 1000);
};

document.addEventListener("keydown", onDocKeyDown, true);
document.addEventListener("input", onDocInput, true);
unloads.add(() => {
	document.removeEventListener("keydown", onDocKeyDown, true);
	document.removeEventListener("input", onDocInput, true);
	if (searchInputDebounceTimer) clearTimeout(searchInputDebounceTimer);
});

/**
 * Handles remote commands invoked from HTTP/WebSocket clients
 */
window.__koRemoteInvokeCommand = async (payload: RemoteCommandPayload) => {
	const { action } = payload;
	switch (action) {
		case "play":
			PlayState.play();
			break;
		case "pause":
			PlayState.pause();
			break;
		case "toggle":
			PlayState.playing ? PlayState.pause() : PlayState.play();
			break;
		case "next":
			PlayState.next();
			break;
		case "previous":
			PlayState.previous();
			break;
		case "seek":
			if (typeof payload.time === "number") {
				PlayState.seek(payload.time);
			}
			break;
		case "volume": {
			const vol = payload.volume;
			if (typeof vol === "number") {
				redux.actions["playbackControls/SET_VOLUME"]({ volume: Math.max(0, Math.min(100, vol)) });
			} else if (typeof vol === "string" && /^[-+]\d+$/.test(vol)) {
				const cur = reduxStore.getState().playbackControls.volume || 0;
				const next = Math.max(0, Math.min(100, cur + Number.parseInt(vol, 10)));
				redux.actions["playbackControls/SET_VOLUME"]({ volume: next });
			}
			break;
		}
		case "mute":
			if (typeof payload.muted === "boolean") {
				redux.actions["playbackControls/SET_MUTE"](payload.muted);
			}
			break;
		case "setShuffle":
			if (typeof payload.shuffle === "boolean") {
				payload.shuffle ? PlayState.setShuffle(true, true) : PlayState.setShuffle(false, true);
			}
			break;
		case "setRepeatMode":
			if (typeof payload.repeatMode === "number") {
				PlayState.setRepeatMode(payload.repeatMode);
			}
			break;
		case "playTrack":
			if (payload.trackId) {
				const mediaItem = await MediaItem.fromId(payload.trackId);
				if (mediaItem) {
					mediaItem.play();
				} else {
					PlayState.play(payload.trackId);
				}
			}
			break;
		case "playQueueIndex":
			if (typeof payload.index === "number") {
				PlayState.moveTo(payload.index);
				PlayState.play();
			}
			break;
		case "playNext":
			if (payload.trackId) {
				PlayState.playNext(payload.trackId);
			}
			break;
		case "addToQueue":
			if (payload.trackId) {
				redux.actions["playQueue/ADD_LAST"]({
					context: { type: "UNKNOWN", id: payload.trackId },
					mediaItemIds: [payload.trackId],
				});
			}
			break;
		case "search":
			return await searchTidalTracks(payload.query || "");
		case "setOverride":
			if (payload.trackId) {
				settings.overrides[payload.trackId] = {
					koTitle: payload.koTitle || undefined,
					koArtist: payload.koArtist || undefined,
				};
				const currentItem = await MediaItem.fromPlaybackContext();
				if (currentItem && String(currentItem.id) === String(payload.trackId)) {
					await onMediaItemChanged(currentItem, true);
				}
			}
			break;
		case "refreshMeta": {
			const currentItem = await MediaItem.fromPlaybackContext();
			if (currentItem) {
				await onMediaItemChanged(currentItem, true);
			}
			break;
		}
		case "getState":
			break;
	}

	await syncStateToServer();
	return { ok: true };
};

unloads.add(() => {
	delete window.__koRemoteInvokeCommand;
});

// Start server and watch for settings changes
let activeServerSig = "";
async function ensureServerRunning() {
	if (!settings.enableRemoteServer) {
		if (activeServerSig !== "") {
			activeServerSig = "";
			await stopRemoteServer();
			trace.msg.log("Remote server stopped");
		}
		return;
	}

	const sig = `${settings.bindHost || "0.0.0.0"}:${settings.port || 24123}:${settings.authToken || ""}`;
	if (sig !== activeServerSig) {
		activeServerSig = sig;
		const res = await startRemoteServer(settings.port || 24123, settings.bindHost || "0.0.0.0", settings.authToken || "");
		if (res.ok) {
			trace.msg.log(`Remote control ready at: ${res.urls.join(", ")}`);
		} else {
			trace.msg.err(`Failed to start remote server on port ${settings.port}: ${res.error}`);
		}
	}
}

ensureServerRunning();
unloads.add(() => {
	stopRemoteServer();
});

// Subscribe to TIDAL events
MediaItem.fromPlaybackContext().then((item) => {
	if (item) onMediaItemChanged(item);
});
MediaItem.onMediaTransition(unloads, (item) => {
	onMediaItemChanged(item);
});
PlayState.onState(unloads, () => {
	syncStateToServer();
});

// Periodic sync (every 500ms for smooth progress bar & DOM integrity, plus server config check)
safeInterval(unloads, () => {
	syncStateToServer();
}, 500);

safeInterval(unloads, () => {
	ensureServerRunning();
}, 3000);
