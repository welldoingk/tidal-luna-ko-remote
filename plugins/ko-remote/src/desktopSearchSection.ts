import type { LunaUnloads } from "@luna/core";
import { observe, redux, StyleTag } from "@luna/lib";

import type { SearchTrackItem } from "./types";

/**
 * Desktop TIDAL search: instead of rewriting the user's Hangul query, show the resolved songs in a separate
 * section right under the search tabs (placement borrowed from seomin0610/KoreanSearch, which verified the selectors).
 */

const ROOT_ID = "luna-ko-remote-search";
const TOP_RESULTS = '[data-test="search-results-top"]';
const NORMAL_RESULTS = '[data-test="search-results-normal"]';
const MAX_ROWS = 8;

type SectionState =
	| { kind: "hidden" }
	| { kind: "loading"; phrase: string }
	| { kind: "results"; phrase: string; tracks: SearchTrackItem[] };

const CSS = `
#${ROOT_ID} { margin: 8px 0 20px; font-family: inherit; }
#${ROOT_ID} .kr-head { display: flex; align-items: center; gap: 10px; margin: 0 0 8px; }
#${ROOT_ID} .kr-eyebrow { font-size: 13px; font-weight: 700; letter-spacing: .02em; color: #fff; }
#${ROOT_ID} .kr-rule { flex: 1; height: 1px; background: rgba(255,255,255,.12); }
#${ROOT_ID} .kr-meta { font-size: 12px; color: rgba(255,255,255,.55); }
#${ROOT_ID} .kr-rows { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 4px 16px; }
#${ROOT_ID} .kr-row { display: grid; grid-template-columns: 40px minmax(0,1fr) auto; align-items: center; gap: 12px;
  padding: 6px 8px; border: 0; border-radius: 8px; background: transparent; color: inherit; text-align: left; cursor: pointer; }
#${ROOT_ID} .kr-row:hover, #${ROOT_ID} .kr-row:focus-visible { background: rgba(255,255,255,.08); outline: none; }
#${ROOT_ID} .kr-art { width: 40px; height: 40px; border-radius: 4px; object-fit: cover; background: rgba(255,255,255,.08); }
#${ROOT_ID} .kr-text { min-width: 0; display: flex; flex-direction: column; gap: 2px; }
#${ROOT_ID} .kr-title { font-size: 14px; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#${ROOT_ID} .kr-artist { font-size: 12px; color: rgba(255,255,255,.6); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#${ROOT_ID} .kr-time { font-size: 12px; color: rgba(255,255,255,.5); font-variant-numeric: tabular-nums; }
#${ROOT_ID} .kr-skeleton { height: 52px; border-radius: 8px; background: rgba(255,255,255,.05); animation: krPulse 1.2s ease-in-out infinite; }
@keyframes krPulse { 50% { opacity: .45; } }
`;

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string) => {
	const node = document.createElement(tag);
	if (className) node.className = className;
	if (text !== undefined) node.textContent = text;
	return node;
};

const durationText = (seconds?: number) =>
	typeof seconds === "number" && seconds > 0 ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}` : "";

export function initDesktopSearchSection(
	unloads: LunaUnloads,
	deps: {
		isEnabled: () => boolean;
		hasHangul: (text: string) => boolean;
		search: (phrase: string) => Promise<SearchTrackItem[]>;
		play: (trackId: string) => void;
	},
) {
	let state: SectionState = { kind: "hidden" };
	let root: HTMLElement | undefined;
	let requestId = 0;
	let debounce: ReturnType<typeof setTimeout> | undefined;

	const insertIntoPage = () => {
		if (!root) return;
		const panel = document.querySelector<HTMLElement>(TOP_RESULTS) ?? document.querySelector<HTMLElement>(NORMAL_RESULTS);
		if (panel) {
			// The panel header (tab pills) has a fixed height: insert as its next sibling, not inside it
			const header = panel.querySelector<HTMLElement>('[class*="pillsScrollArea"]')?.parentElement;
			if (header?.parentElement === panel) {
				if (header.nextElementSibling !== root) header.after(root);
			} else if (panel.firstElementChild !== root) {
				panel.prepend(root);
			}
			return;
		}
		const content = document.querySelector<HTMLElement>("#main .mainContent") ?? document.getElementById("main");
		if (!content || (root.parentElement === content && root.isConnected)) return;
		const anchor = [...content.children].find((child) => child !== root && !child.classList.contains("global-background-container")) ?? null;
		content.insertBefore(root, anchor);
	};

	const buildRow = (track: SearchTrackItem) => {
		const row = el("button", "kr-row");
		row.type = "button";
		row.title = `${track.title} — ${track.artist}`;
		const art = track.coverUrl ? Object.assign(el("img", "kr-art"), { src: track.coverUrl, alt: "" }) : el("div", "kr-art");
		const text = el("div", "kr-text");
		text.append(el("span", "kr-title", track.title), el("span", "kr-artist", track.artist));
		row.append(art, text, el("span", "kr-time", durationText(track.duration)));
		row.addEventListener("click", () => deps.play(track.trackId));
		row.addEventListener("contextmenu", (event) => {
			event.preventDefault();
			redux.actions["contextMenu/OPEN_MEDIA_ITEM"]?.({
				type: "MEDIA_ITEM",
				id: track.trackId,
				position: [event.clientX, event.clientY],
				canBlock: false,
				contextMenuLocation: "trackList",
				sourceContext: { type: "search" },
			} as any);
		});
		return row;
	};

	const render = () => {
		if (state.kind === "hidden") {
			root?.remove();
			return;
		}
		root ??= el("section");
		root.id = ROOT_ID;
		root.replaceChildren();
		const head = el("div", "kr-head");
		head.append(
			el("span", "kr-eyebrow", "한글 검색 · 원곡 찾기"),
			el("span", "kr-rule"),
			el("span", "kr-meta", state.kind === "loading" ? "찾는 중…" : `${state.tracks.length}곡 · ko-remote`),
		);
		const rows = el("div", "kr-rows");
		if (state.kind === "loading") for (let i = 0; i < 3; i++) rows.append(el("div", "kr-skeleton"));
		else for (const track of state.tracks) rows.append(buildRow(track));
		root.append(head, rows);
		insertIntoPage();
	};

	const setState = (next: SectionState) => {
		state = next;
		render();
	};

	const run = async (phrase: string) => {
		const id = ++requestId;
		setState({ kind: "loading", phrase });
		const tracks = (await deps.search(phrase).catch(() => [])).slice(0, MAX_ROWS);
		if (id !== requestId) return;
		setState(tracks.length > 0 ? { kind: "results", phrase, tracks } : { kind: "hidden" });
	};

	const schedule = (phrase: string) => {
		clearTimeout(debounce);
		const trimmed = phrase.trim();
		if (!deps.isEnabled() || !deps.hasHangul(trimmed)) {
			requestId++;
			return setState({ kind: "hidden" });
		}
		if (state.kind !== "hidden" && state.phrase === trimmed) return;
		debounce = setTimeout(() => run(trimmed), 250);
	};

	const currentPhrase = () => String((redux.store.getState() as any).search?.searchPhrase ?? "");

	new StyleTag(`${ROOT_ID}-style`, unloads, CSS);
	for (const selector of ["#main .mainContent", TOP_RESULTS, NORMAL_RESULTS]) {
		observe(unloads, selector, () => {
			if (state.kind !== "hidden") insertIntoPage();
		});
	}

	redux.intercept("search/SEARCH_COMMIT", unloads, (phrase) => schedule(typeof phrase === "string" ? phrase : currentPhrase()));
	redux.intercept("router/NAVIGATED", unloads, (payload: any) => {
		const path = typeof payload?.path === "string" ? payload.path : location.pathname;
		if (!path.startsWith("/search")) {
			requestId++;
			clearTimeout(debounce);
			return setState({ kind: "hidden" });
		}
		schedule(currentPhrase());
	});

	if (location.pathname.startsWith("/search")) schedule(currentPhrase());

	unloads.add(() => {
		clearTimeout(debounce);
		root?.remove();
		root = undefined;
		state = { kind: "hidden" };
	});
}
