import { ReactiveStore } from "@luna/core";
import {
	LunaButtonSetting,
	LunaSelectItem,
	LunaSelectSetting,
	LunaSettings,
	LunaSwitchSetting,
	LunaTextSetting,
} from "@luna/ui";
import React from "react";
import { getLocalConnectUrls } from "./server.native";
import type { DisplayFormatMode, KoreanTrackMeta } from "./types";

export interface KoRemoteSettings {
	enableKoreanPatch: boolean;
	patchTidalDom: boolean;
	showFloatingKoBadge: boolean;
	formatMode: DisplayFormatMode;
	enableRemoteServer: boolean;
	port: number;
	bindHost: string;
	authToken: string;
	overrides: Record<string, { koTitle?: string; koArtist?: string }>;
	cache: Record<string, KoreanTrackMeta>;
}

export const settings = await ReactiveStore.getPluginStorage<KoRemoteSettings>("ko-remote", {
	enableKoreanPatch: true,
	patchTidalDom: true,
	showFloatingKoBadge: true,
	formatMode: "ko_with_orig",
	enableRemoteServer: true,
	port: 24123,
	bindHost: "0.0.0.0",
	authToken: "",
	overrides: {},
	cache: {},
});

export const Settings = () => {
	const [enableKoreanPatch, setEnableKoreanPatch] = React.useState(settings.enableKoreanPatch);
	const [patchTidalDom, setPatchTidalDom] = React.useState(settings.patchTidalDom);
	const [showFloatingKoBadge, setShowFloatingKoBadge] = React.useState(settings.showFloatingKoBadge);
	const [formatMode, setFormatMode] = React.useState<DisplayFormatMode>(settings.formatMode);
	const [enableRemoteServer, setEnableRemoteServer] = React.useState(settings.enableRemoteServer);
	const [port, setPort] = React.useState(String(settings.port));
	const [bindHost, setBindHost] = React.useState(settings.bindHost);
	const [authToken, setAuthToken] = React.useState(settings.authToken);
	const [urls, setUrls] = React.useState<string[]>([]);
	const [cacheCount, setCacheCount] = React.useState(Object.keys(settings.cache || {}).length);

	React.useEffect(() => {
		getLocalConnectUrls()
			.then(setUrls)
			.catch(() => {});
	}, [port, enableRemoteServer]);

	return (
		<LunaSettings>
			<LunaSwitchSetting
				title="한국 음원 한글 이름 자동 변환"
				desc="한국 음원(ISRC, K-Pop 아티스트, iTunes KR / MusicBrainz 매칭)일 때 곡명과 아티스트명을 한글로 변환합니다."
				checked={enableKoreanPatch}
				onChange={(_, checked) => {
					const v = checked ?? false;
					setEnableKoreanPatch(v);
					settings.enableKoreanPatch = v;
				}}
			/>

			<LunaSelectSetting<DisplayFormatMode>
				title="한글 표기 형식"
				desc="변환된 한글 제목과 영문 원제를 표시하는 방식을 선택합니다."
				value={formatMode}
				onChange={(e) => {
					const v = (e.target.value as DisplayFormatMode) || "ko_with_orig";
					setFormatMode(v);
					settings.formatMode = v;
				}}
			>
				<LunaSelectItem value="ko_with_orig">한글 우선 + 원제 병기 — 예: 밤편지 (Through the Night)</LunaSelectItem>
				<LunaSelectItem value="ko_only">한글만 표시 — 예: 밤편지</LunaSelectItem>
				<LunaSelectItem value="orig_with_ko">원제 우선 + 한글 병기 — 예: Through the Night (밤편지)</LunaSelectItem>
			</LunaSelectSetting>

			<LunaSwitchSetting
				title="TIDAL 앱 내부 UI 한글 직접 적용"
				desc="TIDAL 데스크톱 앱의 플레이어 바와 트랙 목록(Redux 스토어 & DOM)에 한글 이름을 덮어씁니다."
				checked={patchTidalDom}
				onChange={(_, checked) => {
					const v = checked ?? false;
					setPatchTidalDom(v);
					settings.patchTidalDom = v;
				}}
			/>

			<LunaSwitchSetting
				title="하단 플레이어 바 한글 배지 표시"
				desc="현재 재생 중인 곡이 한국 음원일 때 하단 플레이어 바 옆에 한글 곡명/가수명 배지를 명확히 표시합니다."
				checked={showFloatingKoBadge}
				onChange={(_, checked) => {
					const v = checked ?? false;
					setShowFloatingKoBadge(v);
					settings.showFloatingKoBadge = v;
				}}
			/>

			<LunaSwitchSetting
				title="내부망 / Tailscale WebSocket 원격 제어 서버 활성화"
				desc={`HTTP + WebSocket 리모컨 서버를 실행합니다. 접속 주소: ${urls.join(" , ") || `http://127.0.0.1:${port}`}`}
				checked={enableRemoteServer}
				onChange={(_, checked) => {
					const v = checked ?? false;
					setEnableRemoteServer(v);
					settings.enableRemoteServer = v;
				}}
			/>

			<LunaTextSetting
				title="원격 제어 서버 포트 (기본: 24123)"
				desc="내부망 및 Tailscale VPN에서 접속할 TCP 포트 번호입니다. (Windows 방화벽 인바운드 허용 필요)"
				type="number"
				value={port}
				onChange={(e) => {
					const raw = e.target.value;
					setPort(raw);
					const num = Number(raw);
					if (!Number.isNaN(num) && num >= 1024 && num <= 65535) {
						settings.port = num;
					}
				}}
			/>

			<LunaTextSetting
				title="바인딩 호스트 주소 (기본: 0.0.0.0)"
				desc="0.0.0.0으로 설정하면 로컬 PC, 내부망(192.168.x.x), Tailscale(100.x.y.z) 모두에서 접근 가능합니다."
				value={bindHost}
				onChange={(e) => {
					const v = e.target.value.trim() || "0.0.0.0";
					setBindHost(v);
					settings.bindHost = v;
				}}
			/>

			<LunaTextSetting
				title="접속 보안 토큰 (선택)"
				desc="비워두면 내부망/VPN에서 토큰 없이 바로 접속하며, 지정 시 ?token=값 또는 Authorization 헤더가 필요합니다."
				value={authToken}
				onChange={(e) => {
					const v = e.target.value;
					setAuthToken(v);
					settings.authToken = v;
				}}
			/>

			<LunaButtonSetting
				title={`한글 메타데이터 캐시 초기화 (${cacheCount}곡 저장됨)`}
				desc="저장된 한글 변환 캐시를 비우고 다시 조회하도록 초기화합니다."
				onClick={() => {
					settings.cache = {};
					setCacheCount(0);
				}}
			>
				캐시 비우기
			</LunaButtonSetting>
		</LunaSettings>
	);
};
