import _, { join }  from "lodash";
 
import DefaultProvider, { HomeType, Section } from "../default-provider";
import Movie  from "../../models/movie";
import Serie from "../../models/serie";
import Episode  from "../../models/episode";
import Season from "../../models/season";
import Cast from "../../models/cast";
import Category from "../../models/category";

import {
    getHost,
    getOrigin,
    getTypeByExtension,
    getYear,
    normalize,
    parseLanguage,
    parseRuntime,
    slugify
} from "../../utils/helpers";



import Source from "../../models/source";
import { load } from "cheerio";
import { Response } from "../../models/requester";
import { MediaTypes, SerieType, MovieType, SeasonType, SourceType, EpisodeType } from "../../types";


class Tekilaz extends DefaultProvider{

    name: string = "Tekilaz";
    language: string = "en";
    site: string = "https://cuevana.biz/";

    hash:any = null;


    

    urlInfo(url:string) {

        if(url.includes("/episodio/") || url.includes("/episodes/")){

            var season = url.match(/temporada\/(\d+)/);
            var episode = url.match(/episodio\/(\d+)/);
            var slug  = url.match(/serie\/(.*?)\/temporada/);

            return {
                slug:slug ? slug[1] : null,
                season:season ? season[1] : null,
                episode:episode ? episode[1] : null,
                type: MediaTypes.episode,
            };

        }else{
            
            var slug  = url.match(/(pelicula|serie|movies|series)\/(.*?)$/);

            return {
                slug: slug ? slug[2] : null,
                type: (url.includes("serie") || url.includes("series") || url.includes("tv") ) ? MediaTypes.tv : MediaTypes.movie,
                season: null,
                episode: null,
            };
        }

    }


    async checkMovePermanent(promise?:Promise<Response>) : Promise<string> {

        var $this = this;
        var body;

        if(!promise) return "";
        var body = (await promise).body ?? (await promise).string;
       
        if (typeof body == "string" && body.includes("301 Moved Permanently")) {
            if(!body.includes("The document has moved <a href=")) return body;
            
            var link = body.split('The document has moved <a href="')[1].split('">here</a>')[0];
            var origin = getOrigin(link);
            
            if(!origin || !link) return body;

            $this.setSite(origin);
            var result = await $this.requester?.get(link, $this.headers());
            return result?.body ?? result?.string;

        }

        return body;

    }

    async getHash() {

        if (this.hash) return this.hash;

        var html = await this.checkMovePermanent(this.requester?.get(this.site + "inicio", this.headers()));

        if (html.indexOf('/_ssgManifest.js') > -1) {
            var hash = html.split('/_ssgManifest.js')[0];
            hash = hash.substring(hash.lastIndexOf('/') + 1);
            this.hash = hash;
            return hash;
        }


        return null;

    }


 
    parseCollection(list = []) : Array<MovieType|SerieType|EpisodeType> {

        var $this = this;

        var returner = [];


        for (let index = 0; index < list.length; index++) {

            var ele = $this.parseElement(list[index]);
            returner.push(ele);
        }

        return returner;

    }
 
    parseElement(json:any, relates?:Array<MovieType|SerieType|EpisodeType>) : MovieType|SerieType|EpisodeType {

        var $this = this;



        var slug = _.get(json, "slug.name", _.get(json, "slug", _.get(json, "url.slug", "")));
        var episode = _.get(json, "slug.episode", 0);
        var season = _.get(json, "slug.season", 0);
        var link = join([this.site, slug.includes("movies") ? "pelicula" : "serie", slug],"/").replace("/movies", "").replace("/series",""); //`${this.site}/${_.get(json, "url.slug", "").includes("movies") ? "pelicula" : "serie"}/${slug}`; join(this.site, slug);
        var title = _.get(json, "titles.name", _.get(json, "titles", _.get(json, "title", "")));
        var subtitle = _.get(json, "titles.original.name", "");
        var description = _.get(json, "description.name", _.get(json, "overview", ""));
        var image = _.get(json, "images.poster", _.get(json, "images", _.get(json, "image", "")));
        var background = _.get(json, "images.backdrop", image);
        var TMDbId = _.get(json, "TMDbId", "");
        var runtime = _.get(json, "runtime", 0);

   
        
        var cast:Cast[] = _.get(json, "cast.acting", _.get(json, "cast", [])).map((person:any) => {
 
            var id = _.get(person, "id", `https://www.themoviedb.org/search?query=`+encodeURIComponent(person.name));
            var link = person.id ? `https://www.themoviedb.org/person/${person.id}?language=es` : id;

            if(!person.id && !person.name) return null;

            return Cast.fromObject({
                name: person.name,
                id: id,
                type: "cast",
                avatar: person.image ?? "",
                link: link,
                fetcher: this.name,
                tmdbID: person.id
            });
 
        }).filter((person:any) => person != null);

        var genres:Category[] = _.get(json, "genres", []).map((genre:any) => {

            return Category.fromObject({
                name: genre.name,
                id: genre.slug ?? slugify(genre?.name),
                type: "category",
                link: `${this.site}genero/${genre.slug ?? slugify(genre?.name)}`,
                poster: "",
                description: "",
                fetcher: this.name
            });
            
         
        });

        
        var servers:Source[] = (() => {

            var returner:Source[] = [];
            var videoMap = _.get(json, "videos", {});

            for(const lang in videoMap) {

                var videos = videoMap[lang];
 
                 
                videos.map((video:any) => {
 
                    returner.push(Source.fromObject({
                        name: normalize(`${video.cyberlocker}`),
                        url: video.result,
                        type: getTypeByExtension(video.result),
                        resolution: Source.parseResolution(video.quality),
                        lang: parseLanguage(lang),
                        from: link,
                        fetcher: this.name
                    }))

                })

            }

            return returner;

        })();

        var seasons:SeasonType[] = _.get(json, "seasons", []).map((season:any, index:number) => {

            var n = season.number;
            if(n == undefined || n == null){
                n = index + 1;
            }

            var _season:Season = Season.fromObject({
                id: link,
                link: link,
                name: `${title} - season ${index + 1}`,
                season: n,
                poster: "",
                released: "",
                episodes: [],
                fetcher: this.name
            });
    
            _.get(season, "episodes", []).map((episode:any, episode_number:number) => {

                var n = episode.number;
                if(n == undefined || n == null){
                    n = episode_number + 1;
                }


                var tmdbID = _.get(episode, "TMDbId", "");
                var poster = _.get(episode, "image", "");
                var title = _.get(episode, "title", "");
                var released = _.get(episode, "releaseDate", "");
                var episode_link = `${$this.site}${slug}/temporada/${_.get(episode,"slug.season",0)}/episodio/${_.get(episode,"slug.episode",0)}`.replace("/series","/serie");

                _season.addEpisode(Episode.fromObject({
                    id: episode_link,
                    title: title ?? `${title} ${index}x${n}`,
                    description: "",
                    duration: "",
                    released: released,
                    rating: "",
                    votes: 0,
                    episode: n,
                    season: index,
                    link: episode_link,
                    poster: poster ?? "",
                    servers: [],
                    fetcher: "",
                    tmdbID: tmdbID,
                    relates: relates ?? []
                }))

            });

            return _season;

        });

        
 
        var rating = _.get(json, "rate.average", 0);
        var votes = _.get(json, "rate.votes", 0);
        var released = _.get(json, "releaseDate", "");
        var duration = _.get(json, "duration", parseRuntime(runtime));


  




 
        if(_.has(json, "nextEpisode")) {


  
            var link = `${this.site}episodio/${slug}-temporada-${season}-episodio-${episode}`;

 
            return Episode.fromObject({
                id: link,
                title: normalize(title ?? `${title} ${season}x${episode}`),
                description: normalize(description),
                duration: duration,
                released: released,
                rating: rating,
                votes: votes,
                episode: episode,
                season: season,
                link: link,
                poster: image,
                servers: servers,
                fetcher: this.name,
                tmdbID:TMDbId,
                relates: relates ?? []
            });

        }
        else if (link.includes("/serie/")) {

       

            return Serie.fromObject({
                id: link,
                link: link,
                title: normalize(title),
                subtitle: normalize(subtitle),
                description: normalize(description),
                rating: rating,
                votes: votes,
                released: released,
                year: getYear(released),
                poster: image?.replace(/(\-[0-9]{3}x([0-9]{3}))/g, ""),
                background: background,
                genders: genres,
                seasons: seasons,
                cast: cast,
                trailers: [],
                fetcher: this.name,
                type: MediaTypes.tv,
                tmdbID: TMDbId,
                relates: relates ?? []
            });


        } else{
 

            return Movie.fromObject({
                id: link,
                title: normalize(title),
                subtitle: normalize(title),
                description: normalize(description),
                duration: duration,
                type: MediaTypes.movie,
                rating: rating,
                released: released,
                year: getYear(released),
                poster: image?.replace(/(\-[0-9]{3}x([0-9]{3}))/g, ""),
                background: background,
                trailers: [],
                genders: genres,
                sources: servers,
                cast: cast,
                fetcher: this.name,
                tmdbID: TMDbId,
                link: link,
                relates: relates ?? []
            });
        }

    }





    /**
     * 
     * @param {String} url 
     */
    fixUrl(url:string) {

        if (url.startsWith("//")) {
            url = "https:" + url;
        }

        return url;
    }



  
    /**
     * Headers for the request
     * @returns {{}}
     */

    headers(extra = {}){
        return Object.assign({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
            "Origin": getOrigin(this.site) ?? this.site,
          //  "Host": getHost(this.site),
            "Referer": this.site
        }, extra);
    }


    /**
     * Verify if the url or id is from this provider
     * @param urlOrID 
     * @returns {boolean}
     */

    match(urlOrID: string): boolean {
        return urlOrID.includes("tekilaz"); 
    }
    
    
    async home(): Promise<HomeType> {

        var hash = await this.getHash();
        var url = `${this.site}/_next/data/${hash}/es.json`;

        var result = await this.requester.get(url, this.headers());
        var body = result.body;

        if(!body) throw new Error("No response");

        try {
            body = JSON.parse(result.body);
        } catch (error) {
            
        }


        var movies = this.parseCollection(_.get(body,"pageProps.tabLastMovies",[])) as MovieType[];
        var series = this.parseCollection(_.get(body,"pageProps.series",[])) as SerieType[];
        var episodes = this.parseCollection(_.get(body,"pageProps.episodes",[])) as EpisodeType[];

        var tabTopMovies = this.parseCollection(_.get(body,"pageProps.tabTopMovies",[])) as MovieType[];
        var tabTopSeries:SerieType[] = series


        return {
           episodes,
           movies,
           series,
           topMovies: tabTopMovies,
           topSeries: tabTopSeries
        } as HomeType
    
    }

 
    async byType(type: string, options?: {} | undefined): Promise<(MovieType | SerieType | EpisodeType)[]> {
                
        var $this = this;
        var isMovie =  type == MediaTypes.movie;


        var page:number = Number(_.get(options,"page",1));
        var hash = await this.getHash();

        var url = `${$this.site}/_next/data/${hash}/es/${isMovie?"peliculas":'series'}/page/${page}.json`;


        var repsonse = await this.requester?.get(url, this.headers());
        if(!repsonse) return [];

        var body = repsonse.body;

        try {
            body = JSON.parse(body);
        } catch (error) {
        
        }

        return this.parseCollection(_.get(body,"pageProps.movies",[]));
        
    }
 
    async search(query: string, options?: {} | undefined): Promise<(MovieType|SerieType|EpisodeType)[]> {
    

        var hash = await this.getHash();
        let url = `${this.site}/_next/data/${hash}/es/search.json?q=${query}`;

        var response = await this.requester?.get(url, this.headers());
        if(!response) return [];

        


        try {

            var data = response.body;
            
            try {
                data = JSON.parse(data);
            } catch (error) {
                
            }

            var items = this.parseCollection(_.get(data,"pageProps.movies",[]));
  

            if (items && items.length) {
                return items;
            }

        } catch (error) {
            console.log(`Error: ${error}`);
        }




        return [];
        

    }

    
    async getById(idorLink: string, type?: string | undefined): Promise<MovieType|SerieType|EpisodeType> {
        
        
        var $this = this;



        if (idorLink.includes('http')) {

            var hash = await this.getHash();
            var info = this.urlInfo(idorLink);

            var _type   = info.type;

            var url = "";

            if(_type == MediaTypes.movie){
                url = `${$this.site}/_next/data/${hash}/es/pelicula/${info.slug}.json`;
            }else if(info.type == MediaTypes.tv){
                url = `${$this.site}/_next/data/${hash}/es/serie/${info.slug}.json?serie=${info.slug}`;
            }else{
                url = `${$this.site}/_next/data/${hash}/es/serie/${info.slug}/temporada/${info.season}/episodio/${info.episode}.json`;
            }
 

            var response = await this.requester?.get(url, this.headers({
                "Referer": this.site
            }));

            if(!response) throw new Error("No found");

            var data = response.body;
            
            try {
                data = JSON.parse(data);
            } catch (error) {
                
            }
            
            var media = _.get(data,"pageProps.thisMovie", _.get(data,"pageProps.thisSerie", _.get(data,"pageProps.episode", null)));
            if(!media) throw new Error("No found");

            var relates = this.parseCollection(_.get(data,"pageProps.relatedMovies",  _.get(data,"pageProps.relatedSeries", []) ));
            var parsed = this.parseElement(media, relates);

            return parsed;

        } else {

            throw new Error("Not implemented");
        }

        
    }

    
    async top(): Promise<(MovieType | SerieType)[]> {
        var home = await this.home();
        return [...home.movies, ...home.series];
    }

    topMovies(): Promise<MovieType[]> {
        return this.top().then(items => {
            return items.filter(item => item instanceof Movie) as MovieType[];
        });
    }

    topSeries(): Promise<SerieType[]> {
        return this.top().then(items => {
            return items.filter(item => item instanceof Serie) as SerieType[];
        });
    }
 


    movies(options?: {} | undefined): Promise<MovieType[]> {
        return this.byType(MediaTypes.movie.toString(),options) as Promise<MovieType[]>;    
    }

    movie(id: string): Promise<Movie> {
        return this.getById(id, MediaTypes.movie) as Promise<Movie>;
    }
    
    series(options?: {} | undefined): Promise<SerieType[]> {
        return this.byType(MediaTypes.tv.toString(),options) as Promise<SerieType[]>;    
    }

    serie(id: string): Promise<Serie> {
        return this.getById(id, MediaTypes.tv) as Promise<Serie>;
    }
    
    seasons(serieID?: string | undefined): Promise<SeasonType[]> {

        if(!serieID) throw new Error("serieID is required");
        return (this.getById(serieID) as Promise<Serie>).then(serie => {
            return serie.seasons
        });

    }
    season(id: string, serieID?: string | undefined): Promise<SeasonType> {
        if(!serieID) throw new Error("serieID is required");
        return this.seasons(serieID).then(seasons => {
            return seasons.find(season => `${season.season}` == `${id}`) as Season;
        })
    }

    episodes(seasonID?: string | undefined, serieID?: string | undefined): Promise<EpisodeType[]> {
        if(!serieID) throw new Error("serieID is required");
        if(!seasonID) throw new Error("seasonID is required");
        return this.season(seasonID,serieID).then(season => {
            return season.episodes
        });
    }
    
    episode(id: string, seasonID?: string | undefined, serieID?: string | undefined): Promise<EpisodeType> {
        
        if(!serieID) throw new Error("serieID is required");
        if(!seasonID) throw new Error("seasonID is required");
        return this.episodes(seasonID,serieID).then(episodes => {
            return episodes.find(episode => `${episode.episode}` == `${id}`) as Episode;
        })
    }


    async genders(): Promise<Category[]> {
        

        var response = await this.requester.get(this.site);
        var body = response.body;
        if(!body) throw new Error("No body");

        var $ = load(body);
        var returner = [] as Category[];

        var list = $('a[href*=genero]');
        if(list.length > 0){

            list.each((index,element) => {

                var ele = $(element);
                var link = ele.attr("href") ?? "";
                var name = ele.text() ?? "";
                var id = link.split("/").pop() ?? "";

                if(id && name && link) returner.push(Category.fromObject({
                    name: name,
                    id: id,
                    type: "category",
                    link: `${this.site}/${link}`,
                    poster: "",
                    description: "",
                    fetcher: this.name
                }))

            })

        }

        return returner;

    }

    cast(): Promise<Cast[]> {
        throw new Error("Method not implemented.");
    }
    

    async sections(): Promise<Section[]> {

        var hash = await this.getHash();
        var url = `${this.site}/_next/data/${hash}/es.json`;

        var result = await this.requester.get(url, this.headers());
        var body = result.body;

        if(!body) throw new Error("No response");

        try {
            body = JSON.parse(result.body);
        } catch (error) {
            
        }


        var movies = this.parseCollection(_.get(body,"pageProps.tabLastMovies",[])) as MovieType[];
        var tabTopMovies = this.parseCollection(_.get(body,"pageProps.tabTopMovies",[])) as MovieType[];
        var topMoviesDay = this.parseCollection(_.get(body,"pageProps.topMoviesDay",[])) as MovieType[];
        var topMoviesWeek = this.parseCollection(_.get(body,"pageProps.topMoviesWeek",[])) as MovieType[];
        var tabLastReleasedMovies = this.parseCollection(_.get(body,"pageProps.tabLastReleasedMovies",[])) as MovieType[];

        var series = this.parseCollection(_.get(body,"pageProps.series",[])) as SerieType[];
        var lastSeries = await this.series({limit: 10});

        var episodes = this.parseCollection(_.get(body,"pageProps.episodes",[])) as EpisodeType[];
        var tabTopSeries:SerieType[] = series



        var returner = [] as Section[];


        if(tabTopMovies?.length || topMoviesDay?.length ) returner.push({
            title: "Top de Hoy",
            items: [...(tabTopSeries ?? []), ...(tabTopMovies ?? [])] as any,
            type: "big",
        })

        if(episodes && episodes.length) returner.push({
            title: "Ultimos episodios",
            items: episodes,
            type: "thumb",
        })
 
        
        if(tabLastReleasedMovies && tabLastReleasedMovies.length) returner.push({
            title: "Estrenos",
            items: tabLastReleasedMovies,
            type: "poster",
        })

        
        if(topMoviesDay && topMoviesDay.length) returner.push({
            title: "Tendencias",
            items: tabTopMovies,
            type: "poster",
        })

        
        if(movies && movies.length) returner.push({
            title: "Peliculas",
            items: movies,
            type: "poster",
        })

        if(series && series.length) returner.push({
            title: "Series",
            items: series,
            type: "poster",
        })


        if(tabTopSeries && tabTopSeries.length) returner.push({
            title: "Ultimas series",
            items: lastSeries,
            type: "poster",
        })

        
        if(topMoviesWeek && topMoviesWeek.length) returner.push({
            title: "Top peliculas de la semana",
            items: topMoviesWeek,
            type: "poster",
        })

  
        
        
        return returner;
    }


}


export default Tekilaz