 

import _, { get, join }  from "lodash";
 
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
    slugify,
    tryDate,
    validDate
} from "../../utils/helpers";

import Source, { SourceResolution } from "../../models/source";
import { load } from "cheerio";
import Requester, { Response } from "../../models/requester";
import { MediaTypes, SerieType, MovieType, SeasonType, SourceType, EpisodeType } from "../../types";

class Cuevana extends DefaultProvider {

    name = "Cuevana";
    site = "https://cuevana.biz/";
    language = "es";

    
    match(urlOrID:string) : boolean {
        return urlOrID.includes("cuevana3");
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
     * Check if the response is a 301 Moved Permanently
     * @param promise 
     * @returns 
     */

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

    

  
    /**
     * 
     * @param {String} html 
     * @returns {Array<Movie|Serie>}
     */
    parseCollectionHTML(html:string, selector?:string) : Array<MovieType|SerieType|EpisodeType> {

        var $ = load(html)
        var list = $(selector ?? ".MovieList > li > .post, .MovieList > li > .TPost");
        var returner = [];


        for (let index = 0; index < list.length; index++) {

            const element = $(list[index]);

            var link:string = element.find("a").attr("href") ?? "";
            var image = element.find("img[data-src]")?.attr("data-src");
            if (!image) image = element.find(".wp-post-image")?.attr("src");
            var year = element.find(".Year")?.text()?.trim() ?? "";
            var title = element.find(".Title:eq(0)")?.text()?.trim();
            var poster = image?.replace(/(\-[0-9]{3}x([0-9]{3}))/g, "") ?? "";
            var description = element.find(".Description")?.text()?.trim();
            var year = element.find(".Year")?.text()?.trim() ?? "";
            var rating = element.find(".Info .Vote")?.text()?.trim();
            var release = element.find(".Info .Date")?.text()?.trim();
            var duration = parseRuntime(element.find(".Info .Time")?.text()?.trim());

 
            var poster = image ? this.fixUrl(image) : "";
            var background = poster;

 


            if (link.includes("/serie/")) {

  
                returner.push(Serie.fromObject({
                    id: link,
                    link: link,
                    title: normalize(title),
                    description: normalize(description),
                    poster: poster,
                    background: background,
                    rating: rating,
                    released: release,
                    fetcher: this.name,
                    votes: 0,
                    seasons: [],
                    cast: [],
                    genders: [],
                    subtitle: "",
                    year: year,
                    trailers: [],
                    type: MediaTypes.tv
                }));


            } else {

 
                returner.push(Movie.fromObject({
                    id: link,
                    title: normalize(title),
                    subtitle: normalize(title),
                    description: normalize(description),
                    duration: duration,
                    type: MediaTypes.movie,
                    rating: rating,
                    released: release,
                    poster: poster,
                    background: background,
                    trailers: [],
                    genders: [],
                    sources: [],
                    cast: [],
                    fetcher: this.name,
                    year: release,
                    link: link
                }));
            }


        }

  
        return returner;

    }


    parseMovieHTML(html:string, type = "") : Movie|Serie|Episode {

        var $this = this;

        var $ = load(html);

        var id = $("#top-single")?.attr("data-id");
        var poster = $(".TPost .Image img[data-src]")?.attr('data-src');
        var background = $(".backdrop > .Image img[data-src]")?.attr("data-src");
        var title = $(".TPost .Title:eq(0)")?.text()?.trim();
        var subtitle = $(".TPost .SubTitle")?.text()?.trim();
        var description = $(".TPost .Description")?.text()?.trim();
        var release = $(".TPost .meta")?.text()?.trim();
        var rating = $("#TPVotes")?.attr("data-percent")?.trim();

        var canonical = $("link[rel='canonical']")?.attr("href") ?? "";
        var _season_episode = canonical?.match(/\-([0-9].*)x([0-9].*)/);

        var year = `${release}`.match(/([0-9]{4})/g)?.[0] ?? release;
        var runtime = parseRuntime(release);
        type = canonical.includes("episodio") ? "episode" : type;

        var cast:Cast[] = [];
        var trailers:string[] = [];
        var genres:Category[] = [];
        var seasons:SeasonType[] = [];
        var servers:Source[] = [];
        var relates:(MovieType|SerieType)[] = [];




        if (poster?.includes('tmdb.org')) {
            poster = poster.replace(/\/p\/(.*?)\//g, "/p/original/");
        }

        if (background?.includes('tmdb.org')) {
            background = background.replace(/\/p\/(.*?)\//g, "/p/original/");
        }


        if ($("#OptY iframe")) {
            trailers.push(`${$("#OptY iframe")?.attr("data-src")}`);
        }

        $("[data-tplayernv]").each((index,ele) => {

            var element = $(ele);

            var id = element.attr("data-tplayernv");
            var iframe = $(`#${id} iframe`)
            var name = element.find(".cdtr > span")?.html()?.trim();
            var url = iframe.attr("data-src");

            if (iframe) {
         
                if(url?.includes("youtube.com") || url?.includes("youtu.be")) {
                    
                    if(url) trailers.push(url);

                } else {

                    if(url) servers.push(Source.fromObject({
                        name: name ?? "",
                        url: this.fixUrl(url),
                        type: getTypeByExtension(url),
                        resolution: Source.parseResolution(name ?? ""),
                        lang: parseLanguage(name ?? ""),
                        from: canonical,
                        fetcher: this.name
                    }))
                }
             
                
            }

        });

        $(".InfoList a[href*='category']").each((index,ele) => {

            var element = $(ele);
            var id = element.attr("href")?.split("category/")[1] ?? ""
            var link = `${this.site}/category/${id}`;
            var name = element.text()?.trim() ?? "";

            
            genres.push(Category.fromObject({
                id: id,
                name: name,
                link: link,
                type: "category",
                poster: "",
                description: "",
                fetcher: this.name
            }));


        });

        $(".loadactor a").each((index,ele) => {

            var element = $(ele);
            var name = element.text()?.trim() ?? "";
            var link = element.attr("href")?.replace("cast_tv", "actor") ?? "";
            var id = link.split("actor/")[1] ?? "";

 
            cast.push(Cast.fromObject({
                name: name,
                id: id,
                type: "cast",
                avatar: "",
                link: link,
                fetcher: this.name
            }));

        });

        $("#select-season option").each((seasonIndex,ele) => {

            var element = $(ele);
            var id = `${element.val()}`?.trim() ?? "";
            var name = element.text()?.trim();

            var season = Season.fromObject({
                id: id,
                link: canonical,
                name: name ?? "",
                season: seasonIndex,
                poster: "",
                released: "",
                episodes: [],
                fetcher: this.name
            })

   

            $(`#season-${id}.all-episodes li`).each((index,eps) => {


                var episode = $(eps);

                var link = episode.find("a")?.attr("href") ?? "";
                var id = link.match(/post\-([0-9]*)\s/)?.[1];
 

                var image = episode.find("img[data-src]")?.attr("data-src");
                var title = episode.find(".Title")?.text()?.trim();

                if (`${image}`.includes('tmdb.org')) {
                    image = image!.replace(/\/p\/(.*?)\//g, "/p/original/");
                }

                season.addEpisode(Episode.fromObject({
                    id: link ?? id,
                    title: title ?? "",
                    description: description,
                    duration: runtime,
                    released: release,
                    rating: rating ?? "",
                    votes: 0,
                    episode: index + 1,
                    season: seasonIndex,
                    link: this.fixUrl(link),
                    poster: image ? this.fixUrl(image) : "",
                    servers: [],
                    fetcher: this.name
                }));

            });


            seasons.push(season);

        });

        
        var _relates = this.parseCollectionHTML(html, ".MovieList.Rows > li > .post") as (MovieType|SerieType)[];
        if(_relates.length > 0)  {
            relates = relates.concat([
                ..._relates
            ])
            
        }

        if (type == "tv") {


            return Serie.fromObject({
                id: canonical,
                link: canonical,
                title: title,
                subtitle: subtitle,
                description: description,
                type: MediaTypes.movie,
                rating: rating ?? "",
                votes: 0,
                released: validDate(release) ? tryDate(release) : tryDate(year),
                poster: poster ?? "",
                background: background ?? poster ?? "",
                genders: genres,
                seasons: seasons,
                cast: cast,
                trailers: trailers,
                year: year,
                fetcher: this.name,
                relates: relates
            });
 
        } else if (type == "episode") {


            return Episode.fromObject({
                id: canonical,
                title: title,
                description: description,
                duration: runtime,
                released: validDate(release) ? tryDate(release) : tryDate(year),
                rating: rating ?? "",
                votes: 0,
                episode: Number(_season_episode ? _season_episode[2] : 0),
                season: Number(_season_episode ? _season_episode[1] : 0),
                link: canonical,
                poster: poster ?? "",
                servers: servers,
                fetcher: this.name
            })

     

        } else {

            return Movie.fromObject({
                id: canonical,
                link: canonical,
                title: title,
                subtitle: subtitle,
                description: description,
                duration: runtime,
                type: MediaTypes.movie,
                rating: rating ?? "",
                released: validDate(release) ? tryDate(release) : tryDate(year),
                poster: poster ?? "",
                background: background ?? poster ?? "",
                trailers: trailers,
                genders: genres,
                sources: servers,
                year: year,
                cast: cast,
                fetcher: this.name,
                relates: relates
            })
 

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
 
         
    async byType(type: string, options?: {} | undefined): Promise<(MovieType | SerieType | EpisodeType)[]> {
        
        var url = this.site;
        var isMovie = !( type == "tv" || type == "serie" || type == "series");
        
        if(!isMovie){
            url = `${this.site}serie`;
        }else{
            url = `${this.site}peliculas`;
        }

        var page = get(options, "page", 1);


        if(isMovie){

            var repsonse = await this.requester.get(`${url}/page/${page}`, this.headers());
            return this.parseCollectionHTML(repsonse.body ?? repsonse);


        }else{

            url = `${this.site}/wp-admin/admin-ajax.php`;

            
            var params = new URLSearchParams({
                "action": "cuevana_ajax_pagination",
                "query_vars":"",
                "page": `${page}`,
            })

            var response = await this.checkMovePermanent(this.requester.post( url,  `${params}`));
            if(!response) return [];

 
            return this.parseCollectionHTML(response);
            
        }
         
    }


    async search(query: string, options?: {} | undefined): Promise<(MovieType | SerieType | EpisodeType)[]> {
        
              
        let url = `${this.site}/search/${encodeURIComponent(query)}`;
        var response = await this.requester.get(url, this.headers());
        var body = response.body;

        if(!body) throw new Error("No found results");


        var list = this.parseCollectionHTML(body);

        if(list && list.length > 0) {
            return list;
        }

      

        return [];
        
    }
    
    async getById(idorLink: string, type?: string | undefined): Promise<MovieType | SerieType | EpisodeType> {
        
        if(idorLink.includes("/serie/")){
            type = "tv";
        }else{
            type = type ?? "movie";
        }


        if(idorLink.includes('http')){

            var response = await this.requester.get(idorLink, this.headers({ "Referer": this.site }));
            var html = response.body;
            var data = this.parseMovieHTML(html, type);
            if(data) data.link = idorLink;

            return data;
        
        };


        throw new Error("Not found");

     
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
    async home(): Promise<HomeType> {

        var response = await this.requester.get(`${this.site}/inicio`, this.headers());
        var body = response.body;
        if(!body) throw new Error("No found results");

        var episodes = this.parseCollectionHTML(body, ".episodes .post");
        var series = this.parseCollectionHTML(body, ".series_listado .post");
        var movies = this.parseCollectionHTML(body);

        return {
            series:series as SerieType[],
            movies:movies as MovieType[],
            episodes: episodes as Episode[],
            topMovies:[],
            topSeries:[],
        }
    }
    
    movies(options?: {} | undefined): Promise<MovieType[]> {
        return this.byType("movie", options) as Promise<MovieType[]>;
    }
    
    movie(id: string, options?: any): Promise<MovieType> {
        return this.getById(id, "movie") as Promise<MovieType>;
    }

    series(options?: {} | undefined): Promise<SerieType[]> {
        return this.byType("tv", options) as Promise<SerieType[]>;
    }
    
    serie(id: string, options?: any): Promise<SerieType> {
        return this.getById(id, "tv") as Promise<SerieType>;
    }

    async seasons(serieID?: string | undefined, options?: any): Promise<SeasonType[]> {
        
        if(!serieID) throw new Error("serieID is required");
        var serie = await this.getById(serieID!, "tv") ;
        if(serie instanceof Serie) return serie.seasons;
        return [];
        
    }

    season(id: string, serieID?: string | undefined, options?: any): Promise<SeasonType> {
        
        return this.seasons(serieID, options).then(seasons => {
            var season = seasons.find(s => `${s.id}` == `${id}`);
            if(season) return season;
            throw new Error("Not found");
        });
        
    }

    async episodes(seasonID?: string | undefined, serieID?: string | undefined, options?: any): Promise<EpisodeType[]> {
        
        if(!serieID) throw new Error("serieID is required");
        if(!seasonID) throw new Error("seasonID is required");

        var serie = await this.season( seasonID, serieID, options);
        if(serie instanceof Serie) return serie.episodes;
        return [];
    }

    async episode(id: string, seasonID?: string | undefined, serieID?: string | undefined, options?: any): Promise<EpisodeType> {
        var episode = this.getById(id, "episode");
        return episode as Promise<EpisodeType>;
    }

    async genders(): Promise<Category[]> {
        

        var response = await this.requester.get(`${this.site}/inicio`, this.headers());
        var body = response.body;
        if(!body) throw new Error("No body");

        var $ = load(body);
        var returner = [] as Category[];

        var list = $('a[href*=category]');
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

    cast(options?: any): Promise<Cast[]> {
        throw new Error("Method not implemented.");
    }

 
    async sections(): Promise<Section[]> {

        var home = await this.home();
        var returner = [] as Section[];


        if(home.topMovies?.length || home.topSeries?.length ) returner.push({
            title: "Top de Hoy",
            items: [...(home.topMovies ?? []), ...(home.topSeries ?? [])].sort() as any,
            type: "poster",
        })

        if(home.episodes && home.episodes.length) returner.push({
            title: "Ultimos episodios",
            items: home.episodes,
            type: "thumb",
        })

        
        if(home.movies && home.movies.length) returner.push({
            title: "Peliculas",
            items: home.movies,
            type: "poster",
        })

        if(home.series && home.series.length) returner.push({
            title: "Series",
            items: home.series,
            type: "poster",
        })


        if(home.topMovies && home.topMovies.length) returner.push({
            title: "Peliculas de hoy",
            items: home.topMovies,
            type: "poster",
        })

        if(home.topSeries && home.topSeries.length) returner.push({
            title: "Series de hoy",
            items: home.topSeries,
            type: "poster",
        })
        
        return returner;
   }
    
}

export default Cuevana;