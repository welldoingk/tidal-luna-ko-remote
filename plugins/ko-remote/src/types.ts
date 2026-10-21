export interface KoreanTrackMeta {
	trackId: string;
	isrc?: string | null;
	originalTitle: string;
	originalArtist: string;
	originalAlbum?: string;
	koTitle?: string | null;
	koArtist?: string | null;
	koAlbum?: string | null;
	displayTitle: string;
	displayArtist: string;
	displayAlbum?: string;
	isKorean: boolean;
	source: "override" | "cache" | "musicbrainz-isrc" | "itunes-kr" | "musicbrainz-album" | "dictionary" | "none";
	updatedAt: number;
}

export interface QueueTrackItem {
	index: number;
	trackId: string;
	title: string;
	originalTitle: string;
	artist: string;
	originalArtist: string;
	album?: string;
	duration?: number;
	coverUrl?: string;
	isKorean?: boolean;
}

export interface SearchTrackItem {
	trackId: string;
	title: string;
	artist: string;
	album?: string;
	duration?: number;
	coverUrl?: string;
	audioQuality?: string;
}

export interface RemotePlaybackState {
	playing: boolean;
	playbackState: string;
	currentTime: number;
	duration: number;
	volume: number;
	muted: boolean;
	shuffle: boolean;
	repeatMode: number;
	trackId: string;
	title: string;
	originalTitle: string;
	artist: string;
	originalArtist: string;
	album: string;
	originalAlbum: string;
	koTitle?: string | null;
	koArtist?: string | null;
	isKorean: boolean;
	metaSource: string;
	coverUrl: string;
	isrc: string;
	audioQuality: string;
	lyrics?: {
		plain?: string;
		subtitles?: string;
	} | null;
	queue: QueueTrackItem[];
	currentIndex: number;
	updatedAt: number;
}

export type RemoteActionType =
	| "play"
	| "pause"
	| "toggle"
	| "next"
	| "previous"
	| "seek"
	| "volume"
	| "mute"
	| "setShuffle"
	| "setRepeatMode"
	| "playTrack"
	| "playQueueIndex"
	| "playNext"
	| "addToQueue"
	| "search"
	| "setOverride"
	| "refreshMeta"
	| "getState";

export interface RemoteCommandPayload {
	action: RemoteActionType;
	time?: number;
	volume?: number | string;
	muted?: boolean;
	shuffle?: boolean;
	repeatMode?: number;
	trackId?: string;
	index?: number;
	query?: string;
	koTitle?: string;
	koArtist?: string;
}

export type DisplayFormatMode = "ko_with_orig" | "ko_only" | "orig_with_ko";
