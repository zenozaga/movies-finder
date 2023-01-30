import { load } from "cheerio";
import _, {has , get ,set, isNumber } from "lodash";
import Cast from "../models/cast";
import Category from "../models/category";
import Episode from "../models/episode";
import Movie from "../models/movie";
import Requester from "../models/requester";
import Season from "../models/season";
import Serie from "../models/serie";
import DefaultProvider, { HomeType } from "../providers/default-provider";
import { MediaTypes } from "../types";
import { getYear, normalize, parseRuntime } from "../utils/helpers";


function posterToURI(poster:string){
    return `https://image.tmdb.org/t/p/original${poster}`
}


const Genders = {

    list(){
        
        return [{"id":"28","name":"Action","link":"https://www.themoviedb.org/genre/28/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"12","name":"Adventure","link":"https://www.themoviedb.org/genre/12/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"16","name":"Animation","link":"https://www.themoviedb.org/genre/16/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"35","name":"Comedy","link":"https://www.themoviedb.org/genre/35/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"80","name":"Crime","link":"https://www.themoviedb.org/genre/80/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"99","name":"Documentary","link":"https://www.themoviedb.org/genre/99/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"18","name":"Drama","link":"https://www.themoviedb.org/genre/18/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"10751","name":"Family","link":"https://www.themoviedb.org/genre/10751/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"14","name":"Fantasy","link":"https://www.themoviedb.org/genre/14/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"36","name":"History","link":"https://www.themoviedb.org/genre/36/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"27","name":"Horror","link":"https://www.themoviedb.org/genre/27/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"10402","name":"Music","link":"https://www.themoviedb.org/genre/10402/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"9648","name":"Mystery","link":"https://www.themoviedb.org/genre/9648/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"10749","name":"Romance","link":"https://www.themoviedb.org/genre/10749/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"878","name":"Science Fiction","link":"https://www.themoviedb.org/genre/878/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"10770","name":"TV Movie","link":"https://www.themoviedb.org/genre/10770/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"53","name":"Thriller","link":"https://www.themoviedb.org/genre/53/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"10752","name":"War","link":"https://www.themoviedb.org/genre/10752/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"37","name":"Western","link":"https://www.themoviedb.org/genre/37/movie","fetcher":"","type":"category","poster":"","description":""},{"id":"10759","name":"Action & Adventure","link":"https://www.themoviedb.org/genre/10759/tv","fetcher":"","type":"category","poster":"","description":""},{"id":"10762","name":"Kids","link":"https://www.themoviedb.org/genre/10762/tv","fetcher":"","type":"category","poster":"","description":""},{"id":"10763","name":"News","link":"https://www.themoviedb.org/genre/10763/tv","fetcher":"","type":"category","poster":"","description":""},{"id":"10764","name":"Reality","link":"https://www.themoviedb.org/genre/10764/tv","fetcher":"","type":"category","poster":"","description":""},{"id":"10765","name":"Sci-Fi & Fantasy","link":"https://www.themoviedb.org/genre/10765/tv","fetcher":"","type":"category","poster":"","description":""},{"id":"10766","name":"Soap","link":"https://www.themoviedb.org/genre/10766/tv","fetcher":"","type":"category","poster":"","description":""},{"id":"10767","name":"Talk","link":"https://www.themoviedb.org/genre/10767/tv","fetcher":"","type":"category","poster":"","description":""},{"id":"10768","name":"War & Politics","link":"https://www.themoviedb.org/genre/10768/tv","fetcher":"","type":"category","poster":"","description":""}]
        .map((e) => Category.fromObject({
            name: e.name,
            id: `${e.id}`,
            type: "category",
            link: e.link,
            poster: "",
            description: "",
            fetcher: "tmdb"
        }));
    },

    byId(id:string) : Category | undefined{
        return Genders.list().find((e) => e.id == `${id}`);
    }
}


 

class TMDBAPI extends DefaultProvider{
 
 
 
    
    name = "TMDB";
    site = "https://www.themoviedb.org";
    language = "es";
 

    /**
     *  Headers for the requests
     */

    headers(){

        return {
            "Referer": "https://www.themoviedb.org/tv/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
            "Host": "www.themoviedb.org",
            "Origin": "https://www.themoviedb.org"

        }
       
      
    }

 
 

    parseSource(html:string){

        
        var $this = this;
        var doc = load(html);
 
        var data = {
            title:"",
            subtitle:"",
            description:"",
            runtime:"",
            poster:"",
            background:"",
            rating:"",
            release:"",

            genders:[] as Category[],
            cast:[] as Cast[],
            trailers:[] as string[],
        };

        data.title = doc(".title.ott_true h2 a")?.text()?.trim();
        data.subtitle = data.title;
        data.description = doc(".overview")?.text()?.trim();
        data.runtime = doc(".runtime")?.text()?.trim();

        data.poster = doc("#media_scroller .poster img")?.attr("src") ?? "";
        data.background = doc("#media_scroller .backdrop img")?.attr("src") ?? "";

        if(data.poster) data.poster = `${$this.site}${data.poster}`;
        if(data.background) data.background = `${$this.site}${data.background}`;

        data.rating = doc("[data-percent]")?.attr("data-percent") ?? "";
        data.release = doc(".release")?.html()?.trim() ?? "";

        var genres = doc(".genres a")

        genres.each( (index, ele) => {
            
                var a = doc(ele);
                var link = $this.site + `${a.attr("href")}`;
                var name = `${a.html()}`
                var id = link.substring(link.indexOf("/genre/") + "/genre/".length, link.indexOf("/movie"))
                
                if(link && name && id){
                    data.genders.push(Category.fromObject({
                        name: name,
                        id: id,
                        type: "category",
                        link: link,
                        poster: "",
                        description: "",
                        fetcher: this.name
                    }))
                }
        });


        var trailer = doc('[data-site="YouTube"]');
        if(trailer.length && trailer.attr("data-id")){
            data.trailers.push("https://www.youtube.com/watch?v="+trailer.attr("data-id"));
        }


        var cast_scroller = doc("#cast_scroller .card");
        if(cast_scroller && cast_scroller.length){

            cast_scroller.each((index, _card) => {

                const card = doc(_card);
                
                var link_element = card.find("p a[href*=person]");
  
                var link = $this.site + link_element.attr("href");
                var id = link.match(/person\/(\d+)\-/)?.[1];
 
                var name = ((link_element.text() || link_element.html()) + "").trim();
                var img = card.find("img").attr("src");
                var character = card.find(".character").text()?.trim();
                

 
                if(link && name && id){
                    data.cast.push(Cast.fromObject({
                        name: name,
                        character: character,
                        id: id,
                        type: "cast",
                        avatar: `${this.site}${img}`,
                        link: link,
                        fetcher: this.name
                    }));
                }
            })
        }


        return data;
    }



    movies(options?: {} | undefined): Promise<Movie[]> {
        throw new Error("Method not implemented.");
    }

    
    async search(query: string, options?: {} | undefined): Promise<(Movie | Serie | Episode)[]> {
        
        var $this = this;
        var language = get(options, "language", this.language);
  

        var returner = [] as (Movie | Serie | Episode)[];

 
        var response =  await $this.requester.get(`https://www.themoviedb.org/search/trending?language=${language}&query=`+encodeURIComponent(query), $this.headers());
        var body = response.body;

        if(!body) throw new Error("Not found");

        try {
            body = JSON.parse(body);
        } catch (error) {
            
        }

        var result = body.results ?? body;

 
 

        if(result instanceof Array){


            result.forEach(data => {
                if(data instanceof Object){
                    if(data.media_type == "tv"){

                
                        returner.push(Movie.fromObject({
                            id: data.id,
                            link: `https://www.themoviedb.org/tv/${data.id}`,
                            title: data.name ?? data.original_name,
                            subtitle: data.original_name ?? data.name,
                            description: normalize(data.overview),
                            duration: "0h 0m",
                            type: MediaTypes.movie,
                            rating: `${data.vote_average}`,
                            released: data.first_air_date,
                            year: getYear(data.first_air_date ?? data.release_date),
                            poster:  posterToURI(data.poster_path),
                            background: posterToURI(data.backdrop_path),
                            trailers: [],
                            genders: _.get(data,"genre_ids", []).map((e:any) => {


                                return Genders.byId(e) ?? Category.fromObject({
                                    name: "",
                                    id: e,
                                    type: "category",
                                    link: `https://www.themoviedb.org/genre/${e}/tv`,
                                    poster: "",
                                    description: "",
                                    fetcher: this.name
                                })
                            }) ?? [],
                            sources: [],
                            cast: [],
                            fetcher: this.name,
                            tmdbID: data.id
                        }));
    
                    }else{
                            
                    
                            returner.push(Movie.fromObject({
                                id: data.id,
                                link: `https://www.themoviedb.org/movie/${data.id}`,
                                title: normalize(data.title ?? data.original_title),
                                subtitle: normalize(data.original_title ?? data.title),
                                description: normalize(data.overview),
                                duration: "0h 0m",
                                type: MediaTypes.movie,
                                rating: `${data.vote_average}`,
                                released: data.release_date ?? data.first_air_date,
                                year: getYear(data.first_air_date ?? data.release_date),
                                poster: posterToURI(data.poster_path),
                                background: posterToURI(data.backdrop_path),
                                trailers: [],
                                genders: _.get(data,"genre_ids", []).map((e:any) => {
                                    return Genders.byId(e) ?? Category.fromObject({
                                        name: "",
                                        id: e,
                                        type: "category",
                                        link: `https://www.themoviedb.org/genre/${e}/tv`,
                                        poster: "",
                                        description: "",
                                        fetcher: this.name
                                    })
                                }) ?? [],
                                sources: [],
                                cast: [],
                                fetcher: this.name
                            }));
                    }
                }
            });

        }

        return returner

    }


    async movie(id: string, options?:any): Promise<Movie> {
        
        var language = get(options, "language", this.language);
        var response = await this.requester.get(`https://www.themoviedb.org/movie/${id}?language=${language}`, this.headers());

        var html = response.body;
        if(!html) throw new Error("Movie not found");

        if(`${html}`.toLocaleLowerCase().includes("page not found ")){
            throw new Error("Movie not found");
        }

        var data = this.parseSource(html);

        return Movie.fromObject({
            id: id,
            link: `https://www.themoviedb.org/movie/${id}`,
            title: normalize(data.title),
            subtitle: normalize(data.subtitle),
            description: normalize(data.description),
            duration: parseRuntime(data.runtime),
            type: MediaTypes.movie,
            rating: data.rating,
            released: data.release,
            year: getYear(data.release),
            poster: data.poster,
            background: data.background,
            trailers: data.trailers,
            genders: data.genders,
            sources: [],
            cast: data.cast,
            fetcher: this.name,
            tmdbID: id
        });
        
    }

    async series(options?: {} | undefined): Promise<Serie[]> {
        
        var $this = this;
        throw new Error("Method not implemented.");
        
    }

    async serie(id: string): Promise<Serie> {
        
        var language = "es";

        var resposen = await this.requester.get(`https://www.themoviedb.org/tv/${id}?language=${language}`, this.headers());
        var body = resposen.body;
        if(!body) throw new Error("Serie not found");

 
        if(`${body}`.toLocaleLowerCase().includes("page not found ")){
            throw new Error("Serie not found");
        }
 
        var parsed = this.parseSource(body);
        var link = `https://www.themoviedb.org/tv/${id}`;
 

        return Serie.fromObject({
            id: id,
            link: link,
            title: parsed.title,
            subtitle: parsed.subtitle,
            description: parsed.description,
            type: MediaTypes.tv,
            rating: parsed.rating,
            votes: 0,
            released: parsed.release,
            year: getYear(parsed.release),
            poster: parsed.poster,
            background: parsed.background,
            genders: parsed.genders,
            seasons: [],
            cast: parsed.cast,
            trailers: parsed.trailers,
            fetcher: this.name
        });


    }

    async serieFull(id: string, options?:any): Promise<Serie> {

        var serie = await this.serie(id);
        var seasons = await this.seasons(id);


        seasons = await Promise.all(seasons.map(async (season) => {

            try {
                var _season = await this.season(season.id, id);
            
                season.episodes = _season.episodes;
                season.poster = season.poster ?? _season.poster;
                return season;

            } catch (error) {
            
                return season;
            
            }

        }))


        serie.seasons = seasons;
        return serie;

    }

    async seasons(serieID?: string | undefined, options?:any): Promise<Season[]> {
        
        
        var $this = this;
        var language = get(options, "language", this.language);

        var response = await this.requester.get(`https://www.themoviedb.org/tv/${serieID}/seasons?language=${language}`, this.headers());
        var html = response.body;

        if(!html) throw new Error("Serie not found");

        if(html.indexOf("Page not found") > -1){
            throw new Error("Serie not found");
        }

        var doc = load(html);
 
        var seasons:Season[] = [] ;

        var seasons_list = doc(".season_wrapper");

        seasons_list.each((index,_season) => {

            const season = doc(_season);

            var link = $this.site + season.find("a").attr("href");
            var season_id = link.split("season/")[1];
            
            if(season_id.indexOf("?") > -1){
                season_id = season_id.split("?")[0];
            }

            


            var description = season.find(".season_overview")?.text()?.trim();
            var content = `${season.find(".content  h4")?.text()}`.trim();
            var poster = season.find(".poster")?.attr("src");
            var released = content?.match(/\d{4}/g)?.[0] ?? "";
            var release_date = "";

            if( description?.includes("premiere on ") ){

                var date = new Date(description?.split("premiere on ")[1]);
                if(isNumber(date.getTime())){
                    release_date = date.toISOString();
                }
                
            }
                

 
            if(season_id && link) seasons.push(Season.fromObject({
                id: `${Number(season_id) ?? season_id}`,
                link: link,
                name: season_id == "0" ? "Specials" : `Season ${Number(season_id) ?? season_id}`,
                season: Number(season_id) ?? (index + 1),
                poster: poster ?? "",
                released: release_date ?? released,
                year: getYear(release_date ?? released),
                episodes: [],
                fetcher: $this.name
            }))
    
 

         
        })
 

        return seasons;

    }

    async season(id: string, serieID?: string | undefined, options?:any ): Promise<Season> {
        
        var $this = this;
        var language = get(options, "language", this.language);


        var response = await this.requester.get(`${$this.site}/tv/${serieID}/season/${id}?language=${language}`, this.headers());
        var html = response.body;

        if(!html) throw new Error("Season not found");
 
        if(html.indexOf("Page not found") > -1){
            throw new Error("Season not found");
        }

        
        var doc = load(html);

        var link = `${$this.site}/tv/${serieID}/season/${id}`;
        var name = `${doc(".title a")?.text()}`.trim();
        var first_image = doc(".episode_list .episode .backdrop").attr("src") ?? doc(".poster").attr("src");
        var release_date = doc(".episode_list .episode .date span").first().text() ?? "";

 
        
        const _season = Season.fromObject({
            id: id,
            link: link,
            name: name,
            season: Number(id) ?? id,
            poster: first_image ? posterToURI(first_image) : "",
            released: release_date,
            episodes: [],
            fetcher: this.name
        })
 

        var episodes_list = doc(".episode_list .episode");
        episodes_list.each((index,_episode) => {

            const episode = doc(_episode);
            
 
            var link = $this.site + episode.find("a").attr("href");
            var title = `${episode.find(".title a").text()}`.trim();
            var description = episode.find(".overview")?.text()?.trim();
            var image = episode.find(".backdrop").attr("src");
            var episode_number = episode.find(".episode_number")?.text();
            var release_date = doc(".episode_list .episode .date span").first().text() ?? "";
            var duration = doc(".episode_list .episode .date span").last().text() ?? "";


            _season.addEpisode(
                Episode.fromObject({
                    id: link,
                    title: title,
                    description: description,
                    duration: duration,
                    released: release_date,
                    rating: "",
                    votes: 0,
                    episode: Number(episode_number) ?? episode_number,
                    season: Number(id) ?? id,
                    link: link,
                    poster: `${this.site}/${image}` ?? "",
                    servers: [],
                    fetcher: this.name
                })
            )

        })

   
 

        return _season;

        
    }

    

    episodes(seasonID?: string | undefined, serieID?: string | undefined): Promise<Episode[]> {
        throw new Error("Method not implemented.");
    }
    episode(id: string, seasonID?: string | undefined, serieID?: string | undefined): Promise<Episode> {
        throw new Error("Method not implemented.");
    }

    async genders(): Promise<Category[]> {
        
        var response = await this.requester.get(`${this.site}/tv`, this.headers());
        var html = response.body;

        if(!html) throw new Error("no found");

        var returner:Category[] = [];


        var $ = load(html);
        
        $("#with_genres a").each((index,element) => {

            var a = $(element);
            var id = a.attr("href")?.split("with_genres=")[1];
            var name = a.text()?.trim();
            var link = `${this.site}/tv/genre/${id}`;

            if(id && name) returner.push(Category.fromObject({
                id: `${id}`,
                name: name,
                link: link,
                fetcher: this.name,
                type: "category",
                poster: "",
                description: ""
            }));


        });

        return returner;

    }
    cast(): Promise<Cast[]> {
        throw new Error("Method not implemented.");
    }

       
    byType(type?: string | undefined, options?: {} | undefined): Promise<(Movie | Serie | Episode)[]> {
        throw new Error("Method not implemented.");
    }

    getById(id: string, type?: string | undefined): Promise<Movie | Serie | Episode> {
        throw new Error("Method not implemented.");
    }

    top(): Promise<(Movie | Serie | Episode)[]> {
        throw new Error("Method not implemented.");
    }

    topMovies(): Promise<Movie[]> {
        throw new Error("Method not implemented.");
    }
    
    topSeries(): Promise<Serie[]> {
        throw new Error("Method not implemented.");
    }
    
    home(): Promise<HomeType> {
        throw new Error("Method not implemented.");
    }



    /**
     * @type {TMDBAPI}
     */
    static ___instance?:TMDBAPI;


    /** 
     * return a TMDBAPI instance
     * @returns {TMDBAPI}
     */
    static get instance() {
        if (this.___instance === null) {
            this.___instance = new TMDBAPI();
        }
        return this.___instance;
    }

}

export default TMDBAPI; 