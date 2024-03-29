import { EpisodeType, MediaTypes } from "../types";
import { CastType, Network } from "./cast";
import { CategoryType } from "./category";
import { MovieType } from "./movie";
import { SeasonType } from "./season";
export interface SerieType {
    id: string;
    link: string;
    title: string;
    subtitle: string;
    description: string;
    type: MediaTypes;
    rating: string;
    votes: number;
    released: string;
    year?: string;
    poster: string;
    background: string;
    genders: CategoryType[];
    seasons: SeasonType[];
    cast: CastType[];
    imdbID?: string;
    tmdbID?: string;
    trailers: string[];
    relates?: Array<MovieType | SerieType | EpisodeType>;
    fetcher: string;
    networks?: Network[];
}
export default class Serie implements SerieType {
    id: string;
    link: string;
    title: string;
    subtitle: string;
    description: string;
    type: MediaTypes;
    rating: string;
    votes: number;
    released: string;
    year?: string | undefined;
    poster: string;
    background: string;
    genders: CategoryType[];
    seasons: SeasonType[];
    cast: CastType[];
    imdbID?: string | undefined;
    tmdbID?: string | undefined;
    trailers: string[];
    relates?: Array<MovieType | SerieType | EpisodeType>;
    fetcher: string;
    networks?: Network[] | undefined;
    constructor(id: string, link: string, title: string, subtitle: string, description: string, rating: string, votes: number, released: string, year: string, poster: string, background: string, trailers: string[], imdbID: string, tmdbID: string, fetcher: string, seasons: SeasonType[], cast: CastType[], genders: CategoryType[], relates?: Array<MovieType | SerieType | EpisodeType> | undefined, networks?: Network[] | undefined);
    static fromObject(obj: SerieType): Serie;
    toObject(): SerieType;
    toString(): string;
}
