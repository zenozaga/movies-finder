import Movie, { MovieType } from "./movie";
import Serie, { SerieType } from "./serie";
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
 
    relates?:Array<MovieType|SerieType|EpisodeType>

 
}

class Episode implements EpisodeType {
    
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
    relates?: Array<MovieType|SerieType|EpisodeType>;

    constructor(id:string, title:string, description:string, duration:string, released:string, rating:string, votes:number, episode:number, season:number, link:string, poster:string, servers:Source[], fetcher:string, imdbID:string, tmdbID:string, relates?:Array<MovieType|SerieType|EpisodeType>){
        this.id = id;
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.released = released;
        this.rating = rating;
        this.votes = votes;
        this.episode = episode;
        this.season = season;
        this.link = link;
        this.poster = poster;
        this.servers = servers;
        this.fetcher = fetcher;
        this.imdbID = imdbID;
        this.tmdbID = tmdbID;
        this.relates = relates ?? [];
    }


    static fromObject(obj: EpisodeType): Episode {
        return new Episode(obj.id, obj.title, obj.description, obj.duration, obj.released, obj.rating, obj.votes, obj.episode, obj.season, obj.link, obj.poster, obj.servers, obj.fetcher, obj.imdbID ?? "", obj.tmdbID ?? "", obj.relates ?? []);
    }

    
    toObject(): Object {
        
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            duration: this.duration,
            released: this.released,
            rating: this.rating,
            votes: this.votes,
            episode: this.episode,
            season: this.season,
            link: this.link,
            poster: this.poster,
            servers: this.servers,
            fetcher: this.fetcher,
            imdbID: this.imdbID,
            tmdbID: this.tmdbID,
            relates: this.relates ?? []
        }

    }

    toString(): string {
        return JSON.stringify(this.toObject());
    }

 
    
 
}

export default Episode;