import { MediaTypes, SerieType } from "../types";
import Cast, { CastType } from "./cast";
import Category, { CategoryType } from "./category";
import Serie from "./serie";
import Source, { SourceType } from "./source";

export interface MovieType {

    id: string;
    link: string;
    
    title: string;
    subtitle: string;
    description: string;
    duration: string;
    
    type: string;
    
    rating: string;
    released: string;
    year?: string;

    poster: string;
    background: string;
    
    trailers: string[];

    genders: CategoryType[];
    sources: SourceType[];
    cast: CastType[];


    imdbID?: string;
    tmdbID?: string;

    
    relates?:Array<MovieType|SerieType|null>
    fetcher: string;
    

}

class Movie implements MovieType {
    
 
    id: string;
    link: string;
    title: string;
    subtitle: string;
    description: string;
    duration: string;
    type: string;
    rating: string;
    released: string;
    year?: string | undefined;
    poster: string;
    background: string;
    trailers: string[];
    genders: CategoryType[];
    sources: SourceType[];
    cast: CastType[];
    imdbID?: string | undefined;
    tmdbID?: string | undefined;
    relates?: (MovieType | SerieType | null)[] | undefined;
    fetcher: string;

    
    
    constructor(id:string, link:string, title:string, subtitle:string, description:string, duration:string, type:string, rating:string, released:string, year:string, poster:string, background:string, trailers:string[], sources:SourceType[], imdbID:string, tmdbID:string, fetcher:string, cast:CastType[], genders:CategoryType[], relates:(MovieType|SerieType|null)[]){
        this.id = id;
        this.link = link;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.duration = duration;
        this.type = MediaTypes.movie;
        this.rating = rating;
        this.released = released;
        this.year = year;
        this.poster = poster;
        this.background = background;
        this.trailers = trailers;
        this.sources = sources;
        this.imdbID = imdbID;
        this.tmdbID = tmdbID;
        this.fetcher = fetcher;
        this.cast = cast;
        this.genders = genders;
        this.relates = relates;
    }


    static fromObject(obj:MovieType){
        return new Movie(obj.id, obj.link, obj.title, obj.subtitle, obj.description, obj.duration, obj.type, obj.rating, obj.released, obj.year || "", obj.poster, obj.background, obj.trailers, obj.sources, obj.imdbID || "", obj.tmdbID || "", obj.fetcher, obj.cast, obj.genders, obj.relates ?? []);
    }

    toObject(){
        return {
            id: this.id,
            title: this.title,
            subtitle: this.subtitle,
            description: this.description,
            duration: this.duration,
            type: this.type,
            rating: this.rating,
            released: this.released,
            year: this.year,
            poster: this.poster,
            background: this.background,
            trailers: this.trailers,
            sources: this.sources,
            imdbID: this.imdbID,
            tmdbID: this.tmdbID,
            fetcher: this.fetcher,
            cast: this.cast,
            genders: this.genders,
            relates: this.relates,
        }
    }
    
    toString(){
        return JSON.stringify(this.toObject());
    }

}


export default Movie;