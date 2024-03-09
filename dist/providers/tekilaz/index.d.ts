import DefaultProvider, { HomeType, Section } from "../default-provider";
import Movie from "../../models/movie";
import Serie from "../../models/serie";
import Cast from "../../models/cast";
import Category from "../../models/category";
import { Response } from "../../models/requester";
import { MediaTypes, SerieType, MovieType, SeasonType, EpisodeType } from "../../types";
declare class Tekilaz extends DefaultProvider {
    name: string;
    language: string;
    site: string;
    hash: any;
    urlInfo(url: string): {
        slug: string | null;
        season: string | null;
        episode: string | null;
        type: MediaTypes;
    };
    checkMovePermanent(promise?: Promise<Response>): Promise<string>;
    getHash(): Promise<any>;
    parseCollection(list?: never[]): Array<MovieType | SerieType | EpisodeType>;
    parseElement(json: any, relates?: Array<MovieType | SerieType | EpisodeType>): MovieType | SerieType | EpisodeType;
    /**
     *
     * @param {String} url
     */
    fixUrl(url: string): string;
    headers(extra?: any): any;
    /**
     * Verify if the url or id is from this provider
     * @param urlOrID
     * @returns {boolean}
     */
    match(urlOrID: string): boolean;
    home(): Promise<HomeType>;
    byType(type: string, options?: {} | undefined): Promise<(MovieType | SerieType | EpisodeType)[]>;
    search(query: string, options?: {} | undefined): Promise<(MovieType | SerieType | EpisodeType)[]>;
    getById(idorLink: string, type?: string | undefined): Promise<MovieType | SerieType | EpisodeType>;
    top(): Promise<(MovieType | SerieType)[]>;
    topMovies(): Promise<MovieType[]>;
    topSeries(): Promise<SerieType[]>;
    movies(options?: {} | undefined): Promise<MovieType[]>;
    movie(id: string): Promise<Movie>;
    series(options?: {} | undefined): Promise<SerieType[]>;
    serie(id: string): Promise<Serie>;
    seasons(serieID?: string | undefined): Promise<SeasonType[]>;
    season(id: string, serieID?: string | undefined): Promise<SeasonType>;
    episodes(seasonID?: string | undefined, serieID?: string | undefined): Promise<EpisodeType[]>;
    episode(id: string, seasonID?: string | undefined, serieID?: string | undefined): Promise<EpisodeType>;
    genders(): Promise<Category[]>;
    cast(): Promise<Cast[]>;
    sections(): Promise<Section[]>;
}
export default Tekilaz;
