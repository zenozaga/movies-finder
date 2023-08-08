export declare enum NetworkType {
    streaming = "streaming",
    social = "social",
    official = "official"
}
export interface Network {
    name: string;
    image: string;
    url?: string;
    type?: NetworkType;
}
export interface CastType {
    id: string;
    name: string;
    character?: string;
    type: "cast";
    avatar: string;
    link: string;
    fetcher: string;
    imdbID?: string;
    tmdbID?: string;
}
declare class Cast implements CastType {
    id: string;
    name: string;
    character?: string;
    type: "cast";
    avatar: string;
    link: string;
    fetcher: string;
    imdbID?: string;
    tmdbID?: string;
    constructor(name: string, character: string, id: string, type: "cast", avatar: string, link: string, fetcher: string, imdbID?: string, tmdbID?: string);
    static fromObject(obj: CastType): Cast;
    toObject(): {
        name: string;
        character: string | undefined;
        id: string;
        type: "cast";
        avatar: string;
        link: string;
        fetcher: string;
        imdbID: string | undefined;
        tmdbID: string | undefined;
    };
    toString(): string;
}
export default Cast;
