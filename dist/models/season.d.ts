import Episode from "./episode";
export interface SeasonType {
    id: string;
    link: string;
    name: string;
    season: number;
    poster: string;
    type?: string;
    released: string;
    year?: string;
    episodes: Episode[];
    tmdbID?: string;
    imdbID?: string;
    fetcher: string;
}
declare class Season implements SeasonType {
    id: string;
    link: string;
    name: string;
    season: number;
    poster: string;
    type: string;
    released: string;
    year?: string | undefined;
    episodes: Episode[];
    tmdbID?: string | undefined;
    imdbID?: string | undefined;
    fetcher: string;
    constructor(id: string, link: string, name: string, season: number, poster: string, released: string, year: string, episodes: Episode[], tmdbID: string, imdbID: string, fetcher: string, type?: string);
    static fromObject(obj: SeasonType): Season;
    toObject(): {
        id: string;
        link: string;
        name: string;
        season: number;
        poster: string;
        type: string;
        released: string;
        year: string | undefined;
        episodes: Episode[];
        tmdbID: string | undefined;
        imdbID: string | undefined;
        fetcher: string;
    };
    toString(): string;
    addEpisode(episode: Episode): void;
}
export default Season;
