import Cast from "../models/cast";
import Category from "../models/category";
import Episode from "../models/episode";
import Movie from "../models/movie";
import Season from "../models/season";
import Serie from "../models/serie";
import DefaultProvider, { HomeType } from "../providers/default-provider";
declare class TMDBAPI extends DefaultProvider {
    name: string;
    site: string;
    language: string;
    /**
     *  Headers for the requests
     */
    headers(): {
        Referer: string;
        "User-Agent": string;
        Host: string;
        Origin: string;
    };
    parseSource(html: string): {
        title: string;
        subtitle: string;
        description: string;
        runtime: string;
        poster: string;
        background: string;
        rating: string;
        release: string;
        genders: Category[];
        cast: Cast[];
        trailers: string[];
    };
    movies(options?: {} | undefined): Promise<Movie[]>;
    search(query: string, options?: {} | undefined): Promise<(Movie | Serie | Episode)[]>;
    movie(id: string, options?: any): Promise<Movie>;
    series(options?: {} | undefined): Promise<Serie[]>;
    serie(id: string): Promise<Serie>;
    serieFull(id: string, options?: any): Promise<Serie>;
    seasons(serieID?: string | undefined, options?: any): Promise<Season[]>;
    season(id: string, serieID?: string | undefined, options?: any): Promise<Season>;
    episodes(seasonID?: string | undefined, serieID?: string | undefined): Promise<Episode[]>;
    episode(id: string, seasonID?: string | undefined, serieID?: string | undefined): Promise<Episode>;
    genders(): Promise<Category[]>;
    cast(): Promise<Cast[]>;
    byType(type?: string | undefined, options?: {} | undefined): Promise<(Movie | Serie | Episode)[]>;
    getById(id: string, type?: string | undefined): Promise<Movie | Serie | Episode>;
    top(): Promise<(Movie | Serie | Episode)[]>;
    topMovies(): Promise<Movie[]>;
    topSeries(): Promise<Serie[]>;
    home(): Promise<HomeType>;
    /**
     * @type {TMDBAPI}
     */
    static ___instance?: TMDBAPI;
    /**
     * return a TMDBAPI instance
     * @returns {TMDBAPI}
     */
    static get instance(): TMDBAPI | undefined;
}
export default TMDBAPI;
