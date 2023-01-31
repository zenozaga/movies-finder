import Requester from "../models/requester";
import Serie, { SerieType } from "../models/serie";
import Movie, { MovieType } from '../models/movie';
import Episode, { EpisodeType } from "../models/episode";
import Category from "../models/category";
import Cast from "../models/cast";
import Season, { SeasonType } from "../models/season";


export type HomeType = {
    episodes:Episode[],
    movies:MovieType[],
    series:SerieType[],
    topMovies?:MovieType[],
    topSeries?:SerieType[]
}


export interface DefaultProviderType {

    name:string;
    language:string;
    site:string;

    get requester():Requester | undefined;

    headers(extra?:any):{} | undefined;
    setSite(site:string):void;
    setRequester(requester:Requester):void;

    match(urlOrID:string):boolean;

    byType(type:string, options?:{}):Promise<Array<MovieType|SerieType|EpisodeType>>;
    search(query:string, options?:{}):Promise<Array<MovieType|SerieType|EpisodeType>>;

    getById(id:string, type?:string):Promise<MovieType|SerieType|EpisodeType>;

    top():Promise<Array<MovieType|SerieType|EpisodeType>>;
    topMovies():Promise<Array<MovieType>>;
    topSeries():Promise<Array<SerieType>>;

    home():Promise<HomeType>;

    movies(options?:{}):Promise<Array<MovieType>>;
    movie(id:string, options?:any):Promise<MovieType>;

    series(options?:{}):Promise<Array<SerieType>>;
    serie(id:string, options?:any):Promise<SerieType>;

    seasons(serieID?:string):Promise<Array<SeasonType>>;
    season(id:string, serieID?:string):Promise<SeasonType>;
    episodes(seasonID?:string, serieID?:string):Promise<Array<EpisodeType>>;
    episode(id:string, seasonID?:string, serieID?:string):Promise<EpisodeType>;

    genders():Promise<Array<Category>>;
    cast():Promise<Array<Cast>>;
}

class DefaultProvider implements DefaultProviderType {

    
    name: string = "Default Provider";
    language: string = "es";
    site: string = "";

    private _requester?:Requester;

    get requester(): Requester {
        if(!this._requester) throw new Error("Requester not set");
        return this._requester!;
    };
    
    setRequester(requester: Requester): void {
        this._requester = requester;
    }

    headers(extra?:any): {} | undefined {
        throw new Error("Method not implemented.");
    }
    
    setSite(site: string): void {
        this.site = site
    }

    
    match(urlOrID: string): boolean {
        throw new Error("Method not implemented.");
    }
    
    byType(type: string, options?: {} | undefined): Promise<(MovieType | SerieType | EpisodeType)[]> {
        throw new Error("Method not implemented.");
    }
 
    search(query: string, options?: {} | undefined): Promise<(MovieType | SerieType | EpisodeType)[]> {
        throw new Error("Method not implemented.");
    }
    
    getById(id: string, type?: string | undefined): Promise<MovieType | SerieType | EpisodeType> {
        throw new Error("Method not implemented.");
    }
    
    top(): Promise<(MovieType | SerieType | EpisodeType)[]> {
        throw new Error("Method not implemented.");
    }

    topMovies(): Promise<MovieType[]> {
        throw new Error("Method not implemented.");
    }
    topSeries(): Promise<SerieType[]> {
        throw new Error("Method not implemented.");
    }

    home(): Promise<HomeType> {
        throw new Error("Method not implemented.");
    }
    
    movies(options?: {} | undefined): Promise<MovieType[]> {
        throw new Error("Method not implemented.");
    }
    
    movie(id: string,options?:any): Promise<MovieType> {
        throw new Error("Method not implemented.");
    }

    series(options?: {} | undefined): Promise<SerieType[]> {
        throw new Error("Method not implemented.");
    }

    serie(id: string,options?:any): Promise<SerieType> {
        throw new Error("Method not implemented.");
    }
    
    seasons(serieID?: string | undefined, options?:any): Promise<SeasonType[]> {
        throw new Error("Method not implemented.");
    }

    season(id: string, serieID?: string | undefined, options?:any): Promise<SeasonType> {
        throw new Error("Method not implemented.");
    }

    episodes(seasonID?: string | undefined, serieID?: string | undefined, options?:any): Promise<EpisodeType[]> {
        throw new Error("Method not implemented.");
    }

    episode(id: string, seasonID?: string | undefined, serieID?: string | undefined, options?:any): Promise<EpisodeType> {
        throw new Error("Method not implemented.");
    }

    genders(options?:any): Promise<Category[]> {
        throw new Error("Method not implemented.");
    }

    cast(options?:any): Promise<Cast[]> {
        throw new Error("Method not implemented.");
    }
     
}


export default DefaultProvider;