export const REMOTE_UI_HTML = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta name="theme-color" content="#0a0c12" />
<title>TIDAL Luna 한글 리모컨</title>
<style>
  :root {
    --bg: #0a0c12;
    --card: rgba(24, 28, 40, 0.78);
    --card-border: rgba(255, 255, 255, 0.09);
    --accent: #38bdf8;
    --accent-glow: rgba(56, 189, 248, 0.28);
    --text: #f8fafc;
    --subtext: #94a3b8;
    --muted: #64748b;
    --danger: #f43f5e;
    --success: #10b981;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Malgun Gothic", "Apple SD Gothic Neo", sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100dvh;
    overflow-x: hidden;
    position: relative;
  }
  .bg-backdrop {
    position: fixed;
    inset: -40px;
    background-size: cover;
    background-position: center;
    filter: blur(55px) brightness(0.28) saturate(1.4);
    z-index: -1;
    transition: background-image 0.6s ease;
  }
  .app-shell {
    max-width: 520px;
    margin: 0 auto;
    padding: 16px 16px 32px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 4px;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: -0.02em;
  }
  .badge {
    font-size: 11px;
    padding: 3px 8px;
    border-radius: 999px;
    background: rgba(56, 189, 248, 0.16);
    color: var(--accent);
    border: 1px solid rgba(56, 189, 248, 0.35);
    font-weight: 600;
  }
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--danger);
    display: inline-block;
    box-shadow: 0 0 8px var(--danger);
  }
  .status-dot.connected {
    background: var(--success);
    box-shadow: 0 0 8px var(--success);
  }
  .tabs {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: rgba(15, 18, 28, 0.75);
    border: 1px solid var(--card-border);
    border-radius: 12px;
    padding: 4px;
    gap: 4px;
  }
  .tab-btn {
    background: transparent;
    border: none;
    color: var(--subtext);
    padding: 8px 4px;
    border-radius: 9px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  .tab-btn.active {
    background: rgba(56, 189, 248, 0.18);
    color: var(--accent);
  }
  .card {
    background: var(--card);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--card-border);
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  }
  .panel { display: none; }
  .panel.active { display: block; }
  .cover-wrap {
    width: 100%;
    max-width: 280px;
    aspect-ratio: 1 / 1;
    margin: 4px auto 18px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.55);
    background: #161a26;
    position: relative;
  }
  .cover-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .meta-tags {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }
  .track-info {
    text-align: center;
    margin-bottom: 18px;
  }
  .track-title {
    font-size: 21px;
    font-weight: 800;
    line-height: 1.3;
    margin-bottom: 4px;
    word-break: keep-all;
  }
  .track-orig-title {
    font-size: 13px;
    color: var(--muted);
    margin-bottom: 6px;
  }
  .track-artist {
    font-size: 16px;
    color: var(--accent);
    font-weight: 600;
  }
  .track-album {
    font-size: 13px;
    color: var(--subtext);
    margin-top: 4px;
  }
  .progress-wrap {
    margin: 14px 0 6px;
  }
  input[type="range"] {
    width: 100%;
    accent-color: var(--accent);
    cursor: pointer;
    height: 6px;
    border-radius: 99px;
  }
  .time-row {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: var(--subtext);
    margin-top: 4px;
    font-variant-numeric: tabular-nums;
  }
  .controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 18px 0 14px;
    padding: 0 8px;
  }
  .ctrl-btn {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid var(--card-border);
    color: var(--text);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.15s;
  }
  .ctrl-btn:active { transform: scale(0.92); }
  .ctrl-btn.active {
    color: var(--accent);
    border-color: var(--accent);
    background: rgba(56, 189, 248, 0.15);
  }
  .play-btn {
    width: 64px;
    height: 64px;
    background: var(--accent);
    color: #06101e;
    font-size: 24px;
    font-weight: bold;
    box-shadow: 0 6px 22px var(--accent-glow);
    border: none;
  }
  .vol-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    padding: 10px 12px;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 12px;
  }
  .vol-btn {
    background: none;
    border: none;
    color: var(--subtext);
    font-size: 16px;
    cursor: pointer;
    width: 28px;
  }
  .list-container {
    max-height: 62dvh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .list-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.15s;
  }
  .list-item:hover, .list-item.current {
    background: rgba(56, 189, 248, 0.12);
    border-color: rgba(56, 189, 248, 0.35);
  }
  .list-item img {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    object-fit: cover;
    background: #1e293b;
    flex-shrink: 0;
  }
  .list-meta {
    flex: 1;
    min-width: 0;
  }
  .list-title {
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .list-artist {
    font-size: 12px;
    color: var(--subtext);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .search-bar {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }
  .input-box {
    flex: 1;
    background: rgba(0, 0, 0, 0.35);
    border: 1px solid var(--card-border);
    color: var(--text);
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 14px;
    outline: none;
  }
  .input-box:focus { border-color: var(--accent); }
  .btn-primary {
    background: var(--accent);
    color: #06101e;
    border: none;
    padding: 10px 16px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
  }
  .btn-secondary {
    background: rgba(255, 255, 255, 0.08);
    color: var(--text);
    border: 1px solid var(--card-border);
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    cursor: pointer;
  }
  .lyrics-box {
    max-height: 60dvh;
    overflow-y: auto;
    line-height: 1.75;
    font-size: 15px;
    text-align: center;
    white-space: pre-wrap;
    color: #e2e8f0;
    padding: 8px 4px;
  }
  .lyric-line {
    padding: 6px 8px;
    border-radius: 8px;
    color: var(--subtext);
    transition: all 0.25s;
    cursor: pointer;
  }
  .lyric-line.active {
    color: var(--text);
    font-weight: 700;
    font-size: 17px;
    background: rgba(56, 189, 248, 0.12);
  }
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
  }
  .form-group label {
    font-size: 12px;
    color: var(--subtext);
    font-weight: 600;
  }
  .auth-screen {
    display: none;
    width: 100%;
    max-width: 400px;
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
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: 20px;
    padding: 28px 22px;
    backdrop-filter: blur(20px);
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
    display: flex;
    flex-direction: column;
    gap: 14px;
    text-align: center;
  }
  .app-shell.hidden {
    display: none !important;
  }
</style>
</head>
<body>
<div class="bg-backdrop" id="backdrop"></div>

<!-- Token Lock Screen (Shown exclusively when token is required & not authenticated) -->
<div class="auth-screen" id="authScreen">
  <div class="auth-card">
    <div style="font-size:32px">🔒</div>
    <div style="font-size:17px;font-weight:700">TIDAL Luna 한글 리모컨</div>
    <div style="font-size:13px;color:var(--subtext);line-height:1.5" id="authScreenMsg">보안 토큰이 설정되어 있습니다.<br/>접속 토큰을 입력해주세요.</div>
    <input type="password" class="input-box" id="tokenInput" placeholder="보안 토큰 입력..." style="text-align:center;font-size:15px;padding:12px" />
    <button class="btn-primary" id="btnSaveToken" style="padding:12px;font-size:14px;width:100%">연결</button>
  </div>
</div>

<div class="app-shell" id="appShell">
  <header>
    <div class="brand">
      <span class="status-dot" id="wsDot"></span>
      <span>TIDAL Luna 한글 리모컨</span>
    </div>
    <div style="display:flex;align-items:center;gap:6px">
      <button class="btn-secondary" id="btnToggleToken" style="padding:4px 8px;font-size:11px" title="접속 보안 토큰 변경">🔑 토큰</button>
      <span class="badge" id="qualityBadge">READY</span>
    </div>
  </header>

  <div class="tabs">
    <button class="tab-btn active" data-tab="player">플레이어</button>
    <button class="tab-btn" data-tab="queue">재생목록</button>
    <button class="tab-btn" data-tab="lyrics">가사</button>
    <button class="tab-btn" data-tab="search">검색/편집</button>
  </div>

  <!-- Player Panel -->
  <div class="card panel active" id="panel-player">
    <div class="cover-wrap">
      <img id="coverImg" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='100%' height='100%' fill='%23161a26'/><text x='50%' y='50%' fill='%2364748b' font-size='18' text-anchor='middle' dominant-baseline='middle'>TIDAL</text></svg>" alt="Cover" />
    </div>
    <div class="meta-tags">
      <span class="badge" id="koSourceBadge" style="display:none">🇰🇷 한글 변환됨</span>
      <span class="badge" id="isrcBadge" style="display:none"></span>
    </div>
    <div class="track-info">
      <div class="track-title" id="trackTitle">재생 중인 곡 없음</div>
      <div class="track-orig-title" id="trackOrigTitle"></div>
      <div class="track-artist" id="trackArtist">-</div>
      <div class="track-album" id="trackAlbum"></div>
    </div>

    <div class="progress-wrap">
      <input type="range" id="seekSlider" min="0" max="100" value="0" step="1" />
      <div class="time-row">
        <span id="curTime">0:00</span>
        <span id="durTime">0:00</span>
      </div>
    </div>

    <div class="controls">
      <button class="ctrl-btn" id="btnShuffle" title="셔플">🔀</button>
      <button class="ctrl-btn" id="btnPrev" title="이전 곡">⏮</button>
      <button class="ctrl-btn play-btn" id="btnPlayPause" title="재생/일시정지">▶</button>
      <button class="ctrl-btn" id="btnNext" title="다음 곡">⏭</button>
      <button class="ctrl-btn" id="btnRepeat" title="반복">🔁</button>
    </div>

    <div class="vol-row">
      <button class="vol-btn" id="btnMute" title="음소거">🔊</button>
      <input type="range" id="volSlider" min="0" max="100" value="100" />
      <span id="volVal" style="font-size:12px;width:34px;text-align:right;color:var(--subtext)">100%</span>
    </div>
  </div>

  <!-- Queue Panel -->
  <div class="card panel" id="panel-queue">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <h3 style="font-size:15px">현재 재생 큐</h3>
      <span id="queueCount" style="font-size:12px;color:var(--subtext)">0곡</span>
    </div>
    <div class="list-container" id="queueList"></div>
  </div>

  <!-- Lyrics Panel -->
  <div class="card panel" id="panel-lyrics">
    <div class="lyrics-box" id="lyricsContainer">가사 정보가 없습니다.</div>
  </div>

  <!-- Search & Override Panel -->
  <div class="card panel" id="panel-search">
    <h3 style="font-size:15px;margin-bottom:10px">TIDAL 음원 검색 및 원격 재생</h3>
    <div class="search-bar">
      <input type="text" class="input-box" id="searchInput" placeholder="곡명 또는 아티스트 검색..." />
      <button class="btn-primary" id="btnSearch">검색</button>
    </div>
    <div class="list-container" id="searchResults" style="max-height:32dvh;margin-bottom:18px"></div>

    <hr style="border:none;border-top:1px solid var(--card-border);margin:14px 0" />
    <h3 style="font-size:15px;margin-bottom:10px">현재 곡 한글 이름 수동 지정</h3>
    <div class="form-group">
      <label>한글 곡명</label>
      <input type="text" class="input-box" id="overrideTitle" placeholder="예: 밤편지" />
    </div>
    <div class="form-group">
      <label>한글 아티스트명</label>
      <input type="text" class="input-box" id="overrideArtist" placeholder="예: 아이유" />
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn-primary" id="btnSaveOverride" style="flex:1">현재 곡 한글명 저장</button>
      <button class="btn-secondary" id="btnRefreshMeta">자동 재탐색</button>
    </div>
  </div>
</div>

<script>
  const $ = (id) => document.getElementById(id);
  const SERVER_TOKEN_REQUIRED = "__KO_TOKEN_REQUIRED__" === "true";
  const INITIAL_URL_AUTH = "__KO_INITIAL_AUTH__" === "true";
  let ws = null;
  let reconnectTimer = null;
  let authRequired = false;
  let state = {};
  let isSeeking = false;
  let isVolDragging = false;
  let parsedSubtitles = [];

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

  function showAuthBanner(msg) {
    authRequired = true;
    if (msg) $('authScreenMsg').textContent = msg;
    $('appShell').classList.add('hidden');
    $('authScreen').classList.add('visible');
    $('wsDot').classList.remove('connected');
    setTimeout(() => $('tokenInput').focus(), 50);
  }

  function hideAuthBanner() {
    authRequired = false;
    $('authScreen').classList.remove('visible');
    $('appShell').classList.remove('hidden');
  }

  // If token is configured on server and URL did not already authenticate, hide player UI immediately
  if (SERVER_TOKEN_REQUIRED && !INITIAL_URL_AUTH) {
    showAuthBanner('보안 토큰이 설정되어 있습니다. 접속 토큰을 입력해주세요.');
  }

  $('btnToggleToken').onclick = () => {
    showAuthBanner('접속 보안 토큰을 입력하거나 변경해주세요.');
  };

  function applyTokenAndConnect() {
    authToken = $('tokenInput').value.trim();
    try { localStorage.setItem('ko_remote_token', authToken); } catch (e) {}
    authRequired = false;
    connectWs();
  }

  $('btnSaveToken').onclick = applyTokenAndConnect;
  $('tokenInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') applyTokenAndConnect();
  });

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      $('panel-' + btn.dataset.tab).classList.add('active');
    });
  });

  function fmtTime(sec) {
    if (!sec || isNaN(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
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
          showAuthBanner('🔒 인증 실패: 올바른 보안 토큰을 입력해주세요.');
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

    $('qualityBadge').textContent = s.audioQuality || 'TIDAL';
    $('trackTitle').textContent = s.title || '재생 중인 곡 없음';

    if (s.originalTitle && s.koTitle && s.originalTitle !== s.title && !s.title.includes(s.originalTitle)) {
      $('trackOrigTitle').textContent = s.originalTitle;
      $('trackOrigTitle').style.display = 'block';
    } else {
      $('trackOrigTitle').style.display = 'none';
    }

    $('trackArtist').textContent = s.artist || '-';
    $('trackAlbum').textContent = s.album || '';

    if (s.isKorean) {
      $('koSourceBadge').style.display = 'inline-block';
      $('koSourceBadge').textContent = '🇰🇷 한글 (' + (s.metaSource || 'auto') + ')';
    } else {
      $('koSourceBadge').style.display = 'none';
    }

    if (s.isrc) {
      $('isrcBadge').style.display = 'inline-block';
      $('isrcBadge').textContent = s.isrc;
    } else {
      $('isrcBadge').style.display = 'none';
    }

    if (s.coverUrl && $('coverImg').dataset.src !== s.coverUrl) {
      $('coverImg').src = s.coverUrl;
      $('coverImg').dataset.src = s.coverUrl;
      $('backdrop').style.backgroundImage = 'url(' + s.coverUrl + ')';
    }

    $('btnPlayPause').textContent = s.playing ? '⏸' : '▶';
    $('btnShuffle').classList.toggle('active', !!s.shuffle);
    $('btnRepeat').classList.toggle('active', s.repeatMode > 0);
    $('btnRepeat').textContent = s.repeatMode === 2 ? '🔂' : '🔁';

    if (!isSeeking) {
      $('seekSlider').max = Math.max(1, Math.floor(s.duration || 100));
      $('seekSlider').value = Math.floor(s.currentTime || 0);
      $('curTime').textContent = fmtTime(s.currentTime);
      $('durTime').textContent = fmtTime(s.duration);
    }

    if (!isVolDragging && typeof s.volume === 'number') {
      $('volSlider').value = s.volume;
      $('volVal').textContent = Math.round(s.volume) + '%';
      $('btnMute').textContent = s.muted ? '🔇' : (s.volume < 40 ? '🔉' : '🔊');
    }

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
  }

  function renderLyrics(lyrics) {
    const box = $('lyricsContainer');
    if (!lyrics || (!lyrics.subtitles && !lyrics.plain)) {
      box.innerHTML = '가사 정보가 없습니다.';
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
        if (isAct) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }
  }

  function renderQueue(queue, currentIndex) {
    $('queueCount').textContent = queue.length + '곡';
    const wrap = $('queueList');
    wrap.innerHTML = '';
    queue.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'list-item' + (item.index === currentIndex ? ' current' : '');
      row.innerHTML =
        (item.coverUrl ? '<img src="' + item.coverUrl + '" alt="" />' : '') +
        '<div class="list-meta">' +
          '<div class="list-title">' + escapeHtml(item.title) + '</div>' +
          '<div class="list-artist">' + escapeHtml(item.artist) + '</div>' +
        '</div>' +
        '<span style="font-size:12px;color:var(--subtext)">' + fmtTime(item.duration) + '</span>';
      row.onclick = () => sendCmd({ action: 'playQueueIndex', index: item.index });
      wrap.appendChild(row);
    });
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
  }

  // Controls
  $('btnPlayPause').onclick = () => sendCmd({ action: 'toggle' });
  $('btnPrev').onclick = () => sendCmd({ action: 'previous' });
  $('btnNext').onclick = () => sendCmd({ action: 'next' });
  $('btnShuffle').onclick = () => sendCmd({ action: 'setShuffle', shuffle: !state.shuffle });
  $('btnRepeat').onclick = () => sendCmd({ action: 'setRepeatMode', repeatMode: ((state.repeatMode || 0) + 1) % 3 });
  $('btnMute').onclick = () => sendCmd({ action: 'mute', muted: !state.muted });

  $('seekSlider').addEventListener('input', (e) => {
    isSeeking = true;
    $('curTime').textContent = fmtTime(Number(e.target.value));
  });
  $('seekSlider').addEventListener('change', (e) => {
    isSeeking = false;
    sendCmd({ action: 'seek', time: Number(e.target.value) });
  });

  $('volSlider').addEventListener('input', (e) => {
    isVolDragging = true;
    const v = Number(e.target.value);
    $('volVal').textContent = v + '%';
    sendCmd({ action: 'volume', volume: v });
  });
  $('volSlider').addEventListener('change', () => { isVolDragging = false; });

  // Search
  async function doSearch() {
    const q = $('searchInput').value.trim();
    if (!q) return;
    $('searchResults').innerHTML = '<div style="font-size:13px;color:var(--subtext);padding:8px">검색 중...</div>';
    try {
      const resp = await fetch(withTokenUrl('/api/command'), {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ action: 'search', query: q })
      });
      if (resp.status === 401) {
        showAuthBanner('🔒 인증 실패: 올바른 보안 토큰을 입력해주세요.');
        $('searchResults').innerHTML = '<div style="font-size:13px;color:var(--danger);padding:8px">보안 토큰 인증이 필요합니다.</div>';
        return;
      }
      const res = await resp.json();
      const items = res.data || [];
      const wrap = $('searchResults');
      wrap.innerHTML = '';
      if (!items.length) {
        wrap.innerHTML = '<div style="font-size:13px;color:var(--subtext);padding:8px">검색 결과가 없습니다.</div>';
        return;
      }
      items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'list-item';
        row.innerHTML =
          (item.coverUrl ? '<img src="' + item.coverUrl + '" alt="" />' : '') +
          '<div class="list-meta">' +
            '<div class="list-title">' + escapeHtml(item.title) + '</div>' +
            '<div class="list-artist">' + escapeHtml(item.artist) + (item.album ? ' · ' + escapeHtml(item.album) : '') + '</div>' +
          '</div>' +
          '<button class="btn-secondary" data-playnext="1" style="margin-right:4px">+다음</button>' +
          '<button class="btn-primary" data-play="1">재생</button>';
        row.querySelector('[data-play]').onclick = (e) => {
          e.stopPropagation();
          sendCmd({ action: 'playTrack', trackId: String(item.trackId) });
        };
        row.querySelector('[data-playnext]').onclick = (e) => {
          e.stopPropagation();
          sendCmd({ action: 'playNext', trackId: String(item.trackId) });
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
  };
  $('btnRefreshMeta').onclick = () => {
    sendCmd({ action: 'refreshMeta' });
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
      $('wsDot').classList.add('connected');
      sock.send(JSON.stringify({ action: 'getState' }));
    };

    sock.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg.type === 'auth_required' || (msg.type === 'error' && msg.error === 'Unauthorized')) {
          showAuthBanner('보안 토큰이 일치하지 않습니다. 다시 입력해주세요.');
          return;
        }
        if (msg.type === 'state' && msg.state) {
          hideAuthBanner();
          renderState(msg.state);
        }
      } catch (e) {}
    };

    sock.onclose = (ev) => {
      if (ws === sock) {
        $('wsDot').classList.remove('connected');
      }
      if (ev && ev.code === 1008) {
        showAuthBanner('보안 토큰이 일치하지 않거나 필요합니다. 토큰을 입력해주세요.');
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
