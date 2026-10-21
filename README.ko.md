# TidaLuna 한국 음원 한글 변환 + 내부망/VPN WebSocket 리모컨 (`@luna/ko-remote`)

[🇬🇧 English](./README.md) | [🇰🇷 한국어](./README.ko.md)

TIDAL 데스크톱 앱([TidaLuna](https://github.com/Inrixia/TidaLuna))에서 **1) 한국 음원일 때 한글 곡명·아티스트명을 자동으로 찾아 표시**하고, **2) 한글 검색어로 영문 카탈로그 음원을 검색**하며, **3) 내부망(LAN) 및 Tailscale(테일스케일) VPN에서 접속해 실시간으로 TIDAL을 제어할 수 있는 HTTP + WebSocket 리모컨 서버 및 모바일 웹앱**을 제공하는 플러그인입니다.

---

## ✨ 주요 기능

### 1. 한국 음원 한글 메타데이터 자동 변환 (100% ToS 준수 공식 공개 API)
3단계 하이브리드 파이프라인으로 영문으로만 등록된 한국 음원의 원제(한글 곡명·아티스트명)를 찾아냅니다:
1. **MusicBrainz ISRC 매칭 (`musicbrainz-isrc`, CC0 퍼블릭 도메인)**: 음원의 국제 표준 코드(ISRC)로 MusicBrainz DB의 한국어 제목 및 `locale="ko"` 아티스트 별칭을 조회합니다. (예: `DAY6 - You Were Beautiful` → `데이식스 (DAY6) - 예뻤어 (You Were Beautiful)`)
2. **Apple Music / iTunes US → KR 교차 조회 (`itunes-kr`, 공식 공개 API)**: 영문 곡명/가수명으로 트랙 ID를 찾은 뒤 한국 스토어(`country=KR&lang=ko_kr`) 메타데이터를 조회합니다. (예: `IU - Through the Night` → `아이유 (IU) - 밤편지 (Through the Night)`)
3. **MusicBrainz 한국어 음반(`script=Kore`) 트랙리스트 & 내장 K-Pop 사전 (`musicbrainz-album` / `dictionary`)**: 앨범 Release-Group 내 한글판 트랙 번호 매칭 및 200+ 국내 아티스트 내장 사전을 결합합니다.
4. **로컬 영구 캐시 & 수동 오버라이드**: 한 번 찾은 한글 이름은 TidaLuna `ReactiveStore`(IndexedDB)에 영구 캐싱되어 재조회 없이 즉시 표시되며, 리모컨 웹 UI에서 원하는 한글 이름으로 직접 수정·고정할 수도 있습니다.

### 2. 한글 검색어 자동 역변환 (한글 → TIDAL 영문/ISRC 검색)
TIDAL에는 한국 곡이 영문(`Letting Go`, `Through the Night` 등)으로만 등록되어 있어 한글로 검색하면 결과가 나오지 않는 문제를 해결합니다.
- **리모컨 웹앱 검색창**과 **TIDAL 데스크톱 앱 상단 검색창** 모두에서 한글로 `"놓아 놓아 놓아"`, `"밤편지"`, `"태연 사계"`, `"데이식스 예뻤어"` 등을 입력하면 자동으로 영문 원제(`"Letting Go DAY6"`, `"Through the Night IU"`)와 ISRC를 찾아 검색해 줍니다.

### 3. TIDAL 데스크톱 앱 내부 표시
- **Redux 스토어 & 하단 플레이어 바 DOM 패치**: 재생 중인 트랙과 로드된 트랙 리스트의 제목·아티스트명을 선택한 형식(`한글 (원제)`, `한글만`, `원제 (한글)`)으로 표시합니다.
- **플로팅 KR 배지**: 한국 음원 재생 시 좌측 하단에 `KR 아티스트 — 한글곡명` 배지가 표시되며, 배지를 클릭하면 표기 모드가 즉시 전환됩니다.

### 4. 내부망 / VPN WebSocket 원격 제어 (`0.0.0.0:24123`)
- **내장 모바일 리모컨 웹앱 (`GET /`)**: 별도 앱 설치 없이 스마트폰/태블릿/다른 PC 브라우저에서 `http://<TIDAL-PC-IP>:24123`으로 접속하면 다크 글래스모피즘 디자인의 한글 리모컨 웹앱이 열립니다.
- **실시간 양방향 WebSocket (`/ws`)**:
  - 재생/일시정지, 이전/다음 곡, 구간 탐색(Seek), 볼륨 조절, 음소거, 셔플/반복 모드 제어
  - 현재 재생 큐(재생목록) 한글 조회 및 클릭 즉시 곡 전환
  - 실시간 싱크 가사(LRC) 하이라이트 및 가사 줄 클릭 시 해당 구간 이동
  - TIDAL 카탈로그 원격 음원 검색(한글/영문 모두 지원) 및 즉시 재생 / 다음 곡 예약

---

## 📦 설치 방법

### TidaLuna Plugin Store (`Install from URL`)로 한 줄 설치
TIDAL이 설치된 PC에서 **TIDAL 실행 → Luna Settings → Plugin Store**로 이동한 뒤, **Install from URL** 입력란에 아래 주소를 붙여넣습니다:

```text
https://raw.githubusercontent.com/welldoingk/tidal-luna-ko-remote/main/dist/luna.ko-remote.mjs
```

*(스토어 목록 자체를 추가하려면 아래 URL 입력:)*
```text
https://raw.githubusercontent.com/welldoingk/tidal-luna-ko-remote/main/dist/store.json
```

설치 후 **Plugins 탭**에서 `@luna/ko-remote`가 켜져 있는지 확인하고, Native 모듈 권한 허용 창이 뜨면 **Allow(허용)**를 눌러주세요.

---

## 🌐 Tailscale (테일스케일) & 내부망 연결 가이드

**[Tailscale](https://tailscale.com)**을 사용하면 공유기 포트포워딩 없이 집 안팎 어디서든 스마트폰이나 다른 PC에서 안전하게 TIDAL을 원격 제어할 수 있습니다.

1. **Tailscale 설치 및 로그인**
   - TIDAL이 실행되는 PC와 리모컨으로 쓸 기기(스마트폰/태블릿/노트북)에 각각 Tailscale을 설치하고 같은 계정으로 로그인합니다.
2. **Windows 방화벽 포트 허용 (TIDAL이 켜진 Windows PC)**
   - PowerShell(관리자 권한)에서 아래 명령어를 1회 실행해 `24123` 포트를 열어줍니다:
     ```powershell
     New-NetFirewallRule -DisplayName "TidaLuna KoRemote (24123)" -Direction Inbound -Protocol TCP -LocalPort 24123 -Action Allow
     ```
3. **리모컨 웹앱 접속 방법**
   - **Tailscale 접속 (외부/내부 어디서나)**: `http://<TIDAL-PC-Tailscale-IP(100.x.y.z)>:24123` (또는 MagicDNS 활성화 시 `http://<PC-이름>:24123`)
   - **같은 공유기 내부망(Wi-Fi) 접속**: `http://<TIDAL-PC-내부IP(192.168.x.x)>:24123`
   - *(팁: TIDAL PC에서 `tailscale serve --bg 24123` 명령을 실행하면 Tailnet 전용 HTTPS 주소로도 바로 접속할 수 있습니다!)*

---

## 🔌 WebSocket & HTTP API 명세

- **상태 조회**: `GET http://<IP>:24123/api/state`
- **명령 전송 (HTTP)**: `POST http://<IP>:24123/api/command` (`Content-Type: application/json`)
- **실시간 연동 (WebSocket)**: `ws://<IP>:24123/ws`
  - 연결 시 즉시 `{ "type": "state", "state": { ... } }` 수신
  - 명령 전송 예시:
    - 재생/일시정지 토글: `{"action": "toggle"}`
    - 다음 곡 / 이전 곡: `{"action": "next"}`, `{"action": "previous"}`
    - 볼륨 조절: `{"action": "volume", "volume": 70}` (또는 `"+5"`, `"-5"`)
    - 위치 이동(초): `{"action": "seek", "time": 60}`
    - 큐 인덱스 재생: `{"action": "playQueueIndex", "index": 2}`
    - 곡 검색(한글/영문): `{"action": "search", "query": "놓아 놓아 놓아"}`

---

## 🛠️ 빌드 및 단독 테스트

```bash
# 의존성 설치
pnpm install --ignore-scripts

# 플러그인 빌드 (./dist)
pnpm run build

# 한글 변환 & 한글 검색 역변환 & WebSocket 자동 검증 실행
pnpm run test

# TIDAL 없이 단독 데모 리모컨 서버 실행 (포트 24123)
npx tsx test/verify.ts --demo
```
