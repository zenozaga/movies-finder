"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importStar(require("lodash"));
const default_provider_1 = __importDefault(require("../default-provider"));
const movie_1 = __importDefault(require("../../models/movie"));
const serie_1 = __importDefault(require("../../models/serie"));
const episode_1 = __importDefault(require("../../models/episode"));
const season_1 = __importDefault(require("../../models/season"));
const cast_1 = __importDefault(require("../../models/cast"));
const category_1 = __importDefault(require("../../models/category"));
const helpers_1 = require("../../utils/helpers");
const source_1 = __importDefault(require("../../models/source"));
const cheerio_1 = require("cheerio");
const types_1 = require("../../types");
class Tekilaz extends default_provider_1.default {
    constructor() {
        super(...arguments);
        this.name = "Tekilaz";
        this.language = "en";
        this.site = "https://tekilaz.co/";
        this.hash = null;
    }
    urlInfo(url) {
        if (url.includes("/episodio/") || url.includes("/episodes/")) {
            var season = url.match(/temporada-(\d+)/);
            var episode = url.match(/episodio-(\d+)/);
            var slug = url.match(/episodio\/(.*?)\-temporada/);
            return {
                slug: slug ? slug[1] : null,
                season: season ? season[1] : null,
                episode: episode ? episode[1] : null,
                type: types_1.MediaTypes.episode,
            };
        }
        else {
            var slug = url.match(/(pelicula|serie|movies|series)\/(.*?)$/);
            return {
                slug: slug ? slug[2] : null,
                type: (url.includes("serie") || url.includes("series") || url.includes("tv")) ? types_1.MediaTypes.tv : types_1.MediaTypes.movie,
                season: null,
                episode: null,
            };
        }
    }
    checkMovePermanent(promise) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            var $this = this;
            var body;
            if (!promise)
                return "";
            var body = (_a = (yield promise).body) !== null && _a !== void 0 ? _a : (yield promise).string;
            if (typeof body == "string" && body.includes("301 Moved Permanently")) {
                if (!body.includes("The document has moved <a href="))
                    return body;
                var link = body.split('The document has moved <a href="')[1].split('">here</a>')[0];
                var origin = (0, helpers_1.getOrigin)(link);
                if (!origin || !link)
                    return body;
                $this.setSite(origin);
                var result = yield ((_b = $this.requester) === null || _b === void 0 ? void 0 : _b.get(link, $this.headers()));
                return (_c = result === null || result === void 0 ? void 0 : result.body) !== null && _c !== void 0 ? _c : result === null || result === void 0 ? void 0 : result.string;
            }
            return body;
        });
    }
    getHash() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hash)
                return this.hash;
            var html = yield this.checkMovePermanent((_a = this.requester) === null || _a === void 0 ? void 0 : _a.get(this.site, this.headers()));
            if (html.indexOf('/_ssgManifest.js') > -1) {
                var hash = html.split('/_ssgManifest.js')[0];
                hash = hash.substring(hash.lastIndexOf('/') + 1);
                this.hash = hash;
                return hash;
            }
            return null;
        });
    }
    parseCollection(list = []) {
        var $this = this;
        var returner = [];
        for (let index = 0; index < list.length; index++) {
            var ele = $this.parseElement(list[index]);
            returner.push(ele);
        }
        return returner;
    }
    parseElement(json, relates) {
        var $this = this;
        var slug = lodash_1.default.get(json, "slug.name", lodash_1.default.get(json, "slug", ""));
        var episode = lodash_1.default.get(json, "slug.episode", 0);
        var season = lodash_1.default.get(json, "slug.season", 0);
        var link = (0, lodash_1.join)([this.site, lodash_1.default.get(json, "url.slug", "").includes("movies") ? "pelicula" : "serie", slug], "/"); //`${this.site}/${_.get(json, "url.slug", "").includes("movies") ? "pelicula" : "serie"}/${slug}`; join(this.site, slug);
        var title = lodash_1.default.get(json, "titles.name", lodash_1.default.get(json, "titles", lodash_1.default.get(json, "title", "")));
        var subtitle = lodash_1.default.get(json, "titles.original.name", "");
        var description = lodash_1.default.get(json, "description.name", lodash_1.default.get(json, "overview", ""));
        var image = lodash_1.default.get(json, "images.poster", lodash_1.default.get(json, "images", lodash_1.default.get(json, "image", "")));
        var background = lodash_1.default.get(json, "images.backdrop", image);
        var TMDbId = lodash_1.default.get(json, "TMDbId", "");
        var runtime = lodash_1.default.get(json, "runtime", 0);
        var cast = lodash_1.default.get(json, "cast.acting", lodash_1.default.get(json, "cast", [])).map((person) => {
            var _a;
            var id = lodash_1.default.get(person, "id", `https://www.themoviedb.org/search?query=` + encodeURIComponent(person.name));
            var link = person.id ? `https://www.themoviedb.org/person/${person.id}?language=es` : id;
            if (!person.id && !person.name)
                return null;
            return cast_1.default.fromObject({
                name: person.name,
                id: id,
                type: "cast",
                avatar: (_a = person.image) !== null && _a !== void 0 ? _a : "",
                link: link,
                fetcher: this.name,
                tmdbID: person.id
            });
        }).filter((person) => person != null);
        var genres = lodash_1.default.get(json, "genres", []).map((genre) => {
            var _a, _b;
            return category_1.default.fromObject({
                name: genre.name,
                id: (_a = genre.slug) !== null && _a !== void 0 ? _a : (0, helpers_1.slugify)(genre === null || genre === void 0 ? void 0 : genre.name),
                type: "category",
                link: `${this.site}genero/${(_b = genre.slug) !== null && _b !== void 0 ? _b : (0, helpers_1.slugify)(genre === null || genre === void 0 ? void 0 : genre.name)}`,
                poster: "",
                description: "",
                fetcher: this.name
            });
        });
        var servers = (() => {
            var returner = [];
            var videoMap = lodash_1.default.get(json, "videos", {});
            for (const lang in videoMap) {
                var videos = videoMap[lang];
                videos.map((video) => {
                    returner.push(source_1.default.fromObject({
                        name: (0, helpers_1.normalize)(`${video.cyberlocker}`),
                        url: video.result,
                        type: (0, helpers_1.getTypeByExtension)(video.result),
                        resolution: source_1.default.parseResolution(video.quality),
                        lang: (0, helpers_1.parseLanguage)(lang),
                        from: link,
                        fetcher: this.name
                    }));
                });
            }
            return returner;
        })();
        var seasons = lodash_1.default.get(json, "seasons", []).map((season, index) => {
            var n = season.number;
            if (n == undefined || n == null) {
                n = index + 1;
            }
            var _season = season_1.default.fromObject({
                id: link,
                link: link,
                name: `${title} - season ${index + 1}`,
                season: n,
                poster: "",
                released: "",
                episodes: [],
                fetcher: this.name
            });
            lodash_1.default.get(season, "episodes", []).map((episode, episode_number) => {
                var n = episode.number;
                if (n == undefined || n == null) {
                    n = episode_number + 1;
                }
                var tmdbID = lodash_1.default.get(episode, "TMDbId", "");
                var poster = lodash_1.default.get(episode, "image", "");
                var title = lodash_1.default.get(episode, "title", "");
                var released = lodash_1.default.get(episode, "releaseDate", "");
                var episode_link = `${$this.site}episodio/${slug}-temporada-${lodash_1.default.get(episode, "slug.season", 0)}-episodio-${lodash_1.default.get(episode, "slug.episode", 0)}`;
                _season.addEpisode(episode_1.default.fromObject({
                    id: episode_link,
                    title: title !== null && title !== void 0 ? title : `${title} ${index}x${n}`,
                    description: "",
                    duration: "",
                    released: released,
                    rating: "",
                    votes: 0,
                    episode: n,
                    season: index,
                    link: episode_link,
                    poster: poster !== null && poster !== void 0 ? poster : "",
                    servers: [],
                    fetcher: "",
                    tmdbID: tmdbID,
                    relates: relates !== null && relates !== void 0 ? relates : []
                }));
            });
            return _season;
        });
        var rating = lodash_1.default.get(json, "rate.average", 0);
        var votes = lodash_1.default.get(json, "rate.votes", 0);
        var released = lodash_1.default.get(json, "releaseDate", "");
        var duration = lodash_1.default.get(json, "duration", (0, helpers_1.parseRuntime)(runtime));
        if (lodash_1.default.has(json, "nextEpisode")) {
            var link = `${this.site}episodio/${slug}-temporada-${season}-episodio-${episode}`;
            return episode_1.default.fromObject({
                id: link,
                title: (0, helpers_1.normalize)(title !== null && title !== void 0 ? title : `${title} ${season}x${episode}`),
                description: (0, helpers_1.normalize)(description),
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
                tmdbID: TMDbId,
                relates: relates !== null && relates !== void 0 ? relates : []
            });
        }
        else if (link.includes("/serie/")) {
            return serie_1.default.fromObject({
                id: link,
                link: link,
                title: (0, helpers_1.normalize)(title),
                subtitle: (0, helpers_1.normalize)(subtitle),
                description: (0, helpers_1.normalize)(description),
                rating: rating,
                votes: votes,
                released: released,
                year: (0, helpers_1.getYear)(released),
                poster: image === null || image === void 0 ? void 0 : image.replace(/(\-[0-9]{3}x([0-9]{3}))/g, ""),
                background: background,
                genders: genres,
                seasons: seasons,
                cast: cast,
                trailers: [],
                fetcher: this.name,
                type: types_1.MediaTypes.tv,
                tmdbID: TMDbId,
                relates: relates !== null && relates !== void 0 ? relates : []
            });
        }
        else {
            return movie_1.default.fromObject({
                id: link,
                title: (0, helpers_1.normalize)(title),
                subtitle: (0, helpers_1.normalize)(title),
                description: (0, helpers_1.normalize)(description),
                duration: duration,
                type: types_1.MediaTypes.movie,
                rating: rating,
                released: released,
                year: (0, helpers_1.getYear)(released),
                poster: image === null || image === void 0 ? void 0 : image.replace(/(\-[0-9]{3}x([0-9]{3}))/g, ""),
                background: background,
                trailers: [],
                genders: genres,
                sources: servers,
                cast: cast,
                fetcher: this.name,
                tmdbID: TMDbId,
                link: link,
                relates: relates !== null && relates !== void 0 ? relates : []
            });
        }
    }
    /**
     *
     * @param {String} url
     */
    fixUrl(url) {
        if (url.startsWith("//")) {
            url = "https:" + url;
        }
        return url;
    }
    headers(extra = {}) {
        return Object.assign({ "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36", "Origin": this.site, "Referer": this.site }, extra);
    }
    /**
     * Verify if the url or id is from this provider
     * @param urlOrID
     * @returns {boolean}
     */
    match(urlOrID) {
        return urlOrID.includes("tekilaz");
    }
    home() {
        return __awaiter(this, void 0, void 0, function* () {
            var hash = yield this.getHash();
            var url = `${this.site}/_next/data/${hash}/es.json`;
            var result = yield this.requester.get(url, this.headers());
            var body = result.body;
            if (!body)
                throw new Error("No response");
            try {
                body = JSON.parse(result.body);
            }
            catch (error) {
            }
            var movies = this.parseCollection(lodash_1.default.get(body, "pageProps.tabLastMovies", []));
            var series = this.parseCollection(lodash_1.default.get(body, "pageProps.series", []));
            var episodes = this.parseCollection(lodash_1.default.get(body, "pageProps.episodes", []));
            var tabTopMovies = this.parseCollection(lodash_1.default.get(body, "pageProps.tabTopMovies", []));
            var tabTopSeries = series;
            return {
                episodes,
                movies,
                series,
                topMovies: tabTopMovies,
                topSeries: tabTopSeries
            };
        });
    }
    byType(type, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            var $this = this;
            var isMovie = type == types_1.MediaTypes.movie;
            var page = Number(lodash_1.default.get(options, "page", 1));
            var hash = yield this.getHash();
            var url = `${$this.site}/_next/data/${hash}/es/${isMovie ? "peliculas" : 'series'}/page/${page}.json`;
            var repsonse = yield ((_a = this.requester) === null || _a === void 0 ? void 0 : _a.get(url, this.headers()));
            if (!repsonse)
                return [];
            var body = repsonse.body;
            try {
                body = JSON.parse(body);
            }
            catch (error) {
            }
            return this.parseCollection(lodash_1.default.get(body, "pageProps.movies", []));
        });
    }
    search(query, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            var hash = yield this.getHash();
            let url = `${this.site}/_next/data/${hash}/es/search.json?q=${query}`;
            var response = yield ((_a = this.requester) === null || _a === void 0 ? void 0 : _a.get(url, this.headers()));
            if (!response)
                return [];
            try {
                var data = response.body;
                try {
                    data = JSON.parse(data);
                }
                catch (error) {
                }
                var items = this.parseCollection(lodash_1.default.get(data, "pageProps.movies", []));
                if (items && items.length) {
                    return items;
                }
            }
            catch (error) {
                console.log(`Error: ${error}`);
            }
            return [];
        });
    }
    getById(idorLink, type) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            var $this = this;
            if (idorLink.includes('http')) {
                var hash = yield this.getHash();
                var info = this.urlInfo(idorLink);
                var _type = info.type;
                var url = "";
                if (_type == types_1.MediaTypes.movie) {
                    url = `${$this.site}/_next/data/${hash}/es/pelicula/${info.slug}.json`;
                }
                else if (info.type == types_1.MediaTypes.tv) {
                    url = `${$this.site}/_next/data/${hash}/es/serie/${info.slug}.json?serie=${info.slug}`;
                }
                else {
                    url = `${$this.site}/_next/data/${hash}/es/episodio/${info.slug}-temporada-${info.season}-episodio-${info.episode}.json`;
                }
                var response = yield ((_a = this.requester) === null || _a === void 0 ? void 0 : _a.get(url, this.headers({
                    "Referer": this.site
                })));
                if (!response)
                    throw new Error("No found");
                var data = response.body;
                try {
                    data = JSON.parse(data);
                }
                catch (error) {
                }
                var media = lodash_1.default.get(data, "pageProps.thisMovie", lodash_1.default.get(data, "pageProps.thisSerie", lodash_1.default.get(data, "pageProps.episode", null)));
                if (!media)
                    throw new Error("No found");
                var relates = this.parseCollection(lodash_1.default.get(data, "pageProps.relatedMovies", lodash_1.default.get(data, "pageProps.relatedSeries", [])));
                var parsed = this.parseElement(media, relates);
                return parsed;
            }
            else {
                throw new Error("Not implemented");
            }
        });
    }
    top() {
        return __awaiter(this, void 0, void 0, function* () {
            var home = yield this.home();
            return [...home.movies, ...home.series];
        });
    }
    topMovies() {
        return this.top().then(items => {
            return items.filter(item => item instanceof movie_1.default);
        });
    }
    topSeries() {
        return this.top().then(items => {
            return items.filter(item => item instanceof serie_1.default);
        });
    }
    movies(options) {
        return this.byType(types_1.MediaTypes.movie.toString(), options);
    }
    movie(id) {
        return this.getById(id, types_1.MediaTypes.movie);
    }
    series(options) {
        return this.byType(types_1.MediaTypes.tv.toString(), options);
    }
    serie(id) {
        return this.getById(id, types_1.MediaTypes.tv);
    }
    seasons(serieID) {
        if (!serieID)
            throw new Error("serieID is required");
        return this.getById(serieID).then(serie => {
            return serie.seasons;
        });
    }
    season(id, serieID) {
        if (!serieID)
            throw new Error("serieID is required");
        return this.seasons(serieID).then(seasons => {
            return seasons.find(season => `${season.season}` == `${id}`);
        });
    }
    episodes(seasonID, serieID) {
        if (!serieID)
            throw new Error("serieID is required");
        if (!seasonID)
            throw new Error("seasonID is required");
        return this.season(seasonID, serieID).then(season => {
            return season.episodes;
        });
    }
    episode(id, seasonID, serieID) {
        if (!serieID)
            throw new Error("serieID is required");
        if (!seasonID)
            throw new Error("seasonID is required");
        return this.episodes(seasonID, serieID).then(episodes => {
            return episodes.find(episode => `${episode.episode}` == `${id}`);
        });
    }
    genders() {
        return __awaiter(this, void 0, void 0, function* () {
            var response = yield this.requester.get(this.site);
            var body = response.body;
            if (!body)
                throw new Error("No body");
            var $ = (0, cheerio_1.load)(body);
            var returner = [];
            var list = $('a[href*=genero]');
            if (list.length > 0) {
                list.each((index, element) => {
                    var _a, _b, _c;
                    var ele = $(element);
                    var link = (_a = ele.attr("href")) !== null && _a !== void 0 ? _a : "";
                    var name = (_b = ele.text()) !== null && _b !== void 0 ? _b : "";
                    var id = (_c = link.split("/").pop()) !== null && _c !== void 0 ? _c : "";
                    if (id && name && link)
                        returner.push(category_1.default.fromObject({
                            name: name,
                            id: id,
                            type: "category",
                            link: `${this.site}/${link}`,
                            poster: "",
                            description: "",
                            fetcher: this.name
                        }));
                });
            }
            return returner;
        });
    }
    cast() {
        throw new Error("Method not implemented.");
    }
    sections() {
        return __awaiter(this, void 0, void 0, function* () {
            var hash = yield this.getHash();
            var url = `${this.site}/_next/data/${hash}/es.json`;
            var result = yield this.requester.get(url, this.headers());
            var body = result.body;
            if (!body)
                throw new Error("No response");
            try {
                body = JSON.parse(result.body);
            }
            catch (error) {
            }
            var movies = this.parseCollection(lodash_1.default.get(body, "pageProps.tabLastMovies", []));
            var tabTopMovies = this.parseCollection(lodash_1.default.get(body, "pageProps.tabTopMovies", []));
            var topMoviesDay = this.parseCollection(lodash_1.default.get(body, "pageProps.topMoviesDay", []));
            var topMoviesWeek = this.parseCollection(lodash_1.default.get(body, "pageProps.topMoviesWeek", []));
            var tabLastReleasedMovies = this.parseCollection(lodash_1.default.get(body, "pageProps.tabLastReleasedMovies", []));
            var series = this.parseCollection(lodash_1.default.get(body, "pageProps.series", []));
            var lastSeries = yield this.series({ limit: 10 });
            var episodes = this.parseCollection(lodash_1.default.get(body, "pageProps.episodes", []));
            var tabTopSeries = series;
            var returner = [];
            if ((tabTopMovies === null || tabTopMovies === void 0 ? void 0 : tabTopMovies.length) || (topMoviesDay === null || topMoviesDay === void 0 ? void 0 : topMoviesDay.length))
                returner.push({
                    title: "Top de Hoy",
                    items: [...(tabTopSeries !== null && tabTopSeries !== void 0 ? tabTopSeries : []), ...(tabTopMovies !== null && tabTopMovies !== void 0 ? tabTopMovies : [])],
                    type: "big",
                });
            if (episodes && episodes.length)
                returner.push({
                    title: "Ultimos episodios",
                    items: episodes,
                    type: "thumb",
                });
            if (tabLastReleasedMovies && tabLastReleasedMovies.length)
                returner.push({
                    title: "Estrenos",
                    items: tabLastReleasedMovies,
                    type: "poster",
                });
            if (topMoviesDay && topMoviesDay.length)
                returner.push({
                    title: "Tendencias",
                    items: tabTopMovies,
                    type: "poster",
                });
            if (movies && movies.length)
                returner.push({
                    title: "Peliculas",
                    items: movies,
                    type: "poster",
                });
            if (series && series.length)
                returner.push({
                    title: "Series",
                    items: series,
                    type: "poster",
                });
            if (tabTopSeries && tabTopSeries.length)
                returner.push({
                    title: "Ultimas series",
                    items: lastSeries,
                    type: "poster",
                });
            if (topMoviesWeek && topMoviesWeek.length)
                returner.push({
                    title: "Top peliculas de la semana",
                    items: topMoviesWeek,
                    type: "poster",
                });
            return returner;
        });
    }
}
exports.default = Tekilaz;
