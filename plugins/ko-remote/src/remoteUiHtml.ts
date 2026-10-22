export const REMOTE_UI_HTML = `<!DOCTYPE html>
<html lang="ko" data-theme="dark">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
<meta name="theme-color" content="#080b12" id="metaThemeColor" />
<title>TIDAL Luna 한글 리모컨</title>
<style>
  :root,
  [data-theme="dark"] {
    --bg: #080b12;
    --bg-elevated: #0f1420;
    --card: rgba(18, 24, 38, 0.78);
    --card-solid: #121826;
    --card-subtle: rgba(255, 255, 255, 0.045);
    --card-hover: rgba(255, 255, 255, 0.08);
    --card-border: rgba(255, 255, 255, 0.09);
    --card-border-strong: rgba(255, 255, 255, 0.16);
    --card-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    --accent: #38bdf8;
    --accent-strong: #0ea5e9;
    --accent-fg: #04101c;
    --accent-soft: rgba(56, 189, 248, 0.15);
    --accent-border: rgba(56, 189, 248, 0.36);
    --accent-glow: rgba(56, 189, 248, 0.32);
    --gold-soft: rgba(251, 191, 36, 0.14);
    --gold-text: #fbbf24;
    --gold-border: rgba(251, 191, 36, 0.35);
    --text: #f8fafc;
    --text-secondary: #cbd5e1;
    --subtext: #94a3b8;
    --muted: #64748b;
    --danger: #f43f5e;
    --danger-soft: rgba(244, 63, 94, 0.14);
    --warning: #f59e0b;
    --success: #10b981;
    --slider-track: rgba(255, 255, 255, 0.14);
    --input-bg: rgba(6, 9, 16, 0.55);
    --nav-bg: rgba(12, 16, 26, 0.84);
    --shadow-card: 0 20px 50px rgba(0, 0, 0, 0.45);
    --shadow-cover: 0 24px 56px -8px rgba(0, 0, 0, 0.72);
    --backdrop-filter: blur(64px) brightness(0.32) saturate(1.45);
    --backdrop-opacity: 0.92;
  }

  [data-theme="light"] {
    --bg: #f1f5f9;
    --bg-elevated: #ffffff;
    --card: rgba(255, 255, 255, 0.86);
    --card-solid: #ffffff;
    --card-subtle: rgba(15, 23, 42, 0.04);
    --card-hover: rgba(15, 23, 42, 0.07);
    --card-border: rgba(15, 23, 42, 0.085);
    --card-border-strong: rgba(15, 23, 42, 0.16);
    --card-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.9);
    --accent: #0284c7;
    --accent-strong: #0369a1;
    --accent-fg: #ffffff;
    --accent-soft: rgba(2, 132, 199, 0.12);
    --accent-border: rgba(2, 132, 199, 0.3);
    --accent-glow: rgba(2, 132, 199, 0.24);
    --gold-soft: rgba(217, 119, 6, 0.12);
    --gold-text: #b45309;
    --gold-border: rgba(217, 119, 6, 0.3);
    --text: #0f172a;
    --text-secondary: #334155;
    --subtext: #475569;
    --muted: #64748b;
    --danger: #e11d48;
    --danger-soft: rgba(225, 29, 72, 0.1);
    --warning: #d97706;
    --success: #059669;
    --slider-track: rgba(15, 23, 42, 0.13);
    --input-bg: rgba(241, 245, 249, 0.9);
    --nav-bg: rgba(255, 255, 255, 0.88);
    --shadow-card: 0 16px 40px rgba(15, 23, 42, 0.08);
    --shadow-cover: 0 20px 44px -8px rgba(15, 23, 42, 0.22);
    --backdrop-filter: blur(70px) brightness(1.08) saturate(1.25);
    --backdrop-opacity: 0.24;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }

  html, body {
    min-height: 100dvh;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard Variable", "Pretendard", "Noto Sans KR", "Malgun Gothic", sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    position: relative;
    line-height: 1.45;
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.25s ease, color 0.25s ease;
  }

  button, input {
    font: inherit;
    color: inherit;
  }

  .bg-backdrop {
    position: fixed;
    inset: -60px;
    background-size: cover;
    background-position: center;
    filter: var(--backdrop-filter);
    opacity: var(--backdrop-opacity);
    z-index: -2;
    transition: background-image 0.6s ease, opacity 0.35s ease, filter 0.35s ease;
    pointer-events: none;
  }

  .bg-vignette {
    position: fixed;
    inset: 0;
    background:
      radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.09), transparent 60%),
      linear-gradient(180deg, transparent 0%, var(--bg) 95%);
    z-index: -1;
    pointer-events: none;
  }

  button:focus-visible,
  input:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  /* App Layout */
  .app-shell {
    width: 100%;
    max-width: 460px;
    margin: 0 auto;
    padding: max(12px, env(safe-area-inset-top)) 16px calc(28px + env(safe-area-inset-bottom));
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .app-shell.has-mini-player {
    padding-bottom: calc(96px + env(safe-area-inset-bottom));
  }

  .app-shell.hidden {
    display: none !important;
  }

  /* Top Header */
  header.topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 4px 2px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .brand-logo {
    width: 36px;
    height: 36px;
    border-radius: 11px;
    background: linear-gradient(135deg, var(--accent), var(--accent-strong));
    color: var(--accent-fg);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 14px var(--accent-glow);
    flex-shrink: 0;
  }

  .brand-text-wrap {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .brand-title {
    font-weight: 800;
    font-size: 15px;
    letter-spacing: -0.02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .brand-status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    color: var(--subtext);
  }

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--danger);
    display: inline-block;
    box-shadow: 0 0 8px var(--danger);
    transition: background-color 0.25s ease, box-shadow 0.25s ease;
  }

  .status-dot.connected {
    background: var(--success);
    box-shadow: 0 0 8px var(--success);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10.5px;
    padding: 4px 9px;
    border-radius: 999px;
    background: var(--accent-soft);
    color: var(--accent);
    border: 1px solid var(--accent-border);
    font-weight: 700;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  .badge-quality {
    background: var(--gold-soft);
    color: var(--gold-text);
    border-color: var(--gold-border);
  }

  .badge-subtle {
    background: var(--card-subtle);
    color: var(--subtext);
    border-color: var(--card-border);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-weight: 600;
  }

  .icon-action-btn {
    min-width: 44px;
    min-height: 44px;
    padding: 0 11px;
    border-radius: 12px;
    background: var(--card-subtle);
    border: 1px solid var(--card-border);
    color: var(--text-secondary);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.12s ease;
  }

  .icon-action-btn:hover {
    background: var(--card-hover);
    border-color: var(--card-border-strong);
  }

  .icon-action-btn:active {
    transform: scale(0.95);
  }

  /* Disconnected Banner */
  .connection-banner {
    display: none;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 14px;
    background: var(--danger-soft);
    border: 1px solid rgba(244, 63, 94, 0.32);
    color: var(--text);
    font-size: 12.5px;
    font-weight: 600;
  }

  .connection-banner.visible {
    display: flex;
  }

  .connection-banner-btn {
    min-height: 44px;
    padding: 0 14px;
    border-radius: 10px;
    border: 1px solid rgba(244, 63, 94, 0.4);
    background: rgba(244, 63, 94, 0.2);
    color: var(--text);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
  }

  /* Navigation Tabs */
  .tabs {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    background: var(--nav-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--card-border);
    box-shadow: var(--card-highlight);
    border-radius: 16px;
    padding: 4px;
    gap: 4px;
  }

  .tab-btn {
    min-height: 44px;
    background: transparent;
    border: 1px solid transparent;
    color: var(--subtext);
    padding: 6px 4px;
    border-radius: 12px;
    font-size: 12.5px;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    transition: all 0.18s ease;
    white-space: nowrap;
  }

  .tab-btn svg {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
    opacity: 0.85;
  }

  .tab-btn:hover {
    color: var(--text);
  }

  .tab-btn.active {
    background: var(--accent-soft);
    color: var(--accent);
    border-color: var(--accent-border);
  }

  .tab-btn.active svg {
    opacity: 1;
  }

  .tab-count {
    font-size: 10px;
    padding: 1px 5px;
    border-radius: 999px;
    background: rgba(56, 189, 248, 0.2);
    color: var(--accent);
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  /* Cards & Panels */
  .workspace-grid {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .card {
    background: var(--card);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--card-border);
    box-shadow: var(--shadow-card), var(--card-highlight);
    border-radius: 24px;
    padding: 20px 18px;
    transition: background-color 0.25s ease, border-color 0.25s ease;
  }

  .panel {
    display: none;
    flex-direction: column;
    min-width: 0;
    animation: panelFadeIn 0.2s ease;
  }

  .panel.active {
    display: flex;
  }

  @keyframes panelFadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Player Panel */
  .cover-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2px 0 16px;
  }

  .cover-wrap {
    width: 100%;
    max-width: 268px;
    aspect-ratio: 1 / 1;
    border-radius: 22px;
    overflow: hidden;
    box-shadow: var(--shadow-cover);
    background: var(--card-solid);
    position: relative;
    transform: scale(0.965);
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease;
  }

  .cover-wrap.is-playing {
    transform: scale(1);
  }

  .cover-wrap::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
    pointer-events: none;
  }

  .cover-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: opacity 0.25s ease;
  }

  .meta-tags {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    margin-bottom: 10px;
    flex-wrap: wrap;
    min-height: 24px;
  }

  .track-info {
    text-align: center;
    margin-bottom: 14px;
    padding: 0 4px;
  }

  .track-title {
    font-size: clamp(19px, 5.2vw, 22px);
    font-weight: 800;
    line-height: 1.28;
    letter-spacing: -0.025em;
    margin-bottom: 4px;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  .track-orig-title {
    font-size: 12.5px;
    font-weight: 500;
    color: var(--muted);
    margin-bottom: 6px;
  }

  .track-artist {
    font-size: 15.5px;
    color: var(--accent);
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .track-album {
    font-size: 12.5px;
    color: var(--subtext);
    margin-top: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Custom Range Sliders */
  .progress-wrap {
    margin: 6px 0 4px;
  }

  .range-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 36px;
    background: transparent;
    cursor: pointer;
    margin: 0;
    display: block;
  }

  .range-slider::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    border-radius: 999px;
    background: linear-gradient(
      to right,
      var(--accent) 0%,
      var(--accent) var(--progress, 0%),
      var(--slider-track) var(--progress, 0%),
      var(--slider-track) 100%
    );
    transition: height 0.15s ease;
  }

  .range-slider:hover::-webkit-slider-runnable-track,
  .range-slider:active::-webkit-slider-runnable-track {
    height: 8px;
  }

  .range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--text);
    border: 2px solid var(--accent);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
    margin-top: -5px;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .range-slider:hover::-webkit-slider-thumb,
  .range-slider:active::-webkit-slider-thumb {
    transform: scale(1.22);
    box-shadow: 0 0 0 5px var(--accent-soft);
  }

  .range-slider::-moz-range-track {
    width: 100%;
    height: 6px;
    border-radius: 999px;
    background: linear-gradient(
      to right,
      var(--accent) 0%,
      var(--accent) var(--progress, 0%),
      var(--slider-track) var(--progress, 0%),
      var(--slider-track) 100%
    );
  }

  .range-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--text);
    border: 2px solid var(--accent);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
  }

  .time-row {
    display: flex;
    justify-content: space-between;
    font-size: 11.5px;
    font-weight: 600;
    color: var(--subtext);
    margin-top: -2px;
    font-variant-numeric: tabular-nums;
  }

  /* Transport Controls */
  .controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 14px 0 16px;
    padding: 0 4px;
  }

  .ctrl-btn {
    background: var(--card-subtle);
    border: 1px solid var(--card-border);
    color: var(--text);
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition: transform 0.14s ease, background-color 0.18s ease, border-color 0.18s ease, color 0.18s ease;
  }

  .ctrl-btn svg {
    width: 20px;
    height: 20px;
  }

  .ctrl-btn.skip-btn {
    width: 52px;
    height: 52px;
    background: var(--card-hover);
  }

  .ctrl-btn.skip-btn svg {
    width: 22px;
    height: 22px;
  }

  .ctrl-btn:hover {
    background: var(--card-hover);
    border-color: var(--card-border-strong);
  }

  .ctrl-btn:active {
    transform: scale(0.91);
  }

  .ctrl-btn.active {
    color: var(--accent);
    border-color: var(--accent-border);
    background: var(--accent-soft);
  }

  .ctrl-btn.active::after {
    content: "";
    position: absolute;
    bottom: 5px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--accent);
  }

  .repeat-one-badge {
    position: absolute;
    top: 6px;
    right: 6px;
    font-size: 9px;
    font-weight: 800;
    line-height: 1;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: var(--accent);
    color: var(--accent-fg);
    display: none;
    align-items: center;
    justify-content: center;
  }

  .ctrl-btn.repeat-one .repeat-one-badge {
    display: inline-flex;
  }

  .play-btn {
    width: 68px;
    height: 68px;
    background: linear-gradient(135deg, var(--accent), var(--accent-strong));
    color: var(--accent-fg);
    box-shadow: 0 10px 28px var(--accent-glow);
    border: none;
  }

  .play-btn:hover {
    background: linear-gradient(135deg, var(--accent), var(--accent-strong));
    filter: brightness(1.06);
  }

  .play-btn svg {
    width: 28px;
    height: 28px;
  }

  /* Volume Bar */
  .vol-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background: var(--card-subtle);
    border: 1px solid var(--card-border);
    border-radius: 16px;
  }

  .vol-btn {
    background: none;
    border: none;
    color: var(--subtext);
    width: 44px;
    height: 44px;
    margin-left: -6px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: color 0.15s ease, background-color 0.15s ease;
  }

  .vol-btn:hover {
    color: var(--text);
    background: var(--card-hover);
  }

  .vol-btn.muted {
    color: var(--danger);
  }

  .vol-btn svg {
    width: 20px;
    height: 20px;
  }

  .vol-val {
    font-size: 12px;
    font-weight: 700;
    width: 38px;
    text-align: right;
    color: var(--subtext);
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }

  /* Section Headers */
  .section-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }

  .section-title {
    font-size: 15px;
    font-weight: 800;
    letter-spacing: -0.015em;
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .section-subtitle {
    font-size: 12px;
    color: var(--subtext);
    font-weight: 600;
  }

  /* Queue & Search Lists */
  .list-container {
    max-height: 62dvh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-right: 2px;
    scrollbar-width: thin;
    scrollbar-color: var(--card-border-strong) transparent;
  }

  .list-item {
    display: flex;
    align-items: center;
    gap: 11px;
    min-height: 62px;
    padding: 8px 10px;
    border-radius: 14px;
    background: var(--card-subtle);
    border: 1px solid transparent;
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.12s ease;
  }

  .list-item:hover {
    background: var(--card-hover);
    border-color: var(--card-border);
  }

  .list-item:active {
    transform: scale(0.99);
  }

  .list-item.current {
    background: var(--accent-soft);
    border-color: var(--accent-border);
  }

  .list-index {
    width: 22px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: var(--muted);
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }

  .list-item.current .list-index {
    color: var(--accent);
  }

  .eq-bars {
    display: inline-flex;
    align-items: flex-end;
    justify-content: center;
    gap: 2px;
    width: 16px;
    height: 14px;
  }

  .eq-bars span {
    width: 3px;
    background: var(--accent);
    border-radius: 2px;
    animation: eqBounce 0.9s ease-in-out infinite;
  }

  .eq-bars span:nth-child(1) { height: 60%; animation-delay: 0s; }
  .eq-bars span:nth-child(2) { height: 100%; animation-delay: 0.2s; }
  .eq-bars span:nth-child(3) { height: 45%; animation-delay: 0.4s; }

  .eq-bars.paused span {
    animation-play-state: paused;
    height: 35% !important;
  }

  @keyframes eqBounce {
    0%, 100% { height: 30%; }
    50% { height: 100%; }
  }

  .list-item img {
    width: 46px;
    height: 46px;
    border-radius: 10px;
    object-fit: cover;
    background: var(--card-solid);
    flex-shrink: 0;
    border: 1px solid var(--card-border);
  }

  .list-meta {
    flex: 1;
    min-width: 0;
  }

  .list-title-row {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
  }

  .list-title {
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .list-item.current .list-title {
    color: var(--accent);
  }

  .ko-mini-pill {
    font-size: 9.5px;
    font-weight: 800;
    padding: 1px 5px;
    border-radius: 5px;
    background: var(--accent-soft);
    color: var(--accent);
    flex-shrink: 0;
  }

  .list-artist {
    font-size: 12px;
    color: var(--subtext);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 2px;
  }

  .list-duration {
    font-size: 12px;
    font-weight: 600;
    color: var(--subtext);
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
    padding-left: 4px;
  }

  .search-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  /* Inputs & Buttons */
  .search-bar {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
  }

  .search-input-wrap {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-input-icon {
    position: absolute;
    left: 13px;
    color: var(--muted);
    pointer-events: none;
    display: flex;
  }

  .input-box {
    width: 100%;
    min-height: 46px;
    background: var(--input-bg);
    border: 1px solid var(--card-border);
    color: var(--text);
    padding: 10px 14px;
    border-radius: 13px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  .search-input-wrap .input-box {
    padding-left: 38px;
    padding-right: 40px;
  }

  .input-box::placeholder {
    color: var(--muted);
  }

  .input-box:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }

  .input-clear-btn {
    position: absolute;
    right: 2px;
    width: 42px;
    height: 42px;
    border-radius: 10px;
    border: none;
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
  }

  .input-clear-btn.visible {
    display: inline-flex;
  }

  .btn-primary {
    min-height: 46px;
    background: linear-gradient(135deg, var(--accent), var(--accent-strong));
    color: var(--accent-fg);
    border: none;
    padding: 0 18px;
    border-radius: 13px;
    font-weight: 800;
    font-size: 13.5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    white-space: nowrap;
    transition: transform 0.12s ease, filter 0.15s ease;
  }

  .btn-primary:hover {
    filter: brightness(1.06);
  }

  .btn-primary:active {
    transform: scale(0.97);
  }

  .btn-secondary {
    min-height: 44px;
    background: var(--card-subtle);
    color: var(--text);
    border: 1px solid var(--card-border);
    padding: 0 14px;
    border-radius: 12px;
    font-size: 12.5px;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    white-space: nowrap;
    transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.12s ease;
  }

  .btn-secondary:hover {
    background: var(--card-hover);
    border-color: var(--card-border-strong);
  }

  .btn-secondary:active {
    transform: scale(0.97);
  }

  .btn-compact {
    min-height: 44px;
    min-width: 44px;
    padding: 0 12px;
    border-radius: 11px;
    font-size: 12px;
  }

  /* Quick Search Chips */
  .quick-chips {
    display: flex;
    align-items: center;
    gap: 6px;
    overflow-x: auto;
    padding-bottom: 6px;
    margin-bottom: 10px;
    scrollbar-width: none;
  }

  .quick-chips::-webkit-scrollbar {
    display: none;
  }

  .quick-chip {
    min-height: 40px;
    padding: 6px 13px;
    border-radius: 999px;
    background: var(--card-subtle);
    border: 1px solid var(--card-border);
    color: var(--subtext);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s ease;
  }

  .quick-chip:hover {
    color: var(--accent);
    border-color: var(--accent-border);
    background: var(--accent-soft);
  }

  /* Lyrics Panel */
  .lyrics-box {
    max-height: 62dvh;
    overflow-y: auto;
    line-height: 1.75;
    font-size: 15px;
    text-align: center;
    white-space: pre-wrap;
    color: var(--text-secondary);
    padding: 12px 6px;
    scrollbar-width: thin;
  }

  .lyric-line {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    margin: 2px 0;
    border-radius: 12px;
    color: var(--subtext);
    font-weight: 500;
    transition: all 0.25s ease;
    cursor: pointer;
    word-break: keep-all;
  }

  .lyric-line:hover {
    color: var(--text);
    background: var(--card-subtle);
  }

  .lyric-line.past {
    opacity: 0.55;
  }

  .lyric-line.active {
    color: var(--text);
    font-weight: 800;
    font-size: 17.5px;
    background: var(--accent-soft);
    border: 1px solid var(--accent-border);
    transform: scale(1.01);
  }

  /* Override Section */
  .override-card {
    margin-top: 14px;
    padding-top: 16px;
    border-top: 1px solid var(--card-border);
  }

  .override-current-pill {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 9px 12px;
    border-radius: 12px;
    background: var(--card-subtle);
    border: 1px solid var(--card-border);
    margin-bottom: 12px;
    font-size: 12px;
    color: var(--subtext);
  }

  .override-current-pill strong {
    color: var(--text);
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 12px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .form-group label {
    font-size: 12px;
    color: var(--subtext);
    font-weight: 700;
  }

  /* Empty States */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 32px 16px;
    color: var(--subtext);
    gap: 8px;
  }

  .empty-state-icon {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    background: var(--card-subtle);
    border: 1px solid var(--card-border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--muted);
    margin-bottom: 4px;
  }

  .empty-state-title {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-secondary);
  }

  .empty-state-desc {
    font-size: 12px;
    color: var(--muted);
  }

  /* Mini Player Dock (Mobile when not on player tab) */
  .mini-player {
    position: fixed;
    left: 50%;
    bottom: max(12px, env(safe-area-inset-bottom));
    transform: translateX(-50%);
    width: calc(100% - 24px);
    max-width: 436px;
    background: var(--nav-bg);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--card-border-strong);
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.5);
    border-radius: 18px;
    padding: 8px 10px;
    display: none;
    align-items: center;
    gap: 10px;
    z-index: 50;
    overflow: hidden;
  }

  .mini-player.visible {
    display: flex;
  }

  .mini-progress-bar {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2.5px;
    background: var(--accent);
    width: 0%;
    transition: width 0.3s linear;
  }

  .mini-player-main {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    min-width: 0;
    min-height: 44px;
    cursor: pointer;
  }

  .mini-player-main img {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    object-fit: cover;
    background: var(--card-solid);
    flex-shrink: 0;
  }

  .mini-meta {
    flex: 1;
    min-width: 0;
  }

  .mini-title {
    font-size: 13.5px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mini-artist {
    font-size: 11.5px;
    color: var(--accent);
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mini-controls {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }

  .mini-btn {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    border: none;
    background: transparent;
    color: var(--text);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .mini-btn:hover {
    background: var(--card-hover);
  }

  /* Auth Lock Screen */
  .auth-screen {
    display: none;
    width: 100%;
    min-height: 100dvh;
    padding: 24px 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .auth-screen.visible {
    display: flex;
  }

  .auth-card {
    width: 100%;
    max-width: 390px;
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: 24px;
    padding: 30px 24px;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow: var(--shadow-card), var(--card-highlight);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    text-align: center;
  }

  .auth-icon-circle {
    width: 56px;
    height: 56px;
    border-radius: 18px;
    background: var(--accent-soft);
    border: 1px solid var(--accent-border);
    color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Toast Notification */
  .toast-pill {
    position: fixed;
    bottom: max(20px, env(safe-area-inset-bottom));
    left: 50%;
    transform: translate(-50%, 16px);
    background: var(--card-solid);
    color: var(--text);
    border: 1px solid var(--accent-border);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
    padding: 10px 18px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 700;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
    z-index: 100;
    white-space: nowrap;
  }

  .toast-pill.show {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  /* Narrow phones: drop tab icons so all four labels fit without clipping */
  @media (max-width: 480px) {
    .tab-btn {
      font-size: 12px;
      gap: 4px;
      padding: 6px 2px;
    }

    .tab-btn svg {
      display: none;
    }
  }

  /* Desktop Two-Column Layout */
  @media (min-width: 860px) {
    .app-shell {
      max-width: 980px;
      padding: 24px 28px 40px;
      gap: 18px;
    }

    .app-shell.has-mini-player {
      padding-bottom: 40px;
    }

    .mini-player {
      display: none !important;
    }

    .workspace-grid {
      display: grid;
      grid-template-columns: 390px minmax(0, 1fr);
      gap: 20px;
      align-items: start;
    }

    #panel-player {
      display: flex !important;
      position: sticky;
      top: 20px;
    }

    /* Shrink the cover on short viewports so the volume row stays above the fold */
    .cover-wrap {
      max-width: clamp(160px, calc(100dvh - 590px), 268px);
    }

    /* When 'player' tab is selected on desktop, show queue on the right column so both columns are populated */
    .app-shell[data-active-tab="player"] #panel-queue {
      display: flex !important;
    }

    .app-shell[data-active-tab="player"] .tab-btn[data-tab="queue"] {
      background: var(--accent-soft);
      color: var(--accent);
      border-color: var(--accent-border);
    }

    .tab-btn[data-tab="player"] {
      display: none;
    }

    .tabs {
      grid-template-columns: repeat(3, 1fr);
    }

    .list-container {
      max-height: 68dvh;
    }

    .lyrics-box {
      max-height: 68dvh;
    }

    .form-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
</head>
<body>
<div class="bg-backdrop" id="backdrop"></div>
<div class="bg-vignette"></div>
<div class="toast-pill" id="toastPill" role="status" aria-live="polite"></div>

<!-- Token Lock Screen (Shown exclusively when token is required & not authenticated) -->
<div class="auth-screen" id="authScreen">
  <div class="auth-card">
    <div class="auth-icon-circle">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    </div>
    <div style="font-size:18px;font-weight:800;letter-spacing:-0.02em">TIDAL Luna 한글 리모컨</div>
    <div style="font-size:13.5px;color:var(--subtext);line-height:1.55" id="authScreenMsg">보안 토큰이 설정되어 있습니다.<br/>접속 토큰을 입력해주세요.</div>
    <input type="password" class="input-box" id="tokenInput" placeholder="보안 토큰 입력..." style="text-align:center;font-size:15px" autocomplete="off" />
    <div style="display:flex;gap:8px;width:100%">
      <button class="btn-secondary" id="btnCancelAuth" style="flex:1;display:none">돌아가기</button>
      <button class="btn-primary" id="btnSaveToken" style="flex:2;width:100%">연결하기</button>
    </div>
  </div>
</div>

<div class="app-shell" id="appShell" data-active-tab="player">
  <header class="topbar">
    <div class="brand">
      <div class="brand-logo" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L8 7l4 4 4-4-4-4zm-6 6l-4 4 4 4 4-4-4-4zm12 0l-4 4 4 4 4-4-4-4zm-6 6l-4 4 4 4 4-4-4-4z"/></svg>
      </div>
      <div class="brand-text-wrap">
        <div class="brand-title">TIDAL Luna 한글 리모컨</div>
        <div class="brand-status">
          <span class="status-dot" id="wsDot"></span>
          <span id="wsStatusText">연결 대기 중</span>
        </div>
      </div>
    </div>
    <div class="header-actions">
      <button class="icon-action-btn" id="btnThemeToggle" title="테마 전환 (다크/라이트)" aria-label="테마 전환">
        <svg id="themeIconSun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        <svg id="themeIconMoon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <button class="icon-action-btn" id="btnToggleToken" title="접속 보안 토큰 변경" aria-label="접속 보안 토큰 변경">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
        <span>토큰</span>
      </button>
    </div>
  </header>

  <div class="connection-banner" id="disconnectBanner">
    <span>서버와 연결이 끊어졌습니다. 자동 재연결 중...</span>
    <button class="connection-banner-btn" id="btnReconnectNow">지금 재연결</button>
  </div>

  <nav class="tabs" role="tablist" aria-label="리모컨 화면 전환">
    <button class="tab-btn active" data-tab="player" role="tab" aria-selected="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
      <span>플레이어</span>
    </button>
    <button class="tab-btn" data-tab="queue" role="tab" aria-selected="false">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
      <span>재생목록</span>
      <span class="tab-count" id="tabQueueCount">0</span>
    </button>
    <button class="tab-btn" data-tab="lyrics" role="tab" aria-selected="false">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
      <span>가사</span>
    </button>
    <button class="tab-btn" data-tab="search" role="tab" aria-selected="false">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <span>검색/편집</span>
    </button>
  </nav>

  <div class="workspace-grid">
    <!-- Player Panel -->
    <section class="card panel active" id="panel-player" aria-label="현재 재생 플레이어">
      <div class="cover-stage">
        <div class="cover-wrap" id="coverWrap">
          <img id="coverImg" alt="앨범 커버" />
        </div>
      </div>

      <div class="meta-tags">
        <span class="badge badge-quality" id="qualityBadge">READY</span>
        <span class="badge" id="koSourceBadge" style="display:none">🇰🇷 한글 변환됨</span>
        <span class="badge badge-subtle" id="isrcBadge" style="display:none"></span>
      </div>

      <div class="track-info">
        <div class="track-title" id="trackTitle">재생 중인 곡 없음</div>
        <div class="track-orig-title" id="trackOrigTitle" style="display:none"></div>
        <div class="track-artist" id="trackArtist">-</div>
        <div class="track-album" id="trackAlbum"></div>
      </div>

      <div class="progress-wrap">
        <input type="range" class="range-slider" id="seekSlider" min="0" max="100" value="0" step="1" aria-label="재생 위치 탐색" />
        <div class="time-row">
          <span id="curTime">0:00</span>
          <span id="durTime">0:00</span>
        </div>
      </div>

      <div class="controls">
        <button class="ctrl-btn" id="btnShuffle" title="셔플" aria-label="셔플 전환">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
        </button>
        <button class="ctrl-btn skip-btn" id="btnPrev" title="이전 곡" aria-label="이전 곡">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
        </button>
        <button class="ctrl-btn play-btn" id="btnPlayPause" title="재생/일시정지" aria-label="재생 또는 일시정지">
          <svg id="iconPlay" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v14l11-7-11-7z"/></svg>
          <svg id="iconPause" viewBox="0 0 24 24" fill="currentColor" style="display:none"><path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z"/></svg>
        </button>
        <button class="ctrl-btn skip-btn" id="btnNext" title="다음 곡" aria-label="다음 곡">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
        </button>
        <button class="ctrl-btn" id="btnRepeat" title="반복" aria-label="반복 모드 전환">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
          <span class="repeat-one-badge">1</span>
        </button>
      </div>

      <div class="vol-row">
        <button class="vol-btn" id="btnMute" title="음소거 전환" aria-label="음소거 전환">
          <svg id="iconVolHigh" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          <svg id="iconVolLow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          <svg id="iconVolMute" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
        </button>
        <input type="range" class="range-slider" id="volSlider" min="0" max="100" value="100" aria-label="볼륨 조절" />
        <span class="vol-val" id="volVal">100%</span>
      </div>
    </section>

    <!-- Queue Panel -->
    <section class="card panel" id="panel-queue" aria-label="현재 재생목록">
      <div class="section-head">
        <h3 class="section-title">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          <span>현재 재생 큐</span>
        </h3>
        <span class="section-subtitle" id="queueCount">0곡</span>
      </div>
      <div class="list-container" id="queueList"></div>
    </section>

    <!-- Lyrics Panel -->
    <section class="card panel" id="panel-lyrics" aria-label="가사">
      <div class="section-head">
        <h3 class="section-title">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          <span>실시간 싱크 가사</span>
        </h3>
        <span class="section-subtitle" id="lyricsHint">가사를 탭하면 해당 위치로 이동</span>
      </div>
      <div class="lyrics-box" id="lyricsContainer">가사 정보가 없습니다.</div>
    </section>

    <!-- Search & Override Panel -->
    <section class="card panel" id="panel-search" aria-label="음원 검색 및 한글명 수동 편집">
      <div class="section-head">
        <h3 class="section-title">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span>TIDAL 음원 검색 및 원격 재생</span>
        </h3>
      </div>

      <div class="search-bar">
        <div class="search-input-wrap">
          <span class="search-input-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </span>
          <input type="text" class="input-box" id="searchInput" placeholder="한글 또는 영문 곡명·아티스트 검색..." />
          <button type="button" class="input-clear-btn" id="btnClearSearch" aria-label="검색어 지우기">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <button class="btn-primary" id="btnSearch">검색</button>
      </div>

      <div class="quick-chips" id="quickSearchChips" aria-label="추천 검색어">
        <button type="button" class="quick-chip" data-query="밤편지">밤편지</button>
        <button type="button" class="quick-chip" data-query="예뻤어">데이식스 예뻤어</button>
        <button type="button" class="quick-chip" data-query="사계">태연 사계</button>
        <button type="button" class="quick-chip" data-query="악뮤">악뮤</button>
        <button type="button" class="quick-chip" data-query="NewJeans">NewJeans</button>
      </div>

      <div class="list-container" id="searchResults" style="max-height:34dvh"></div>

      <div class="override-card">
        <div class="section-head" style="margin-bottom:10px">
          <h3 class="section-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            <span>현재 곡 한글 이름 수동 지정</span>
          </h3>
        </div>
        <div class="override-current-pill">
          <span>원제 정보</span>
          <strong id="overrideOrigInfo">-</strong>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label for="overrideTitle">한글 곡명</label>
            <input type="text" class="input-box" id="overrideTitle" placeholder="예: 밤편지" />
          </div>
          <div class="form-group">
            <label for="overrideArtist">한글 아티스트명</label>
            <input type="text" class="input-box" id="overrideArtist" placeholder="예: 아이유" />
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn-primary" id="btnSaveOverride" style="flex:2">현재 곡 한글명 저장</button>
          <button class="btn-secondary" id="btnRefreshMeta" style="flex:1">자동 재탐색</button>
        </div>
      </div>
    </section>
  </div>
</div>

<!-- Mobile Mini Player Bar (shown when viewing Queue, Lyrics, or Search on phone screens) -->
<div class="mini-player" id="miniPlayer">
  <div class="mini-player-main" id="miniPlayerMain" title="플레이어 화면으로 이동">
    <img id="miniCoverImg" alt="" />
    <div class="mini-meta">
      <div class="mini-title" id="miniTitle">재생 중인 곡 없음</div>
      <div class="mini-artist" id="miniArtist">-</div>
    </div>
  </div>
  <div class="mini-controls">
    <button class="mini-btn" id="btnMiniPlayPause" aria-label="재생 또는 일시정지">
      <svg id="miniIconPlay" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v14l11-7-11-7z"/></svg>
      <svg id="miniIconPause" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="display:none"><path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z"/></svg>
    </button>
    <button class="mini-btn" id="btnMiniNext" aria-label="다음 곡">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
    </button>
  </div>
  <div class="mini-progress-bar" id="miniProgressBar"></div>
</div>

<script>
  const $ = (id) => document.getElementById(id);
  const SERVER_TOKEN_REQUIRED = "__KO_TOKEN_REQUIRED__" === "true";
  const INITIAL_URL_AUTH = "__KO_INITIAL_AUTH__" === "true";

  const COVER_PALETTES = [
    ['#0f172a', '#1e1b4b', '#38bdf8', '#818cf8'],
    ['#18181b', '#31102f', '#f472b6', '#38bdf8'],
    ['#0c1917', '#134e4a', '#2dd4bf', '#38bdf8'],
    ['#1e1b18', '#3b1d11', '#fb923c', '#facc15'],
    ['#111827', '#1e3a8a', '#60a5fa', '#c084fc']
  ];

  function escapeXml(s) {
    return String(s || '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  }

  function makeFallbackCoverSvg(title, artist) {
    const seedStr = (title || 'TIDAL') + '|' + (artist || 'Luna');
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
      hash = ((hash << 5) - hash + seedStr.charCodeAt(i)) | 0;
    }
    const pal = COVER_PALETTES[Math.abs(hash) % COVER_PALETTES.length];
    const cleanTitle = String(title || 'TIDAL').split('(')[0].trim().slice(0, 14);
    const cleanArtist = String(artist || 'K-Music').split('(')[0].trim().slice(0, 16);

    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">' +
        '<defs>' +
          '<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">' +
            '<stop offset="0%" stop-color="' + pal[0] + '"/>' +
            '<stop offset="55%" stop-color="' + pal[1] + '"/>' +
            '<stop offset="100%" stop-color="#07090e"/>' +
          '</linearGradient>' +
          '<radialGradient id="glow" cx="75%" cy="22%" r="65%">' +
            '<stop offset="0%" stop-color="' + pal[2] + '" stop-opacity="0.38"/>' +
            '<stop offset="100%" stop-color="' + pal[2] + '" stop-opacity="0"/>' +
          '</radialGradient>' +
          '<linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">' +
            '<stop offset="0%" stop-color="' + pal[2] + '"/>' +
            '<stop offset="100%" stop-color="' + pal[3] + '"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect width="400" height="400" fill="url(#bg)"/>' +
        '<rect width="400" height="400" fill="url(#glow)"/>' +
        '<circle cx="200" cy="176" r="112" fill="rgba(8,11,18,0.55)" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>' +
        '<circle cx="200" cy="176" r="88" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5"/>' +
        '<circle cx="200" cy="176" r="64" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5"/>' +
        '<circle cx="200" cy="176" r="36" fill="url(#ring)" opacity="0.88"/>' +
        '<circle cx="200" cy="176" r="10" fill="#080b12"/>' +
        '<text x="200" y="330" fill="#f8fafc" font-family="-apple-system,BlinkMacSystemFont,sans-serif" font-size="22" font-weight="800" text-anchor="middle">' + escapeXml(cleanTitle) + '</text>' +
        '<text x="200" y="358" fill="' + pal[2] + '" font-family="-apple-system,BlinkMacSystemFont,sans-serif" font-size="14" font-weight="700" text-anchor="middle">' + escapeXml(cleanArtist) + '</text>' +
      '</svg>';
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  const DEFAULT_COVER = makeFallbackCoverSvg('TIDAL Luna', 'Korean Remote');

  let ws = null;
  let reconnectTimer = null;
  let authRequired = false;
  let manualAuthModal = false;
  let hasConnectedOnce = false;
  let state = {};
  let isSeeking = false;
  let isVolDragging = false;
  let parsedSubtitles = [];
  let activeTab = 'player';
  let toastTimer = null;

  // Initialize cover images with fallback SVG
  $('coverImg').src = DEFAULT_COVER;
  $('miniCoverImg').src = DEFAULT_COVER;

  function setCoverWithFallback(imgEl, url, title, artist, updateBackdrop) {
    const fallback = makeFallbackCoverSvg(title, artist);
    imgEl.onerror = function () {
      if (this.src !== fallback) {
        this.src = fallback;
        if (updateBackdrop) {
          $('backdrop').style.backgroundImage = 'url("' + fallback + '")';
        }
      }
    };
    const nextSrc = url || fallback;
    imgEl.src = nextSrc;
    if (updateBackdrop) {
      $('backdrop').style.backgroundImage = 'url("' + nextSrc + '")';
    }
  }

  // Theme initialization (Dark default for music player aesthetic, toggleable to Light)
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const isLight = theme === 'light';
    $('themeIconSun').style.display = isLight ? 'block' : 'none';
    $('themeIconMoon').style.display = isLight ? 'none' : 'block';
    const metaTheme = $('metaThemeColor');
    if (metaTheme) metaTheme.setAttribute('content', isLight ? '#f1f5f9' : '#080b12');
  }

  let savedTheme = '';
  try { savedTheme = localStorage.getItem('ko_remote_theme') || ''; } catch (e) {}
  applyTheme(savedTheme === 'light' ? 'light' : 'dark');

  $('btnThemeToggle').onclick = () => {
    const cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = cur === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('ko_remote_theme', next); } catch (e) {}
    showToast(next === 'light' ? '라이트 모드로 전환되었습니다' : '다크 모드로 전환되었습니다');
  };

  function showToast(msg) {
    const el = $('toastPill');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.classList.remove('show');
    }, 2200);
  }

  function updateSliderProgress(slider) {
    if (!slider) return;
    const min = Number(slider.min || 0);
    const max = Number(slider.max || 100);
    const val = Number(slider.value || 0);
    const pct = max > min ? Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100)) : 0;
    slider.style.setProperty('--progress', pct.toFixed(1) + '%');
  }

  // Token initialization from URL (?token=...) or localStorage
  const urlParams = new URLSearchParams(location.search);
  let authToken = urlParams.get('token');
  if (authToken !== null) {
    authToken = authToken.trim();
    try { localStorage.setItem('ko_remote_token', authToken); } catch (e) {}
  } else {
    try { authToken = (localStorage.getItem('ko_remote_token') || '').trim(); } catch (e) { authToken = ''; }
  }
  $('tokenInput').value = authToken;

  function withTokenUrl(path) {
    if (!authToken) return path;
    const sep = path.includes('?') ? '&' : '?';
    return path + sep + 'token=' + encodeURIComponent(authToken);
  }

  function authHeaders(extra) {
    const h = Object.assign({}, extra || {});
    if (authToken) h['X-Ko-Token'] = authToken;
    return h;
  }

  function setWsConnectedUi(connected, statusLabel) {
    $('wsDot').classList.toggle('connected', !!connected);
    $('wsStatusText').textContent = statusLabel || (connected ? '실시간 연결됨' : '재연결 중...');
    if (connected) {
      hasConnectedOnce = true;
      $('disconnectBanner').classList.remove('visible');
    } else if (hasConnectedOnce && !authRequired) {
      $('disconnectBanner').classList.add('visible');
    }
  }

  function showAuthBanner(msg, isManual) {
    authRequired = true;
    manualAuthModal = !!isManual;
    if (msg) $('authScreenMsg').textContent = msg;
    $('btnCancelAuth').style.display = isManual ? 'inline-flex' : 'none';
    $('appShell').classList.add('hidden');
    $('miniPlayer').classList.remove('visible');
    $('authScreen').classList.add('visible');
    if (!isManual) {
      $('wsDot').classList.remove('connected');
    }
    setTimeout(() => $('tokenInput').focus(), 50);
  }

  function hideAuthBanner() {
    authRequired = false;
    manualAuthModal = false;
    $('authScreen').classList.remove('visible');
    $('appShell').classList.remove('hidden');
    updateMiniPlayerVisibility();
  }

  // If token is configured on server and URL did not already authenticate, hide player UI immediately
  if (SERVER_TOKEN_REQUIRED && !INITIAL_URL_AUTH) {
    showAuthBanner('보안 토큰이 설정되어 있습니다. 접속 토큰을 입력해주세요.', false);
  }

  $('btnToggleToken').onclick = () => {
    showAuthBanner('접속 보안 토큰을 입력하거나 변경해주세요.', true);
  };

  $('btnCancelAuth').onclick = () => {
    hideAuthBanner();
  };

  function applyTokenAndConnect() {
    authToken = $('tokenInput').value.trim();
    try { localStorage.setItem('ko_remote_token', authToken); } catch (e) {}
    hideAuthBanner();
    connectWs();
  }

  $('btnSaveToken').onclick = applyTokenAndConnect;
  $('tokenInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') applyTokenAndConnect();
  });

  $('btnReconnectNow').onclick = () => {
    connectWs();
  };

  // Tabs & Mini Player visibility
  function switchTab(tabName) {
    activeTab = tabName;
    $('appShell').dataset.activeTab = tabName;
    document.querySelectorAll('.tab-btn').forEach(b => {
      const isAct = b.dataset.tab === tabName;
      b.classList.toggle('active', isAct);
      b.setAttribute('aria-selected', isAct ? 'true' : 'false');
    });
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    const targetPanel = $('panel-' + tabName);
    if (targetPanel) targetPanel.classList.add('active');
    updateMiniPlayerVisibility();
  }

  function updateMiniPlayerVisibility() {
    const showMini = !authRequired && activeTab !== 'player' && Boolean(state && state.trackId);
    $('miniPlayer').classList.toggle('visible', showMini);
    $('appShell').classList.toggle('has-mini-player', showMini);
  }

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  $('miniPlayerMain').onclick = () => {
    switchTab('player');
  };

  function fmtTime(sec) {
    if (!sec || isNaN(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function formatQualityLabel(q) {
    if (!q) return 'TIDAL';
    return String(q).replace(/_/g, ' ');
  }

  function sendCmd(payload) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(payload));
    } else {
      fetch(withTokenUrl('/api/command'), {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload)
      }).then(r => {
        if (r.status === 401) {
          showAuthBanner('인증 실패: 올바른 보안 토큰을 입력해주세요.', false);
          throw new Error('Unauthorized');
        }
        return r.json();
      }).then(res => {
        if (res.state) renderState(res.state);
      }).catch(console.error);
    }
  }

  function parseLrc(subtitles) {
    if (!subtitles) return [];
    const lines = subtitles.split('\\n');
    const out = [];
    const rx = /^\\[(\\d+):(\\d+(?:\\.\\d+)?)\\]\\s*(.*)$/;
    for (const line of lines) {
      const m = rx.exec(line.trim());
      if (m) {
        const time = parseInt(m[1], 10) * 60 + parseFloat(m[2]);
        const text = m[3].trim();
        if (text) out.push({ time, text });
      }
    }
    return out;
  }

  let lastTrackId = null;
  let lastQueueSig = '';

  function renderState(s) {
    if (!s) return;
    state = s;

    $('qualityBadge').textContent = formatQualityLabel(s.audioQuality);
    $('trackTitle').textContent = s.title || '재생 중인 곡 없음';
    $('miniTitle').textContent = s.title || '재생 중인 곡 없음';

    if (s.originalTitle && s.koTitle && s.originalTitle !== s.title && !s.title.includes(s.originalTitle)) {
      $('trackOrigTitle').textContent = s.originalTitle;
      $('trackOrigTitle').style.display = 'block';
    } else {
      $('trackOrigTitle').style.display = 'none';
    }

    $('trackArtist').textContent = s.artist || '-';
    $('miniArtist').textContent = s.artist || '-';
    $('trackAlbum').textContent = s.album || '';

    const origSummary = [s.originalArtist, s.originalTitle].filter(Boolean).join(' — ');
    $('overrideOrigInfo').textContent = origSummary || (s.title || '-');

    if (s.isKorean) {
      $('koSourceBadge').style.display = 'inline-flex';
      $('koSourceBadge').textContent = '🇰🇷 한글 · ' + (s.metaSource || 'auto');
    } else {
      $('koSourceBadge').style.display = 'none';
    }

    if (s.isrc) {
      $('isrcBadge').style.display = 'inline-flex';
      $('isrcBadge').textContent = s.isrc;
    } else {
      $('isrcBadge').style.display = 'none';
    }

    const coverSig = (s.coverUrl || '') + '|' + (s.trackId || '') + '|' + (s.title || '');
    if ($('coverImg').dataset.sig !== coverSig) {
      $('coverImg').dataset.sig = coverSig;
      setCoverWithFallback($('coverImg'), s.coverUrl, s.koTitle || s.title, s.koArtist || s.artist, true);
      setCoverWithFallback($('miniCoverImg'), s.coverUrl, s.koTitle || s.title, s.koArtist || s.artist, false);
    }

    $('coverWrap').classList.toggle('is-playing', !!s.playing);
    $('iconPlay').style.display = s.playing ? 'none' : 'block';
    $('iconPause').style.display = s.playing ? 'block' : 'none';
    $('miniIconPlay').style.display = s.playing ? 'none' : 'block';
    $('miniIconPause').style.display = s.playing ? 'block' : 'none';

    $('btnShuffle').classList.toggle('active', !!s.shuffle);
    $('btnRepeat').classList.toggle('active', s.repeatMode > 0);
    $('btnRepeat').classList.toggle('repeat-one', s.repeatMode === 2);

    if (!isSeeking) {
      const dur = Math.max(1, Math.floor(s.duration || 100));
      const cur = Math.floor(s.currentTime || 0);
      $('seekSlider').max = dur;
      $('seekSlider').value = cur;
      updateSliderProgress($('seekSlider'));
      $('curTime').textContent = fmtTime(s.currentTime);
      $('durTime').textContent = fmtTime(s.duration);
      const pct = Math.max(0, Math.min(100, (cur / dur) * 100));
      $('miniProgressBar').style.width = pct.toFixed(1) + '%';
    }

    if (!isVolDragging && typeof s.volume === 'number') {
      $('volSlider').value = s.volume;
      updateSliderProgress($('volSlider'));
      $('volVal').textContent = (s.muted ? '음소거' : Math.round(s.volume) + '%');
      $('btnMute').classList.toggle('muted', !!s.muted);
      $('iconVolMute').style.display = s.muted ? 'block' : 'none';
      $('iconVolLow').style.display = (!s.muted && s.volume < 40) ? 'block' : 'none';
      $('iconVolHigh').style.display = (!s.muted && s.volume >= 40) ? 'block' : 'none';
    }

    // Update playing state on active queue equalizer bars
    const eqEl = $('queueList').querySelector('.eq-bars');
    if (eqEl) eqEl.classList.toggle('paused', !s.playing);

    // Track changed -> update lyrics and override placeholders
    if (s.trackId !== lastTrackId) {
      lastTrackId = s.trackId;
      $('overrideTitle').value = s.koTitle || '';
      $('overrideArtist').value = s.koArtist || '';
      renderLyrics(s.lyrics);
    } else if (s.lyrics && !$('lyricsContainer').dataset.hasLyrics) {
      renderLyrics(s.lyrics);
    }

    highlightCurrentLyric(s.currentTime || 0);

    // Queue update
    const qSig = (s.queue || []).map(q => q.trackId + ':' + q.title).join('|') + '@' + s.currentIndex;
    if (qSig !== lastQueueSig) {
      lastQueueSig = qSig;
      renderQueue(s.queue || [], s.currentIndex);
    }

    updateMiniPlayerVisibility();
  }

  function renderLyrics(lyrics) {
    const box = $('lyricsContainer');
    lastActiveLyric = -1;
    if (!lyrics || (!lyrics.subtitles && !lyrics.plain)) {
      box.innerHTML =
        '<div class="empty-state">' +
          '<div class="empty-state-icon">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>' +
          '</div>' +
          '<div class="empty-state-title">가사 정보가 없습니다</div>' +
          '<div class="empty-state-desc">이 음원에 제공되는 가사가 없거나 불러오는 중입니다.</div>' +
        '</div>';
      delete box.dataset.hasLyrics;
      parsedSubtitles = [];
      return;
    }
    box.dataset.hasLyrics = '1';
    parsedSubtitles = parseLrc(lyrics.subtitles);
    if (parsedSubtitles.length > 0) {
      box.innerHTML = '';
      parsedSubtitles.forEach((line, idx) => {
        const div = document.createElement('div');
        div.className = 'lyric-line';
        div.dataset.idx = idx;
        div.textContent = line.text;
        div.onclick = () => sendCmd({ action: 'seek', time: line.time });
        box.appendChild(div);
      });
    } else {
      box.textContent = lyrics.plain || '가사 정보가 없습니다.';
    }
  }

  let lastActiveLyric = -1;
  function highlightCurrentLyric(curTime) {
    if (!parsedSubtitles.length) return;
    let activeIdx = -1;
    for (let i = 0; i < parsedSubtitles.length; i++) {
      if (curTime >= parsedSubtitles[i].time) activeIdx = i;
      else break;
    }
    if (activeIdx !== lastActiveLyric) {
      lastActiveLyric = activeIdx;
      const lines = $('lyricsContainer').querySelectorAll('.lyric-line');
      lines.forEach((el, i) => {
        const isAct = i === activeIdx;
        el.classList.toggle('active', isAct);
        el.classList.toggle('past', activeIdx > -1 && i < activeIdx);
        if (isAct) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }
  }

  function renderQueue(queue, currentIndex) {
    $('queueCount').textContent = queue.length + '곡';
    $('tabQueueCount').textContent = String(queue.length);
    const wrap = $('queueList');
    wrap.innerHTML = '';
    if (!queue.length) {
      wrap.innerHTML =
        '<div class="empty-state">' +
          '<div class="empty-state-icon">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>' +
          '</div>' +
          '<div class="empty-state-title">재생 대기열이 비어 있습니다</div>' +
          '<div class="empty-state-desc">검색 탭에서 원하는 곡을 찾아 재생해보세요.</div>' +
        '</div>';
      return;
    }

    queue.forEach((item) => {
      const isCurrent = item.index === currentIndex;
      const row = document.createElement('div');
      row.className = 'list-item' + (isCurrent ? ' current' : '');

      const indexHtml = isCurrent
        ? '<div class="list-index"><span class="eq-bars' + (state.playing ? '' : ' paused') + '"><span></span><span></span><span></span></span></div>'
        : '<div class="list-index">' + (item.index + 1) + '</div>';

      const koBadgeHtml = item.isKorean ? '<span class="ko-mini-pill">KR</span>' : '';
      const itemFallback = makeFallbackCoverSvg(item.title, item.artist);

      row.innerHTML =
        indexHtml +
        '<img src="' + escapeHtml(item.coverUrl || itemFallback) + '" alt="" />' +
        '<div class="list-meta">' +
          '<div class="list-title-row">' +
            '<div class="list-title">' + escapeHtml(item.title) + '</div>' +
            koBadgeHtml +
          '</div>' +
          '<div class="list-artist">' + escapeHtml(item.artist) + '</div>' +
        '</div>' +
        '<span class="list-duration">' + fmtTime(item.duration) + '</span>';

      const imgEl = row.querySelector('img');
      if (imgEl) {
        imgEl.onerror = function () {
          if (this.src !== itemFallback) this.src = itemFallback;
        };
      }

      row.onclick = () => sendCmd({ action: 'playQueueIndex', index: item.index });
      wrap.appendChild(row);
    });
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
  }

  // Controls
  $('btnPlayPause').onclick = () => sendCmd({ action: 'toggle' });
  $('btnMiniPlayPause').onclick = (e) => {
    e.stopPropagation();
    sendCmd({ action: 'toggle' });
  };
  $('btnPrev').onclick = () => sendCmd({ action: 'previous' });
  $('btnNext').onclick = () => sendCmd({ action: 'next' });
  $('btnMiniNext').onclick = (e) => {
    e.stopPropagation();
    sendCmd({ action: 'next' });
  };
  $('btnShuffle').onclick = () => sendCmd({ action: 'setShuffle', shuffle: !state.shuffle });
  $('btnRepeat').onclick = () => sendCmd({ action: 'setRepeatMode', repeatMode: ((state.repeatMode || 0) + 1) % 3 });
  $('btnMute').onclick = () => sendCmd({ action: 'mute', muted: !state.muted });

  $('seekSlider').addEventListener('input', (e) => {
    isSeeking = true;
    updateSliderProgress(e.target);
    $('curTime').textContent = fmtTime(Number(e.target.value));
  });
  $('seekSlider').addEventListener('change', (e) => {
    isSeeking = false;
    updateSliderProgress(e.target);
    sendCmd({ action: 'seek', time: Number(e.target.value) });
  });

  $('volSlider').addEventListener('input', (e) => {
    isVolDragging = true;
    updateSliderProgress(e.target);
    const v = Number(e.target.value);
    $('volVal').textContent = v + '%';
    sendCmd({ action: 'volume', volume: v });
  });
  $('volSlider').addEventListener('change', () => { isVolDragging = false; });

  updateSliderProgress($('seekSlider'));
  updateSliderProgress($('volSlider'));

  // Search
  function renderInitialSearchPrompt() {
    $('searchResults').innerHTML =
      '<div class="empty-state" style="padding:20px 12px">' +
        '<div class="empty-state-title">한글 곡명·초성·아티스트로 바로 검색하세요</div>' +
        '<div class="empty-state-desc">한글 검색어를 자동으로 영문 제목 및 ISRC로 변환해 TIDAL 카탈로그에서 찾습니다.</div>' +
      '</div>';
  }
  renderInitialSearchPrompt();

  $('searchInput').addEventListener('input', () => {
    $('btnClearSearch').classList.toggle('visible', $('searchInput').value.length > 0);
  });

  $('btnClearSearch').onclick = () => {
    $('searchInput').value = '';
    $('btnClearSearch').classList.remove('visible');
    renderInitialSearchPrompt();
    $('searchInput').focus();
  };

  document.querySelectorAll('.quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $('searchInput').value = chip.dataset.query || '';
      $('btnClearSearch').classList.add('visible');
      doSearch();
    });
  });

  async function doSearch() {
    const q = $('searchInput').value.trim();
    if (!q) return;
    $('searchResults').innerHTML =
      '<div class="empty-state" style="padding:20px 12px">' +
        '<div class="empty-state-title">검색 중...</div>' +
        '<div class="empty-state-desc">"' + escapeHtml(q) + '" 음원을 찾고 있습니다.</div>' +
      '</div>';
    try {
      const resp = await fetch(withTokenUrl('/api/command'), {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ action: 'search', query: q })
      });
      if (resp.status === 401) {
        showAuthBanner('인증 실패: 올바른 보안 토큰을 입력해주세요.', false);
        $('searchResults').innerHTML = '<div style="font-size:13px;color:var(--danger);padding:8px">보안 토큰 인증이 필요합니다.</div>';
        return;
      }
      const res = await resp.json();
      const items = res.data || [];
      const wrap = $('searchResults');
      wrap.innerHTML = '';
      if (!items.length) {
        wrap.innerHTML =
          '<div class="empty-state" style="padding:20px 12px">' +
            '<div class="empty-state-title">검색 결과가 없습니다</div>' +
            '<div class="empty-state-desc">다른 곡명이나 아티스트 이름으로 다시 검색해보세요.</div>' +
          '</div>';
        return;
      }
      items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'list-item';
        const itemFallback = makeFallbackCoverSvg(item.title, item.artist);
        row.innerHTML =
          '<img src="' + escapeHtml(item.coverUrl || itemFallback) + '" alt="" />' +
          '<div class="list-meta">' +
            '<div class="list-title">' + escapeHtml(item.title) + '</div>' +
            '<div class="list-artist">' + escapeHtml(item.artist) + (item.album ? ' · ' + escapeHtml(item.album) : '') + '</div>' +
          '</div>' +
          '<div class="search-actions">' +
            '<button class="btn-secondary btn-compact" data-playnext="1" title="다음 곡으로 재생">+다음</button>' +
            '<button class="btn-primary btn-compact" data-play="1" title="즉시 재생">재생</button>' +
          '</div>';

        const imgEl = row.querySelector('img');
        if (imgEl) {
          imgEl.onerror = function () {
            if (this.src !== itemFallback) this.src = itemFallback;
          };
        }

        row.querySelector('[data-play]').onclick = (e) => {
          e.stopPropagation();
          sendCmd({ action: 'playTrack', trackId: String(item.trackId) });
          showToast('선택한 곡을 재생합니다');
        };
        row.querySelector('[data-playnext]').onclick = (e) => {
          e.stopPropagation();
          sendCmd({ action: 'playNext', trackId: String(item.trackId) });
          showToast('다음 재생 곡으로 추가했습니다');
        };
        wrap.appendChild(row);
      });
    } catch (e) {
      $('searchResults').innerHTML = '<div style="font-size:13px;color:var(--danger);padding:8px">검색 오류 발생</div>';
    }
  }
  $('btnSearch').onclick = doSearch;
  $('searchInput').addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  // Override save
  $('btnSaveOverride').onclick = () => {
    if (!state.trackId) return;
    sendCmd({
      action: 'setOverride',
      trackId: String(state.trackId),
      koTitle: $('overrideTitle').value.trim(),
      koArtist: $('overrideArtist').value.trim()
    });
    showToast('현재 곡 한글 이름이 저장되었습니다');
  };
  $('btnRefreshMeta').onclick = () => {
    sendCmd({ action: 'refreshMeta' });
    showToast('한글 메타데이터를 다시 탐색합니다');
  };

  function connectWs() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    if (ws) {
      try {
        ws.onclose = null;
        ws.close();
      } catch (e) {}
      ws = null;
    }

    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = withTokenUrl(proto + '//' + location.host + '/ws');
    const sock = new WebSocket(wsUrl);
    ws = sock;

    sock.onopen = () => {
      setWsConnectedUi(true, '실시간 연결됨');
      sock.send(JSON.stringify({ action: 'getState' }));
    };

    sock.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg.type === 'auth_required' || (msg.type === 'error' && msg.error === 'Unauthorized')) {
          showAuthBanner('보안 토큰이 일치하지 않습니다. 다시 입력해주세요.', false);
          return;
        }
        if ((msg.type === 'state' || msg.type === 'ack') && msg.state) {
          if (!manualAuthModal) {
            hideAuthBanner();
          }
          renderState(msg.state);
        }
      } catch (e) {}
    };

    sock.onclose = (ev) => {
      if (ws === sock) {
        setWsConnectedUi(false, '재연결 중...');
      }
      if (ev && ev.code === 1008) {
        showAuthBanner('보안 토큰이 일치하지 않거나 필요합니다. 토큰을 입력해주세요.', false);
        return;
      }
      if (!authRequired) {
        reconnectTimer = setTimeout(connectWs, 2000);
      }
    };
  }

  // Periodic keep-alive ping every 20s
  setInterval(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      try {
        ws.send(JSON.stringify({ action: 'ping' }));
      } catch (e) {}
    }
  }, 20000);

  if (!SERVER_TOKEN_REQUIRED || authToken) {
    connectWs();
  }
</script>
</body>
</html>
`;
