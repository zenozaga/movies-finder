import { Languages } from "../types";
export declare enum SourceTypes {
    MP4 = "mp4",
    WEBM = "webm",
    M3U8 = "m3u8",
    HLS = "m3u8",
    DASH = "mpd",
    MPD = "mpd"
}
export declare enum SourceResolution {
    SD = "360p",
    MD = "480p",
    HD = "720p",
    FULLHD = "1080p",
    UHD = "4k"
}
export interface SourceType {
    name: string;
    url: string;
    type: SourceTypes;
    resolution: SourceResolution;
    headers?: {
        [key: string]: string;
    };
    lang: Languages;
    from: string;
    fetcher: string;
}
export default class Source implements SourceType {
    name: string;
    url: string;
    type: SourceTypes;
    resolution: SourceResolution;
    headers?: {
        [key: string]: string;
    } | undefined;
    lang: Languages;
    from: string;
    fetcher: string;
    constructor(from: string, url: string, resolution: string, type: string, headers?: {
        [key: string]: string;
    }, fetcher?: string, lang?: string, name?: string);
    static parseResolution(resolution: string): SourceResolution;
    static parseType(type: string): SourceTypes;
    static fromObject(json: SourceType): Source;
    toJSON(): {
        url: string;
        resolution: SourceResolution;
        type: SourceTypes;
        headers: {
            [key: string]: string;
        } | undefined;
        from: string;
        fetcher: string;
    };
    toString(): string;
}
