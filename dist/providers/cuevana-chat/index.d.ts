import DefaultProvider, { HomeType, Section } from "../default-provider";
import Movie from "../../models/movie";
import Serie from "../../models/serie";
import Episode from "../../models/episode";
import Cast from "../../models/cast";
import Category from "../../models/category";
import { Response } from "../../models/requester";
import { SerieType, MovieType, SeasonType, EpisodeType } from "../../types";
declare class CuevanaChat extends DefaultProvider {
    name: string;
    site: string;
    language: string;
    match(urlOrID: string): boolean;
    /**
     * Headers for the request
     * @returns {{}}
     */
    headers(extra?: {}): {
        "User-Agent": string;
        Origin: string;
        Referer: string;
    };
    /**
     * Check if the response is a 301 Moved Permanently
     * @param promise
     * @returns
     */
    checkMovePermanent(promise?: Promise<Response>): Promise<string>;
    /**
     *
     * @param {String} html
     * @returns {Array<Movie|Serie>}
     */
    parseCollectionHTML(html: string, selector?: string, type?: string): Array<MovieType | SerieType | EpisodeType>;
    parseMovieHTML(html: string, type?: string): Movie | Serie | Episode;
    /**
     *
     * @param {String} url
     */
    fixUrl(url: string): string;
    fixImageUrl(url: string): string;
    byType(type: string, options?: {} | undefined): Promise<(MovieType | SerieType | EpisodeType)[]>;
    search(query: string, options?: {} | undefined): Promise<(MovieType | SerieType | EpisodeType)[]>;
    getById(idorLink: string, type?: string | undefined): Promise<MovieType | SerieType | EpisodeType>;
    top(): Promise<(MovieType | SerieType | EpisodeType)[]>;
    topMovies(): Promise<MovieType[]>;
    topSeries(): Promise<SerieType[]>;
    home(): Promise<HomeType>;
    movies(options?: {} | undefined): Promise<MovieType[]>;
    movie(id: string, options?: any): Promise<MovieType>;
    series(options?: {} | undefined): Promise<SerieType[]>;
    serie(id: string, options?: any): Promise<SerieType>;
    seasons(serieID?: string | undefined, options?: any): Promise<SeasonType[]>;
    season(id: string, serieID?: string | undefined, options?: any): Promise<SeasonType>;
    episodes(seasonID?: string | undefined, serieID?: string | undefined, options?: any): Promise<EpisodeType[]>;
    episode(id: string, seasonID?: string | undefined, serieID?: string | undefined, options?: any): Promise<EpisodeType>;
    genders(): Promise<Category[]>;
    cast(options?: any): Promise<Cast[]>;
    sections(): Promise<Section[]>;
}
export default CuevanaChat;
