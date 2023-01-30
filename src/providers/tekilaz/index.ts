import _, { join }  from "lodash";
 
import DefaultProvider, { HomeType } from "../default-provider";
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
    site: string = "https://tekilaz.co/";

    hash:any = null;


    

    urlInfo(url:string) {

        if(url.includes("/episodio/") || url.includes("/episodes/")){

            var season = url.match(/temporada-(\d+)/);
            var episode = url.match(/episodio-(\d+)/);
            var slug  = url.match(/episodio\/(.*?)\-temporada/);

            return {
                slug:slug ? slug[1] : null,
                season:season ? season[1] : null,
                episode:episode ? episode[1] : null,
                type:MediaTypes.episode,
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

        var html = await this.checkMovePermanent(this.requester?.get(this.site, this.headers()));

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
 
    parseElement(json:any) : MovieType|SerieType|EpisodeType {

        var $this = this;

        var slug = _.get(json, "slug.name", _.get(json, "slug", ""));
        var episode = _.get(json, "slug.episode", 0);
        var season = _.get(json, "slug.season", 0);
        var link = join([this.site, _.get(json, "url.slug", "").includes("movies") ? "pelicula" : "serie", slug],"/"); //`${this.site}/${_.get(json, "url.slug", "").includes("movies") ? "pelicula" : "serie"}/${slug}`; join(this.site, slug);
        var title = _.get(json, "titles.name", _.get(json, "titles", _.get(json, "title", "")));
        var subtitle = _.get(json, "titles.original.name", "");
        var description = _.get(json, "description.name", _.get(json, "overview", ""));
        var image = _.get(json, "images.poster", _.get(json, "images", _.get(json, "image", "")));
        var background = _.get(json, "images.backdrop", image);
        var TMDbId = _.get(json, "TMDbId", "");
        var runtime = _.get(json, "runtime", 0);
        
        var cast:Cast[] = _.get(json, "cast.acting", _.get(json, "cast", [])).map((person:any) => {

            return Cast.fromObject({
                name: person.name,
                id: person.id,
                type: "cast",
                avatar: person.image ?? "",
                link: `https://www.themoviedb.org/person/${person.id}?language=es`,
                fetcher: this.name,
                tmdbID: person.id
            });
 
        });

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

            var _season:Season = Season.fromObject({
                id: link,
                link: link,
                name: `${title} - season ${index}`,
                season: index,
                poster: "",
                released: "",
                episodes: [],
                fetcher: this.name
            });
    
            _.get(season, "episodes", []).map((episode:any, episode_number:number) => {

                var tmdbID = _.get(episode, "TMDbId", "");
                var poster = _.get(episode, "image", "");
                var title = _.get(episode, "title", "");
                var released = _.get(episode, "releaseDate", "");
                var episode_link = `${$this.site}episodio/${slug}-temporada-${_.get(episode,"slug.season",0)}-episodio-${_.get(episode,"slug.episode",0)}`;

                _season.addEpisode(Episode.fromObject({
                    id: episode_link,
                    title: title ?? `${title} ${index}x${episode_number}`,
                    description: "",
                    duration: "",
                    released: released,
                    rating: "",
                    votes: 0,
                    episode: episode_number,
                    season: index,
                    link: episode_link,
                    poster: poster ?? "",
                    servers: [],
                    fetcher: "",
                    tmdbID: tmdbID
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
                tmdbID:TMDbId
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
                tmdbID: TMDbId
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




    headers(extra:any = {}) {

        return {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
            "Origin": this.site,
            "Referer": this.site,
            ...extra
        };
     
        
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

    async byType(type?: string | undefined, options?: {} | undefined): Promise<(MovieType | SerieType | EpisodeType)[]> {
                
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
                url = `${$this.site}/_next/data/${hash}/es/episodio/${info.slug}-temporada-${info.season}-episodio-${info.episode}.json`;
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

            var parsed = this.parseElement(media);
            var relates = this.parseCollection(_.get(data,"pageProps.relatedMovies",  _.get(data,"pageProps.relatedSeries", []) ));
            parsed.relates = relates.filter(item => item instanceof Movie || item instanceof Serie) as Array<Movie|Serie>

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
    


}


export default Tekilaz



    // /**
    //  * 
    //  * @param {String} html 
    //  * @returns {Array<Movie|Serie>}
    //  */
    // parseCollectionHTML(html:string) {

    //     var $ = load(html)
    //     var list = $(".MovieList > li > .post, .MovieList > li > .TPost");
    //     var returner = [];


    //     for (let index = 0; index < list.length; index++) {
    //         const element = $(list[index]);

    //         var link:string = element.find("a").attr("href") ?? "";
    //         var image = element.find("img[data-src]")?.attr("data-src");
    //         if (!image) image = element.find(".wp-post-image")?.attr("src");



    //         if (link.includes("/serie/")) {

 
    //             var fetcher = this.name;
    //             var link = link;
    //             var title = element.find(".Title")?.text()?.trim();
    //             var poster = image?.replace(/(\-[0-9]{3}x([0-9]{3}))/g, "") ?? "";
    //             var background = poster;

    //             var rating = element.find(".Vote")?.text()?.trim();
    //             var release = element.find(".Date,.TPost .meta")?.text()?.trim();
    //             var description = element.find(".Description")?.text()?.trim();

    //             returner.push(Serie.fromObject({
    //                 id: link,
    //                 link: link,
    //                 title: normalize(title),
    //                 description: normalize(description),
    //                 poster: poster,
    //                 background: background,
    //                 rating: rating,
    //                 released: release,
    //                 fetcher: fetcher,
    //                 votes: 0,
    //                 seasons: [],
    //                 cast: [],
    //                 genders: [],
    //                 subtitle: "",
    //                 type: "tv",
    //                 year: release,
    //                 trailers: []
    //             }));


    //         } else {

 
    //             var fetcher = this.name;
    //             var link = link;
    //             var title = element.find(".Title")?.text()?.trim();
    //             var poster = image?.replace(/(\-[0-9]{3}x([0-9]{3}))/g, "") ?? "";
    //             var background = poster;

    //             var rating = element.find(".Vote")?.text()?.trim();
    //             var duration = parseDuration(element.find(".Time")?.text()?.trim());
    //             var release = element.find(".Date")?.text()?.trim();
    //             var description = element.find(".Description")?.text()?.trim();

    //             returner.push(Movie.fromObject({
    //                 id: link,
    //                 title: normalize(title),
    //                 subtitle: normalize(title),
    //                 description: normalize(description),
    //                 duration: duration,
    //                 type: "movie",
    //                 rating: rating,
    //                 released: release,
    //                 poster: poster,
    //                 background: background,
    //                 trailers: [],
    //                 genders: [],
    //                 sources: [],
    //                 cast: [],
    //                 fetcher: this.name,
    //                 year: release,
    //             }));
    //         }


    //     }

  
    //     return returner;

    // }


    // parseMovieHTML(html:string, type = "") {

    //     var $this = this;

    //     var $ = load(html);

    //     var id = $("#top-single")?.attr("data-id");
    //     var poster = $(".TPost .Image img[data-src]")?.attr('data-src');
    //     var background = $(".backdrop > .Image img[data-src]")?.attr("data-src");
    //     var title = $(".TPost .Title")?.text()?.trim();
    //     var subtitle = $(".TPost .SubTitle")?.text()?.trim();
    //     var description = $(".TPost .Description")?.text()?.trim();
    //     var release = $(".TPost .meta")?.text()?.trim();
    //     var rating = $("#TPVotes")?.attr("data-percent")?.trim();

    //     var canonical = $("link[rel='canonical']")?.attr("href") ?? "";
    //     var _season_episode = canonical?.match(/\-([0-9].*)x([0-9].*)/);

    //     type = canonical.includes("episodio") ? "episode" : type;

    //     var cast:Cast[] = [];
    //     var trailers:string[] = [];
    //     var genres:Category[] = [];
    //     var seasons:SeasonType[] = [];
    //     var servers:Source[] = [];


    //     if (poster?.includes('tmdb.org')) {
    //         poster = poster.replace(/\/p\/(.*?)\//g, "/p/original/");
    //     }

    //     if (background?.includes('tmdb.org')) {
    //         background = background.replace(/\/p\/(.*?)\//g, "/p/original/");
    //     }


    //     if ($("#OptY iframe")) {
    //         trailers.push(`${$("#OptY iframe")?.attr("data-src")}`);
    //     }

    //     $("[data-tplayernv]").each((index,ele) => {

    //         var element = $(ele);

    //         var id = element.attr("data-tplayernv");
    //         var iframe = $(`#${id} iframe`)
    //         var name = element.find(".cdtr > span")?.html()?.trim();
    //         var url = iframe.attr("data-src");

    //         if (iframe) {
         
             
    //             servers.push(Source.fromObject({
    //                 name: name ?? "",
    //                 url: url ?? "",
    //                 type: getTypeByExtension(url ?? ""),
    //                 resolution: SourceResolution.HD,
    //                 lang: parseLanguage(name ?? ""),
    //                 from: canonical,
    //                 fetcher: this.name
    //             }))
                
    //         }

    //     });

    //     $(".InfoList a[href*='genero']").each((index,ele) => {

    //         var element = $(ele);
    //         var id = element.attr("href")?.split("genero/")[1] ?? ""
    //         var link = `${this.site}/genero/${id}`;
    //         var name = element.text()?.trim() ?? "";

            
    //         genres.push(Category.fromObject({
    //             id: id,
    //             name: name,
    //             link: link,
    //             type: "category",
    //             poster: "",
    //             description: "",
    //             fetcher: this.name
    //         }));


    //     });

    //     $(".loadactor a").each((index,ele) => {

    //         var element = $(ele);
    //         var name = element.text()?.trim() ?? "";
    //         var link = element.attr("href")?.replace("cast_tv", "actor") ?? "";
    //         var id = link.split("actor/")[1] ?? "";

 
    //         cast.push(Cast.fromObject({
    //             name: name,
    //             id: id,
    //             type: "cast",
    //             avatar: "",
    //             link: link,
    //             fetcher: this.name
    //         }));

    //     });

    //     $("#select-season option").each((seasonIndex,ele) => {

    //         var element = $(ele);
    //         var id = `${element.val()}`?.trim() ?? "";
    //         var name = element.text()?.trim();

    //         var season = Season.fromObject({
    //             id: id,
    //             link: canonical,
    //             name: name ?? "",
    //             season: seasonIndex,
    //             poster: "",
    //             released: "",
    //             episodes: [],
    //             fetcher: this.name
    //         })

   

    //         $(`#season-${id}.all-episodes li`).each((index,eps) => {


    //             var episode = $(eps);

    //             var link = episode.find("a")?.attr("href") ?? "";
    //             var id = link.match(/post\-([0-9]*)\s/)?.[1];
 

    //             var image = episode.find("img[data-src]")?.attr("data-src");
    //             var title = episode.find(".Title")?.text()?.trim();

    //             if (image.includes('tmdb.org')) {
    //                 image = image.replace(/\/p\/(.*?)\//g, "/p/original/");
    //             }

    //             var episode_ = new Episode();
    //             episode_.id = id;
    //             episode_.episode = index + 1;
    //             episode_.season = seasonIndex;

    //             episode_.title = title;
    //             episode_.link = $this.fixUrl(link);
    //             episode_.poster = $this.fixUrl(image);



    //             season.addEpisode(Episode.fromObject({

    //             }));

    //         });


    //         seasons.push(season);

    //     });


    //     if (type == "tv") {

    //         var serie = new Serie();
    //         serie.id = id;
    //         serie.fetcher = this.name;
    //         serie.poster = poster;
    //         serie.background = background;
    //         serie.title = title;
    //         serie.subtitle = subtitle;
    //         serie.description = description;
    //         serie.cast = cast;
    //         serie.genders = genres;
    //         serie.trailers = trailers;
    //         serie.servers = [];
    //         serie.seasons = seasons;
    //         serie.release = release;
    //         serie.rating = rating;

    //         return serie;

    //     } else if (type == "episode") {

    //         var episode = new Episode();

    //         episode.id = id;

    //         episode.season = _season_episode ? (Number(_season_episode[1])) : '';
    //         episode.episode = _season_episode ? (Number(_season_episode[2])) : '';

    //         episode.title = $(".Title")?.text()?.trim() ?? `${title} ${episode.season}x${episode.episode}`;


    //         episode.link = canonical;
    //         episode.poster = poster;
    //         episode.servers = servers;

    //         episode.fetcher = this.name;

    //         return episode;

    //     } else {

    //         var movie = new Movie();

    //         movie.fetcher = this.name;
    //         movie.id = id;
    //         movie.poster = poster;
    //         movie.background = background;
    //         movie.title = title;
    //         movie.subtitle = subtitle;
    //         movie.description = description;
    //         movie.cast = cast;
    //         movie.genders = genres;
    //         movie.trailers = trailers;
    //         movie.servers = servers;
    //         movie.release = release;
    //         movie.rating = rating;
    //         movie.type = canonical.includes("episodio") ? "episode" : "movie";

    //         return movie;

    //     }


    // }

// class Tekilaz extends DefaultProvider {

//     static name = "Tekilaz";
//     static site = "https://tekilaz.co/";
//     static language = "es";


//     hash = null;

//     match(urlOrID) {
//         return urlOrID.includes("tekilaz"); 
//     }


//     /**
//      * Headers for the request
//      * @returns {{}}
//      */

//     headers(extra = {}) {
//         return Object.assign({
//             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
//             "Origin": getOrigin(this.site),
//             //  "Host": getHost(this.site),
//             "Referer": this.site
//         }, extra);
//     }

//     urlInfo(url){

//         if(url.includes("/episodio/") || url.includes("/episodes/")){

//             var season = url.match(/temporada-(\d+)/);
//             var episode = url.match(/episodio-(\d+)/);
//             var slug  = url.match(/episodio\/(.*?)\-temporada/);

//             return {
//                 slug:slug ? slug[1] : null,
//                 season:season ? season[1] : null,
//                 episode:episode ? episode[1] : null,
//                 type:"episode",
//             };

//         }else{
            
//             var slug  = url.match(/(pelicula|serie|movies|series)\/(.*?)$/);

//             return {
//                 slug: slug ? slug[2] : null,
//                 type: (url.includes("serie") || url.includes("series")) ? "serie" : "movie",
//             };
//         }

//     }

//     async getHash() {

//         if (this.hash) return this.hash;

//         var response = await this.checkMovePermanent(this.requester.get(this.site, this.headers()));
//         var html = `${response.body ?? response.data}`;
//         if (html.indexOf('/_ssgManifest.js') > -1) {
//             var hash = html.split('/_ssgManifest.js')[0];
//             hash = hash.substring(hash.lastIndexOf('/') + 1);
//             this.hash = hash;
//             return hash;
//         }


//         return null;

//     }


//     async checkMovePermanent(promise) {

//         var $this = this;
//         var body;

//         if (promise.then) body = (await promise).body;
//         if (typeof promise == "string") body = promise;
//         if (typeof promise == "object") body = promise.body ?? promise.data;

//         if (typeof body == "string" && body.includes("301 Moved Permanently")) {
//             if (body.indexOf('The documen    t has moved <a href="') > -1) {
//                 var link = body.split('The document has moved <a href="')[1].split('">here</a>')[0];
//                 $this.site = getOrigin(link);
//                 return $this.requester.get(link, $this.headers(), false);
//             }
//         }

//         return await promise;

//     }


//     async search(query, options = {}) {

//         console.log(`QUERY: ${query}`)


//         var hash = await this.getHash();
//         let url = `${this.site}/_next/data/${hash}/es/search.json?q=${query}`;

//         var response = await this.requester.get(url, this.headers());


//         try {

//             var data = response.body ?? response.data;
            
//             try {
//                 data = JSON.parse(data);
//             } catch (error) {
                
//             }

//             response = this.parseCollection(_.get(data,"pageProps.movies",[]));

//             if (response && response.length) {
//                 return response;
//             }

//         } catch (error) {
//             console.log(`Error: ${error}`);
//         }




//         return [];

//     }

//     async getById(idorLink, type = "") {


//         var $this = this;



//         if (idorLink.includes('http')) {

//             var hash = await this.getHash();
//             var info = this.urlInfo(idorLink);

 
//             var _type   = `${info.type ?? type}`
//             .replace("movie", "pelicula")
//             .replace("serie", "series")
//             .replace("movies", "pelicula")
//             .replace("series", "serie")
//             .replace("episode", "episodio");

//             var url = `${$this.site}_next/data/${hash}/es/${_type}/${info.slug}.json`;
//             if(info.type == "episode"){
//                 url = `${$this.site}_next/data/${hash}/es/episodio/${info.slug}-temporada-${info.season}-episodio-${info.episode}.json`;
//             }

//             var response = await this.requester.get(url, this.headers({
//                 "Referer": this.site
//             }));


//             var data = response.body;
            
//             try {
//                 data = JSON.parse(data);
//             } catch (error) {
                
//             }
            
//             var media = _.get(data,"pageProps.thisMovie", _.get(data,"pageProps.thisSerie", _.get(data,"pageProps.episode", null)));
//             if(!media) return null;

//             var parsed = this.parseElement(media, info.type ?? type);
//             var relates = this.parseCollection(_.get(data,"pageProps.relatedMovies",  _.get(data,"pageProps.relatedSeries", []) ));
 
//             parsed.relates = relates;
            
//             return parsed;

//         } else {

//         }

//     }


//     async getEpisode(irOrLink, episode) {


//     }

//     async genders(gender, options = {}) {}


//     /**
//      * 
//      * @param {Stirng} type 
//      * @param {{}} options 
//      * @returns Promise<Array<Movie|Serie>>
//      * 
//      * Get Media by types
//      * 
//      */

//     async byType(type, options = {}) {

//         var $this = this;
//         var isMovie = !(type == "tv" || type == "serie" || type == "series");


//         var page = options.page ?? 1;
//         var hash = await this.getHash();

//         var url = `${$this.site}/_next/data/${hash}/es/${isMovie?"peliculas":'series'}/page/${page}.json`;


//         var repsonse = await this.requester.get(url, this.headers());
//         var body = repsonse.body ?? repsonse.data;

//         try {
//             body = JSON.parse(body);
//         } catch (error) {
        
//         }

//         return this.parseCollection(_.get(body,"pageProps.movies",[]));



//     }


//     /**
//      * 
//      * @param {{page:number}} options 
//      * @returns {Promise<Array<Movie>>}
//      */
//     async movies(options = {}) {

//         var $this = this;
 

//         var page = options.page ?? 1;
//         var hash = await this.getHash();
//         var url = `${$this.site}/_next/data/${hash}/es/series/page/${page}.json?page=${page}`;


//         var repsonse = await this.requester.get(url, this.headers());
//         var body = repsonse.body ?? repsonse.data;

//         try {
//             body = JSON.parse(body);
//         } catch (error) {
        
//         }

//         return this.parseCollection(_.get(body,"pageProps.movies",[]));

//     }




//     /**
//      * 
//      * @param {String} html 
//      * @returns {Array<Movie|Serie>}
//      */
//     parseCollection(list = []) {

//         var $this = this;

//         var returner = [];


//         for (let index = 0; index < list.length; index++) {

//             var ele = $this.parseElement(list[index]);
//             returner.push(ele);
//         }

//         return returner;

//     }


//     /**
//      * 
//      * @param {String} html 
//      * @returns {Movie|Serie}
//      */
//     parseElement(json) {

//         var $this = this;


//         var slug = _.get(json, "slug.name", _.get(json, "slug", ""));
//         var episode = _.get(json, "slug.episode", 0);
//         var season = _.get(json, "slug.season", 0);

//         var link = `${this.site}${_.get(json, "url.slug", "").includes("movies") ? "pelicula" : "serie"}/${slug}`;


//         var title = _.get(json, "titles.name", _.get(json, "titles", _.get(json, "title", "")));
//         var subtitle = _.get(json, "titles.original.name", "");
//         var description = _.get(json, "description.name", _.get(json, "overview", ""));

//         var image = _.get(json, "images.poster", _.get(json, "images", _.get(json, "image", "")));
//         var background = _.get(json, "images.backdrop", image);

//         var TMDbId = _.get(json, "TMDbId", "");
//         var cast = _.get(json, "cast.acting", _.get(json, "cast", [])).map(person => {
//             return {
//                 id: person.id,
//                 name: person.name,
//                 link: `https://www.themoviedb.org/person/${person.id}?language=es`,
//                 image: person.image ?? ""
//             };
//         });

//         var genres = _.get(json, "genres", []).map(genre => {

            
//             return {
//                 id: genre.id,
//                 name: genre.name,
//                 slug: genre.slug ?? slugify(genre?.name),
//                 link: `${this.site}genero/${genre.slug ?? slugify(genre?.name)}`
//             };

//         });

//         var rating = _.get(json, "rate.average", 0);
//         var released = _.get(json, "releaseDate", "");

//         var duration = _.get(json, "duration", "");


//         var seasons = _.get(json, "seasons", []).map(season => {

//             var s = new Season();
//             s.season = season.number;
//             s.fetcher = $this.name;
//             s.poster = "";
//             s.episodes = _.get(season, "episodes", []).map(episode => {

//                 var e = new Episode();

//                 e.episode = episode.number ?? 0;
//                 e.tmdbID = _.get(episode, "TMDbId", "");
//                 e.poster = _.get(episode, "image", "");
//                 e.title = _.get(episode, "title", "");
//                 e.released = _.get(episode, "releaseDate", "");
//                 e.link = `${$this.site}episodio/${slug}-temporada-${_.get(episode,"slug.season",0)}-episodio-${_.get(episode,"slug.episode",0)}`;

//                 return e;

//             });

//             return s;

//         });

        

//         var servers = (() => {

//             var returner = [];
//             var videoMap = _.get(json, "videos", {});

//             for(const lang in videoMap) {

//                 var videos = videoMap[lang];
 
//                 returner = returner.concat(videos.map(video => {

//                     var s = new Source(
//                         `${lang} - ${video.cyberlocker}`,
//                         video.result,
//                         video.quality,
//                         "mp4",
//                         $this.headers(),
//                         $this.name
//                     );
               


//                     return s;

//                 }));

//             }

//             return returner;

//         })();
 



 
//         if(_.has(json, "nextEpisode")) {


//             var _eps = new Episode();
//             _eps.episode = episode;
//             _eps.season = season;
//             _eps.tmdbID = TMDbId;
//             _eps.title = title;
//             _eps.servers = servers;
//             _eps.poster = image;
//             _eps.released = "";
//             _eps.link = `${this.site}episodio/${slug}-temporada-${season}-episodio-${episode}`;

//             _eps.fetcher = $this.name;

//             return _eps;

//         }
//         else if (link.includes("/serie/")) {

//             var serie = new Serie();

//             serie.fetcher = this.name;

//             serie.tmdbID = TMDbId;

//             serie.title = title;
//             serie.subtitle = subtitle;
//             serie.description = description;
//             serie.link = link;

//             serie.genders = genres;
//             serie.cast = cast;

//             serie.poster = image?.replace(/(\-[0-9]{3}x([0-9]{3}))/g, "");
//             serie.background = background;

//             serie.rating = rating;
//             serie.release = released;

//             serie.seasons = seasons;

//             return serie;


//         } else{

//             var movie = new Movie();

//             movie.tmdbID = TMDbId;
//             movie.fetcher = this.name;
//             movie.link = link;
//             movie.title = title;
//             movie.poster = image?.replace(/(\-[0-9]{3}x([0-9]{3}))/g, "");
//             movie.background = background;

//             movie.rating = rating;
//             movie.duration = duration;
//             movie.release = released;
//             movie.description = description;

//             movie.genders = genres;
//             movie.cast = cast;

//             movie.servers = servers;

//             return movie;
//         }

//     }



//     /**
//      * 
//      * @param {String} html 
//      * @returns {Array<Movie|Serie>}
//      */
//     parseCollectionHTML(html) {

//         var $ = load(html)
//         var list = $(".MovieList > li > .post, .MovieList > li > .TPost");
//         var returner = [];


//         for (let index = 0; index < list.length; index++) {
//             const element = $(list[index]);

//             var link = element.find("a").attr("href");
//             var image = element.find("img[data-src]")?.attr("data-src");
//             if (!image) image = element.find(".wp-post-image")?.attr("src");



//             if (link.includes("/serie/")) {

//                 var serie = new Serie();

//                 serie.fetcher = this.name;
//                 serie.link = link;
//                 serie.title = element.find(".Title")?.text()?.trim();
//                 serie.poster = image?.replace(/(\-[0-9]{3}x([0-9]{3}))/g, "");
//                 serie.background = serie.poster;

//                 serie.rating = element.find(".Vote")?.text()?.trim();
//                 serie.release = element.find(".Date,.TPost .meta")?.text()?.trim();
//                 serie.description = element.find(".Description")?.text()?.trim();

//                 returner.push(serie);


//             } else {

//                 var movie = new Movie();

//                 movie.fetcher = this.name;
//                 movie.link = link;
//                 movie.title = element.find(".Title")?.text()?.trim();
//                 movie.poster = image?.replace(/(\-[0-9]{3}x([0-9]{3}))/g, "");
//                 movie.background = movie.poster;

//                 movie.rating = element.find(".Vote")?.text()?.trim();
//                 movie.duration = parseDuration(element.find(".Time")?.text()?.trim());
//                 movie.release = element.find(".Date")?.text()?.trim();
//                 movie.description = element.find(".Description")?.text()?.trim();
//                 returner.push(movie);
//             }


//         }

//         doc = null;
//         return returner;

//     }


//     parseMovieHTML(html, type = "") {

//         var $this = this;

//         var $ = load(html);

//         var id = $("#top-single")?.attr("data-id");
//         var poster = $(".TPost .Image img[data-src]")?.attr('data-src');
//         var background = $(".backdrop > .Image img[data-src]")?.attr("data-src");
//         var title = $(".TPost .Title")?.text()?.trim();
//         var subtitle = $(".TPost .SubTitle")?.text()?.trim();
//         var description = $(".TPost .Description")?.text()?.trim();
//         var release = $(".TPost .meta")?.text()?.trim();
//         var rating = $("#TPVotes")?.attr("data-percent")?.trim();

//         var canonical = $("link[rel='canonical']")?.attr("href") ?? "";
//         var _season_episode = canonical?.match(/\-([0-9].*)x([0-9].*)/);

//         type = canonical.includes("episodio") ? "episode" : type;

//         var cast = [];
//         var trailers = [];
//         var genres = [];
//         var seasons = [];
//         var servers = [];


//         if (poster?.includes('tmdb.org')) {
//             poster = poster.replace(/\/p\/(.*?)\//g, "/p/original/");
//         }

//         if (background?.includes('tmdb.org')) {
//             background = background.replace(/\/p\/(.*?)\//g, "/p/original/");
//         }


//         if ($("#OptY iframe")) {
//             trailers.push($("#OptY iframe")?.attr("data-src"));
//         }

//         $("[data-tplayernv]").each((index,element) => {

//             var id = element.attr("data-tplayernv");
//             var iframe = $(`#${id} iframe`)
//             var name = element.find(".cdtr > span")?.html()?.trim();

//             if (iframe) {
//                 servers.push({
//                     name: name,
//                     url: this.fixUrl(iframe.attr("data-src")),
//                 })
//             }

//         });

//         $(".InfoList a[href*='category']").each((index,element) => {

//             genres.push(Category.fromObject({
//                 id: element.href.split("category/")[1],
//                 name: element.text()?.trim(),
//                 link: this.fixUrl(element.attr("href")),
//             }));

//         });

//         $(".loadactor a").each((index,element) => {

//             cast.push({
//                 name: element.text()?.trim(),
//                 link: element.href?.replace("cast_tv", "actor")
//             });

//         });

//         $("#select-season option").each((seasonIndex,elemen) => {

//             var id = element.value;
//             var name = element.text()?.trim();

//             var season = new Season();
//             season.fetcher = $this.name;
//             season.name = name;
//             season.season = id;
//             season.id = id;

//             $(`#season-${id}.all-episodes li`).each((index,episode) => {


//                 var link = episode.find("a")?.href;
//                 var id = link.match(/post\-([0-9]*)\s/);
//                 id = id ? id[1] : null;


//                 var image = episode.find("img[data-src]")?.attr("data-src");
//                 var title = episode.find(".Title")?.text()?.trim();

//                 if (image.includes('tmdb.org')) {
//                     image = image.replace(/\/p\/(.*?)\//g, "/p/original/");
//                 }

//                 var episode_ = new Episode();
//                 episode_.id = id;
//                 episode_.episode = index + 1;
//                 episode_.season = seasonIndex;

//                 episode_.title = title;
//                 episode_.link = $this.fixUrl(link);
//                 episode_.poster = $this.fixUrl(image);



//                 season.addEpisode(episode_);

//             });


//             seasons.push(season);

//         });


//         if (type == "tv") {

//             var serie = new Serie();
//             serie.id = id;
//             serie.fetcher = this.name;
//             serie.poster = poster;
//             serie.background = background;
//             serie.title = title;
//             serie.subtitle = subtitle;
//             serie.description = description;
//             serie.cast = cast;
//             serie.genders = genres;
//             serie.trailers = trailers;
//             serie.servers = [];
//             serie.seasons = seasons;
//             serie.release = release;
//             serie.rating = rating;

//             return serie;

//         } else if (type == "episode") {

//             var episode = new Episode();

//             episode.id = id;

//             episode.season = _season_episode ? (Number(_season_episode[1])) : '';
//             episode.episode = _season_episode ? (Number(_season_episode[2])) : '';

//             episode.title = $(".Title")?.text()?.trim() ?? `${title} ${episode.season}x${episode.episode}`;


//             episode.link = canonical;
//             episode.poster = poster;
//             episode.servers = servers;

//             episode.fetcher = this.name;

//             return episode;

//         } else {

//             var movie = new Movie();

//             movie.fetcher = this.name;
//             movie.id = id;
//             movie.poster = poster;
//             movie.background = background;
//             movie.title = title;
//             movie.subtitle = subtitle;
//             movie.description = description;
//             movie.cast = cast;
//             movie.genders = genres;
//             movie.trailers = trailers;
//             movie.servers = servers;
//             movie.release = release;
//             movie.rating = rating;
//             movie.type = canonical.includes("episodio") ? "episode" : "movie";

//             return movie;

//         }


//     }


//     /**
//      * 
//      * @param {String} url 
//      */
//     fixUrl(url) {

//         if (url.startsWith("//")) {
//             url = "https:" + url;
//         }

//         return url;
//     }



// }

// export default Tekilaz;