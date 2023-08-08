import { EpisodeType, MediaTypes } from "../types";
import Cast, { CastType, Network } from "./cast";
import Category, { CategoryType } from "./category";
import Movie, { MovieType } from "./movie";
import Season, { SeasonType } from "./season";

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
    relates?:Array<MovieType|SerieType|EpisodeType>

    fetcher: string;
    networks?: Network[];

}


export default class Serie implements SerieType{

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
    relates?: Array<MovieType|SerieType|EpisodeType>;
    fetcher: string;
    networks?: Network[] | undefined;

 
    constructor(id:string, link:string , title:string, subtitle:string, description:string,  rating:string, votes:number, released:string, year:string, poster:string, background:string, trailers:string[], imdbID:string, tmdbID:string, fetcher:string, seasons:SeasonType[], cast:CastType[], genders:CategoryType[], relates:Array<MovieType|SerieType|EpisodeType> | undefined = [], networks:Network[] | undefined = []){
        this.id = id;
        this.link = link;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.rating = rating;
        this.released = released;
        this.poster = poster;
        this.background = background;
        this.trailers = trailers;
        this.imdbID = imdbID;
        this.tmdbID = tmdbID;
        this.fetcher = fetcher;
        this.votes = votes;

        this.seasons = seasons;
        this.cast = cast;
        this.genders = genders;

        this.year = year;


        this.cast = cast;
        this.genders = genders;
        this.relates = relates ?? [];

        this.type = MediaTypes.tv;

        this.networks = networks;
        
    }

    
    static fromObject(obj:SerieType):Serie{
        return new  Serie(
            obj.id,
            obj.link,
            obj.title,
            obj.subtitle,
            obj.description,
            obj.rating,
            obj.votes,
            obj.released,
            obj.year ?? "",
            obj.poster,
            obj.background,
            obj.trailers,
            obj.imdbID ?? "",
            obj.tmdbID ?? "",
            obj.fetcher,
            obj.seasons,
            obj.cast,
            obj.genders,
            obj.relates ?? [],
            obj.networks ?? []
        )
    }

    

    toObject():SerieType{

        return {
            id: this.id,
            link: this.link,
            title: this.title,
            subtitle: this.subtitle,
            description: this.description,
            type: this.type,
            rating: this.rating,
            released: this.released,
            poster: this.poster,
            background: this.background,
            trailers: this.trailers,
            imdbID: this.imdbID,
            tmdbID: this.tmdbID,
            fetcher: this.fetcher,
            votes: this.votes,
            year: this.year,
            seasons: this.seasons,
            cast: this.cast,
            genders:this.genders,
            relates: this.relates ?? [],
            networks: this.networks ?? []
        }
    }

    toString():string{
        return JSON.stringify(this.toObject());
    }

}