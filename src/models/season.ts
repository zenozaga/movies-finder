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

  episodes:Episode[];

  tmdbID?: string;
  imdbID?: string;

  fetcher: string;

}

class Season implements SeasonType {

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


  constructor(id: string, link: string, name: string, season: number, poster: string, released: string, year: string, episodes: Episode[], tmdbID: string, imdbID: string, fetcher: string, type?: string) {

    this.id = id;
    this.link = link;
    this.name = name;
    this.season = season;
    this.poster = poster;
    this.type = type ?? "season";
    this.released = released;
    this.year = year;
    this.episodes = episodes ?? [];
    this.tmdbID = tmdbID;
    this.imdbID = imdbID;
    this.fetcher = fetcher;


  }

 
  static fromObject(obj: SeasonType) {
      return new Season(obj.id, obj.link, obj.name, obj.season, obj.poster, obj.released, obj.year ?? "", obj.episodes, obj.tmdbID ?? "", obj.imdbID??"", obj.fetcher, obj.type);
  }

  toObject() {

    return {
      id: this.id,
      link: this.link,
      name: this.name,
      season: this.season,
      poster: this.poster,
      type: this.type,
      released: this.released,
      year: this.year,
      episodes: this.episodes,
      tmdbID: this.tmdbID,
      imdbID: this.imdbID,
      fetcher: this.fetcher
    }

  }


  toString() {
    return JSON.stringify(this.toObject());
  }

  
  addEpisode(episode:Episode){
    this.episodes.push(episode);
  }

  
 

}

export default Season;