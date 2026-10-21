# TidaLuna Korean Metadata & LAN/VPN WebSocket Remote (`@luna/ko-remote`)

[🇬🇧 English](./README.md) | [🇰🇷 한국어](./README.ko.md)

A **[TidaLuna](https://github.com/Inrixia/TidaLuna)** plugin for the official TIDAL desktop client that provides:
1. **Automatic Korean Track & Artist Name Localization** (applied to both the TIDAL desktop UI and the remote web app)
2. **Bidirectional Korean-to-English Search Resolution** (search in Hangul directly inside TIDAL or the remote UI)
3. **Built-in HTTP + WebSocket Remote Control Server & Mobile Web App** accessible across your local network (LAN) and **Tailscale** VPN

---

## ✨ Key Features

### 1. Automatic Korean Metadata Localization (100% ToS-Compliant Open APIs)
Many K-Pop and Korean tracks on TIDAL are cataloged only under their English translated or romanized titles (e.g., `IU - Through the Night`, `DAY6 - You Were Beautiful`, `DAY6 - Letting Go`). `@luna/ko-remote` resolves their original Korean titles and artist names through a 3-stage pipeline:
1. **MusicBrainz ISRC Lookup (`musicbrainz-isrc`, CC0 Public Domain)**: Queries MusicBrainz using the track's international standard recording code (ISRC) to retrieve official Korean recording titles and `locale="ko"` artist aliases (with strict 1 req/sec rate-limit compliance).
2. **Apple iTunes US → KR Cross-Store Lookup (`itunes-kr`, Official Public API)**: Resolves the track ID and fetches localized Korean metadata (`country=KR&lang=ko_kr`).
3. **MusicBrainz Hangul (`script=Kore`) Release Tracklist & Built-in K-Pop Dictionary (`musicbrainz-album` / `dictionary`)**: Matches track numbers against Hangul releases within the same MusicBrainz Release-Group and includes a built-in dictionary of 200+ Korean artists.
4. **Persistent Local Cache & Manual Overrides**: Once resolved, metadata is cached permanently in TidaLuna's `ReactiveStore` (`IndexedDB`) for instant zero-latency display. You can also manually override Korean titles/artists from the remote web UI.

### 2. Korean Search Query Translation (Hangul → TIDAL English/ISRC)
Because TIDAL's catalog indexes many Korean tracks only in English, searching in Hangul (e.g., `"놓아 놓아 놓아"`, `"밤편지"`, `"태연 사계"`) normally returns zero results.
- `@luna/ko-remote` automatically intercepts Hangul search queries in both **TIDAL's native search bar** and the **Remote Web UI**, resolves them via MusicBrainz (CC0) + iTunes into English titles and ISRCs (e.g., `"놓아 놓아 놓아"` → `"Letting Go DAY6"` / `US5TA1600014`), and returns the exact TIDAL tracks.

### 3. TIDAL Desktop UI Integration
- **Redux Store & Footer Player Bar Patching**: Replaces or pairs English titles/artists with Korean names in three selectable formats:
  - `Korean (Original)` — e.g., `밤편지 (Through the Night)`
  - `Korean Only` — e.g., `밤편지`
  - `Original (Korean)` — e.g., `Through the Night (밤편지)`
- **Floating `KR` Badge**: Displays a sleek floating badge above the player bar whenever a Korean track is playing. Click the badge at any time to cycle through display modes.

### 4. LAN / Tailscale WebSocket Remote Control (`0.0.0.0:24123`)
- **Zero-Install Mobile Web Remote (`GET /`)**: Open `http://<TIDAL-PC-IP>:24123` on any smartphone, tablet, or PC on your LAN or **Tailscale** network (Tailnet) to access a responsive glassmorphism remote UI.
- **Real-Time Bidirectional WebSocket (`/ws`)**:
  - Play, Pause, Toggle, Next, Previous, Seek, Volume, Mute, Shuffle, and Repeat controls
  - Live Play Queue viewer with Korean titles and one-tap track switching
  - Synced Lyrics (LRC) viewer with real-time line highlighting and tap-to-seek
  - Remote TIDAL Catalog Search (supports both Korean & English queries) with Play Now / Play Next actions

---

## 📦 Installation

### Install via TidaLuna Plugin Store (`Install from URL`)
Open **TIDAL Desktop → Luna Settings → Plugin Store**, and paste the following URL into **Install from URL**:

```text
https://raw.githubusercontent.com/welldoingk/tidal-luna-ko-remote/main/dist/luna.ko-remote.mjs
```

*(Alternatively, to add the repository as a plugin store:)*
```text
https://raw.githubusercontent.com/welldoingk/tidal-luna-ko-remote/main/dist/store.json
```

When prompted by TidaLuna's security dialog to allow native modules (`http`, `https`, `ws`, `os`, `electron`, `net`), click **Allow / Trust**.

---

## 🌐 Tailscale & Local Network Setup

With **[Tailscale](https://tailscale.com)** installed on both your TIDAL desktop PC and your smartphone/laptop, you can control TIDAL from anywhere (inside or outside your home) without port forwarding:

1. **Install & Sign in to Tailscale** on the PC running TIDAL and on your remote device (phone/tablet/laptop).
2. **Allow Inbound Port `24123` in Windows Firewall** on the TIDAL PC (run once in Administrator PowerShell):
   ```powershell
   New-NetFirewallRule -DisplayName "TidaLuna KoRemote (24123)" -Direction Inbound -Protocol TCP -LocalPort 24123 -Action Allow
   ```
3. **Connect from Browser**:
   - **Via Tailscale IP (100.x.y.z) or MagicDNS**: `http://<TIDAL-PC-TAILSCALE-IP>:24123` (or `http://<machine-name>:24123`)
   - **Via Local Wi-Fi / LAN**: `http://<TIDAL-PC-LAN-IP>:24123`
   - *(Tip: You can also run `tailscale serve --bg 24123` on the TIDAL PC to expose it as a private HTTPS URL on your Tailnet!)*

---

## 🔌 HTTP & WebSocket API Reference

You can also integrate `@luna/ko-remote` with Elgato Stream Deck, Home Assistant, or custom scripts:

- **Get Current State**: `GET http://<IP>:24123/api/state`
- **Send Command (HTTP)**: `POST http://<IP>:24123/api/command` (`Content-Type: application/json`)
- **Real-Time WebSocket**: `ws://<IP>:24123/ws`
  - Immediately pushes `{ "type": "state", "state": { ... } }` upon connection and on any state change.
  - Command payload examples:
    - Toggle play/pause: `{"action": "toggle"}`
    - Next / Previous track: `{"action": "next"}`, `{"action": "previous"}`
    - Set volume: `{"action": "volume", "volume": 75}` (or relative `"+5"`, `"-5"`)
    - Seek to position (seconds): `{"action": "seek", "time": 60}`
    - Play queue index: `{"action": "playQueueIndex", "index": 2}`
    - Search tracks (Korean or English): `{"action": "search", "query": "놓아 놓아 놓아"}`

---

## 🛠️ Development & Testing

```bash
# Install dependencies
pnpm install --ignore-scripts

# Build plugin bundle to ./dist
pnpm run build

# Run automated metadata resolution & WebSocket integration tests
pnpm run test

# Run standalone demo remote server on port 24123 (without TIDAL installed)
npx tsx test/verify.ts --demo
```
