"use strict";
// @ts-ignore
// import DefaultProvider from "../default-provider";
// import Movie from "../../models/movie";
// import Serie from "../../models/serie";
// import Episode from "../../models/episode";
// import Season from "../../models/season";
// import { getHost, getOrigin, normalize } from "../../utils/helpers";
// import Source from "../../models/source";
// import Base64 from "../../utils/base64";
Object.defineProperty(exports, "__esModule", { value: true });
// const parseDuration = (duration) => {
//     try {
//         var hours = duration.match(/(\d+)h/);
//         var minutes = duration.match(/(\d+)m/);
//         var seconds = duration.match(/(\d+)s/);
//         const addZero = (n) => n < 10 ? `0${n}` : n;
//         hours = hours ? parseInt(hours[1]) : 0;
//         minutes = minutes ? parseInt(minutes[1]) : 0;
//         seconds = seconds ? parseInt(seconds[1]) : 0;
//         return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
//     } catch (error) {
//         return duration;    
//     }
// };
// const tryAtob = (str) => {
//     try {
//         return Base64.decode(str);
//     } catch (error) {
//         return null;
//     }
// }
// class CuevanaChat extends DefaultProvider {
//     static name = "CuevanaChat";
//     static site = "https://cuevana3.chat/";
//     static language = "es";
//     match(urlOrID){
//         return urlOrID.includes("cuevana3.chat");
//     }
//     /**
//      * Headers for the request
//      * @returns {{}}
//      */
//     headers(extra = {}){
//         return Object.assign({
//             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
//             "Origin": getOrigin(this.site),
//           //  "Host": getHost(this.site),
//             "Referer": this.site
//         }, extra);
//     }
//     async checkMovePermanent(promise){
//         var $this = this;
//         var body;
//         if(promise.then) body = (await promise).body;        
//         if(typeof promise == "string") body = promise;
//         if(typeof promise == "object") body = promise.body ?? promise.data;
//         if(typeof body == "string" && body.includes("301 Moved Permanently")){
//             if(body.indexOf('The documen    t has moved <a href="') > -1){
//                 var link = body.split('The document has moved <a href="')[1].split('">here</a>')[0];
//                 $this.site = getOrigin(link);
//                 return $this.requester.get(link, $this.headers(), false);
//             }
//         }
//         return await promise;
//     }
//     async search (query, options = {}) {
//         let url = `${this.site}?s=${query}`;
//         var response = await this.requester.get(url, this.headers());
//         try {
//             response = this.parseCollectionHTML(response.body);
//             if(response && response.length){
//                 return response;
//             }
//         } catch (error) {
//             console.log(`Error: ${error}`)
//         }
//         return [];
//     }
//     async getById(idorLink, type = ""){
//         if(idorLink.includes("/serie/")){
//             type = "tv";
//         }else{
//             type = type ?? "movie";
//         }
//         if(idorLink.includes('http')){
//             var response = await this.requester.get(idorLink, this.headers({ "Referer": this.site }));
//             var html = response.body;
//             var data = this.parseMovieHTML(html, type);
//             if(data) data.link = idorLink;
//             return data;
//         }else{
//         }
//     }
//     async getEpisode(irOrLink, episode){
//     }
//     async genders(gender, options = {}){}
//     /**
//      * 
//      * @param {Stirng} type 
//      * @param {{}} options 
//      * @returns Promise<Array<Movie|Serie>>
//      * 
//      * Get Media by types
//      * 
//      */
//     async byType(type, options = {}){
//         var url = this.site;
//         var isMovie = !( type == "tv" || type == "serie" || type == "series");
//         if(!isMovie){
//             url = `${this.site}serie`;
//         }else{
//             url = `${this.site}peliculas`;
//         }
//         var page = options.page ?? 1;
//         if(isMovie){
//             var repsonse = await this.requester.get(`${url}/page/${page}`, this.headers());
//             return this.parseCollectionHTML(repsonse.body ?? repsonse);
//         }else{
//             url = `${this.site}/wp-admin/admin-ajax.php`;
//             var response = await this.checkMovePermanent(await this.requester.post(
//                 url, 
//                 (new URLSearchParams({
//                     "action": "cuevana_ajax_pagination",
//                     "query_vars":"",
//                     "page": page,
//                 } )).toString()
//             ));
//             return this.parseCollectionHTML(response.body ?? response);
//         }
//     }
//     /**
//      * 
//      * @param {String} html 
//      * @returns {Array<Movie|Serie>}
//      */
//     parseCollectionHTML(html){
//         var doc = new DOMParser().parseFromString(html, "text/html");
//         var list = doc.querySelectorAll(".MovieList > li > .post, .MovieList > li > .TPost");
//         var returner = [];
//         for (let index = 0; index < list.length; index++) {
//             const element = list[index];
//             var link = element.querySelector("a").href;
//             var image = element.querySelector("img[data-src]")?.getAttribute("data-src");
//             if(!image) image = element.querySelector(".wp-post-image")?.getAttribute("src");
//             if(link.includes("/serie/")){
//                 var serie = new Serie();
//                 serie.fetcher = this.name;
//                 serie.link = link;
//                 serie.title = element.querySelector(".Title")?.innerText?.trim();
//                 serie.poster = image?.replace(/(\-[0-9]{3}x([0-9]{3}))/g,"");
//                 serie.background = serie.poster;
//                 serie.rating = element.querySelector(".Vote")?.innerText?.trim();
//                 serie.release = element.querySelector(".Date,.TPost .meta")?.innerText?.trim();
//                 serie.description = element.querySelector(".Description")?.innerText?.trim();
//                 returner.push(serie);
//             }else{
//                 var movie = new Movie();
//                 movie.fetcher = this.name;
//                 movie.link = link;
//                 movie.title = element.querySelector(".Title")?.innerText?.trim();
//                 movie.poster = image?.replace(/(\-[0-9]{3}x([0-9]{3}))/g,"");
//                 movie.background = movie.poster;
//                 movie.rating = element.querySelector(".Vote")?.innerText?.trim();
//                 movie.duration = parseDuration(element.querySelector(".Time")?.innerText?.trim());
//                 movie.release = element.querySelector(".Date")?.innerText?.trim();
//                 movie.description = element.querySelector(".Description")?.innerText?.trim();
//                 returner.push(movie);
//             }
//         }
//         doc = null;
//         return returner;
//     }
//     parseMovieHTML(html, type = ""){
//         var $this = this;
//         var doc = new DOMParser().parseFromString(html, "text/html");
//         var id = doc.querySelector("#top-single")?.getAttribute("data-id");
//         var poster = doc?.querySelector(".TPost .Image img[data-src]")?.getAttribute('data-src');
//         var background = doc.querySelector(".backdrop > .Image img[data-src]")?.getAttribute("data-src");
//         var title = doc.querySelector(".TPost .Title")?.innerText?.trim();
//         var subtitle = doc.querySelector(".TPost .SubTitle")?.innerText?.trim();
//         var description = doc.querySelector(".TPost .Description")?.innerText?.trim();
//         var release = doc.querySelector(".TPost .meta")?.innerText?.trim();
//         var rating = doc.querySelector("#TPVotes")?.getAttribute("data-percent")?.trim();
//         var canonical = doc.querySelector("link[rel='canonical']")?.getAttribute("href") ?? "";
//         var _season_episode = canonical?.match(/\-([0-9].*)x([0-9].*)/);
//         type = canonical.includes("episodio") ? "episode" : type;
//         var cast = [];
//         var trailers = [];
//         var genres = [];
//         var seasons = [];
//         var servers = [];
//         if(poster?.includes('tmdb.org')){
//             poster = poster.replace(/\/p\/(.*?)\//g,"/p/original/");
//         }
//         if(background?.includes('tmdb.org')){
//             background = background.replace(/\/p\/(.*?)\//g,"/p/original/");
//         }
//         if(doc.querySelector("#OptY iframe")){
//             trailers.push(doc.querySelector("#OptY iframe")?.getAttribute("data-src"));
//         }
//         doc.querySelectorAll("[data-embed]").forEach(element => {
//             var url = tryAtob(element.getAttribute("data-embed"));
//             var name = `${element.querySelector(`img`).getAttribute("alt")}`.trim();
//             if(url){
//                 let source = new Source();
//                 source.fetcher = this.name;
//                 source.from = name;
//                 source.url = url;
//                 source.name = normalize(name);
//                 source.type = "embed";
//                 source.resolution = "HD";
//                 servers.push(source);
//             }
//         });
//         doc.querySelectorAll(".InfoList a[href*='category']").forEach(element => {
//             genres.push({
//                 id: element.href.split("category/")[1],
//                 name: element.innerText?.trim(),
//                 link: element.href
//             });
//         });
//         doc.querySelectorAll(".loadactor a").forEach(element => {
//             cast.push({
//                 name: element.innerText?.trim(),
//                 link: element.href?.replace("cast_tv","actor")
//             });
//         });
//         doc.querySelectorAll("#select-season option").forEach((element, seasonIndex) => {
//             var id = element.value;
//             var name = element.innerText?.trim();
//             var season = new Season();
//             season.fetcher = $this.name;
//             season.name = name;
//             season.season = id;
//             season.id = id;
//             doc.querySelectorAll(`#season-${id}.all-episodes li`).forEach((episode, index) => {
//                 var link = episode.querySelector("a")?.href;
//                 var id = link.match(/post\-([0-9]*)\s/);
//                 id = id ? id[1] : null;
//                 var image = episode.querySelector("img[data-src]")?.getAttribute("data-src");
//                 var title = episode.querySelector(".Title")?.innerText?.trim();
//                 if(image.includes('tmdb.org')){
//                     image = image.replace(/\/p\/(.*?)\//g,"/p/original/");
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
//             seasons.push( season );
//         });
//         if(type == "tv"){
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
//         }else if(type == "episode"){
//             var episode = new Episode();
//             episode.id = id;
//             episode.season = _season_episode? (Number(_season_episode[1])) : '';
//             episode.episode = _season_episode ? (Number(_season_episode[2]))  : '';
//             episode.title = doc.querySelector(".Title")?.innerText?.trim() ?? `${title} ${episode.season}x${episode.episode}`;
//             episode.link = canonical;
//             episode.poster = poster;
//             episode.servers = servers;
//             episode.fetcher = this.name;
//             return episode;
//         }else{
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
//     fixUrl(url){
//         if(url.startsWith("//")){
//             url = "https:" + url;
//         }
//         return url;
//     }
// }
// export default CuevanaChat;
