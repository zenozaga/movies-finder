import Movie from "./movie";
import Serie from "./serie";
import Source from "./source";
export interface EpisodeType {
    id: string;
    title: string;
    description: string;
    duration: string;
    released: string;
    rating: string;
    votes: number;
    episode: number;
    season: number;
    link: string;
    poster: string;
    servers: Source[];
    fetcher: string;
    imdbID?: string;
    tmdbID?: string;
    relates?: Array<Movie | Serie | null>;
}
declare class Episode implements EpisodeType {
    id: string;
    title: string;
    description: string;
    duration: string;
    released: string;
    rating: string;
    votes: number;
    episode: number;
    season: number;
    link: string;
    poster: string;
    servers: Source[];
    fetcher: string;
    imdbID?: string | undefined;
    tmdbID?: string | undefined;
    relates?: Array<Movie | Serie | null> | undefined;
    constructor(id: string, title: string, description: string, duration: string, released: string, rating: string, votes: number, episode: number, season: number, link: string, poster: string, servers: Source[], fetcher: string, imdbID: string, tmdbID: string, relates: Array<Movie | Serie | null>);
    static fromObject(obj: EpisodeType): Episode;
    toObject(): Object;
    toString(): string;
}
export default Episode;
