"use strict";
// @ts-ignore
// import DefaultProvider from "../default-provider";
// import Movie from "../../models/movie";
// import Serie from "../../models/serie";
// import Episode from "../../models/episode";
// import Season from "../../models/season";
// import { getHost, getOrigin } from "../../utils/helpers";
Object.defineProperty(exports, "__esModule", { value: true });
// class Tinyzone extends DefaultProvider{
//     static name = "Tinyzone";
//     static site = "https://ww1.tinyzone.org/";
//     static language = "en";
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
//         }, extra)
//     }
//     async checkMovePermanent(promise){
//         var $this = this;
//         return await promise.then(e => {
//             if(typeof body == "string" && body.includes("301 Moved Permanently")){
//                 if(body.indexOf('The document has moved <a href="') > -1){
//                     var link = body.split('The document has moved <a href="')[1].split('">here</a>')[0];
//                     $this.site = getOrigin(link);
//                     return $this.requester.get(link, $this.headers(), false);
//                 };
//             }
//             return e;
//         })
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
//             console.log(`Location: ${response.headers.location}`);
//             var html = response.body;
//             var data = this.parseMovieHTML(html, type);
//             if(data) data.link = idorLink;
//             return data;
//         }else{
//         }
//     }
//     async getEpisode(irOrLink, episode){
//     }
//     /**
//      * 
//      * @param {String} html 
//      * @returns {Array<Movie|Serie>}
//      */
//     parseCollectionHTML(html){
//         var doc = new DOMParser().parseFromString(html, "text/html");
//         var list = doc.querySelectorAll(".MovieList > li > .post");
//         var returner = [];
//         for (let index = 0; index < list.length; index++) {
//             const element = list[index];
//             var link = element.querySelector("a").href;
//             var image = element.querySelector("img[data-src]")?.getAttribute("data-src");
//             if(link.includes("/serie/")){
//                 var serie = new Serie();
//                 serie.fetcher = this.name;
//                 serie.link = link;
//                 serie.title = element.querySelector(".Title")?.innerText?.trim();
//                 serie.poster = image?.replace(/(\-[0-9]{3}x([0-9]{3}))/g,"");
//                 serie.background = serie.poster;
//                 serie.rating = element.querySelector(".Vote")?.innerText?.trim();
//                 serie.release = element.querySelector(".Date")?.innerText?.trim();
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
//                 movie.duration = element.querySelector(".Time")?.innerText?.trim();
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
//         console.log(doc.querySelector(".TPost .Image src[data-src]"))
//         var id = doc.querySelector("#top-single")?.getAttribute("data-id");
//         var poster = doc?.querySelector(".TPost .Image img[data-src]")?.getAttribute('data-src');
//         var background = doc.querySelector(".backdrop > .Image img[data-src]")?.getAttribute("data-src");
//         var title = doc.querySelector(".TPost .Title")?.innerText?.trim();
//         var subtitle = doc.querySelector(".TPost .SubTitle")?.innerText?.trim();
//         var description = doc.querySelector(".TPost .Description")?.innerText?.trim();
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
//         doc.querySelectorAll("[data-tplayernv]").forEach(element => {
//             var  id = element.getAttribute("data-tplayernv");
//             var iframe = doc.querySelector(`#${id} iframe`)
//             var name = element.querySelector(".cdtr > span")?.innerHTML?.trim();
//             if(iframe){
//                 servers.push({
//                     name:name,
//                     url: this.fixUrl(iframe.getAttribute("data-src")),
//                 })
//             }
//         })
//         doc.querySelectorAll(".InfoList a[href*='category']").forEach(element => {
//             genres.push({
//                 id: element.href.split("category/")[1],
//                 name: element.innerText?.trim(),
//                 link: element.href
//             });
//         })
//         doc.querySelectorAll(".loadactor a").forEach(element => {
//             cast.push({
//                 name: element.innerText?.trim(),
//                 link: element.href?.replace("cast_tv","actor")
//             });
//         })
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
//                 var episode = new Episode();
//                 episode.id = id;
//                 episode.episode = index + 1;
//                 episode.season = seasonIndex;
//                 episode.title = title;
//                 episode.link = $this.fixUrl(link);
//                 episode.poster = $this.fixUrl(image);
//                 season.addEpisode(episode);
//             })
//             seasons.push( season );
//         })
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
//             serie.servers = []
//             serie.seasons = seasons;
//             return serie;
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
// export default Tinyzone;
