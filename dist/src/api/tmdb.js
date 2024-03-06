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
const cheerio_1 = require("cheerio");
const lodash_1 = __importStar(require("lodash"));
const cast_1 = __importStar(require("../models/cast"));
const category_1 = __importDefault(require("../models/category"));
const episode_1 = __importDefault(require("../models/episode"));
const movie_1 = __importDefault(require("../models/movie"));
const season_1 = __importDefault(require("../models/season"));
const serie_1 = __importDefault(require("../models/serie"));
const default_provider_1 = __importDefault(require("../providers/default-provider"));
const types_1 = require("../types");
const helpers_1 = require("../utils/helpers");
function posterToURI(poster) {
    return `https://image.tmdb.org/t/p/original${poster}`;
}
const Genders = {
    list() {
        return [{ "id": "28", "name": "Action", "link": "https://www.themoviedb.org/genre/28/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "12", "name": "Adventure", "link": "https://www.themoviedb.org/genre/12/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "16", "name": "Animation", "link": "https://www.themoviedb.org/genre/16/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "35", "name": "Comedy", "link": "https://www.themoviedb.org/genre/35/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "80", "name": "Crime", "link": "https://www.themoviedb.org/genre/80/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "99", "name": "Documentary", "link": "https://www.themoviedb.org/genre/99/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "18", "name": "Drama", "link": "https://www.themoviedb.org/genre/18/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10751", "name": "Family", "link": "https://www.themoviedb.org/genre/10751/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "14", "name": "Fantasy", "link": "https://www.themoviedb.org/genre/14/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "36", "name": "History", "link": "https://www.themoviedb.org/genre/36/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "27", "name": "Horror", "link": "https://www.themoviedb.org/genre/27/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10402", "name": "Music", "link": "https://www.themoviedb.org/genre/10402/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "9648", "name": "Mystery", "link": "https://www.themoviedb.org/genre/9648/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10749", "name": "Romance", "link": "https://www.themoviedb.org/genre/10749/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "878", "name": "Science Fiction", "link": "https://www.themoviedb.org/genre/878/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10770", "name": "TV Movie", "link": "https://www.themoviedb.org/genre/10770/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "53", "name": "Thriller", "link": "https://www.themoviedb.org/genre/53/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10752", "name": "War", "link": "https://www.themoviedb.org/genre/10752/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "37", "name": "Western", "link": "https://www.themoviedb.org/genre/37/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10759", "name": "Action & Adventure", "link": "https://www.themoviedb.org/genre/10759/tv", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10762", "name": "Kids", "link": "https://www.themoviedb.org/genre/10762/tv", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10763", "name": "News", "link": "https://www.themoviedb.org/genre/10763/tv", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10764", "name": "Reality", "link": "https://www.themoviedb.org/genre/10764/tv", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10765", "name": "Sci-Fi & Fantasy", "link": "https://www.themoviedb.org/genre/10765/tv", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10766", "name": "Soap", "link": "https://www.themoviedb.org/genre/10766/tv", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10767", "name": "Talk", "link": "https://www.themoviedb.org/genre/10767/tv", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10768", "name": "War & Politics", "link": "https://www.themoviedb.org/genre/10768/tv", "fetcher": "", "type": "category", "poster": "", "description": "" }]
            .map((e) => category_1.default.fromObject({
            name: e.name,
            id: `${e.id}`,
            type: "category",
            link: e.link,
            poster: "",
            description: "",
            fetcher: "tmdb"
        }));
    },
    byId(id) {
        return Genders.list().find((e) => e.id == `${id}`);
    }
};
class TMDBAPI extends default_provider_1.default {
    constructor() {
        super(...arguments);
        this.name = "TMDB";
        this.site = "https://www.themoviedb.org";
        this.language = "es";
    }
    /**
     *  Headers for the requests
     */
    headers() {
        return {
            "Referer": "https://www.themoviedb.org/tv/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
            "Host": "www.themoviedb.org",
            "Origin": "https://www.themoviedb.org"
        };
    }
    parseSource(html) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        var $this = this;
        var doc = (0, cheerio_1.load)(html);
        var data = {
            title: "",
            subtitle: "",
            description: "",
            runtime: "",
            poster: "",
            background: "",
            rating: "",
            release: "",
            genders: [],
            cast: [],
            trailers: [],
            networks: []
        };
        data.title = (_b = (_a = doc(".title.ott_true h2 a")) === null || _a === void 0 ? void 0 : _a.text()) === null || _b === void 0 ? void 0 : _b.trim();
        data.subtitle = data.title;
        data.description = (_d = (_c = doc(".overview")) === null || _c === void 0 ? void 0 : _c.text()) === null || _d === void 0 ? void 0 : _d.trim();
        data.runtime = (_f = (_e = doc(".runtime")) === null || _e === void 0 ? void 0 : _e.text()) === null || _f === void 0 ? void 0 : _f.trim();
        data.poster = (_h = (_g = doc("#media_scroller .poster img")) === null || _g === void 0 ? void 0 : _g.attr("src")) !== null && _h !== void 0 ? _h : "";
        data.background = (_k = (_j = doc("#media_scroller .backdrop img")) === null || _j === void 0 ? void 0 : _j.attr("src")) !== null && _k !== void 0 ? _k : "";
        if (data.poster)
            data.poster = `${$this.site}${data.poster}`;
        if (data.background)
            data.background = `${$this.site}${data.background}`;
        data.rating = (_m = (_l = doc("[data-percent]")) === null || _l === void 0 ? void 0 : _l.attr("data-percent")) !== null && _m !== void 0 ? _m : "";
        data.release = (_q = (_p = (_o = doc(".release")) === null || _o === void 0 ? void 0 : _o.html()) === null || _p === void 0 ? void 0 : _p.trim()) !== null && _q !== void 0 ? _q : "";
        var genres = doc(".genres a");
        genres.each((index, ele) => {
            var a = doc(ele);
            var link = $this.site + `${a.attr("href")}`;
            var name = `${a.html()}`;
            var id = link.substring(link.indexOf("/genre/") + "/genre/".length, link.indexOf("/movie"));
            if (link && name && id) {
                data.genders.push(category_1.default.fromObject({
                    name: name,
                    id: id,
                    type: "category",
                    link: link,
                    poster: "",
                    description: "",
                    fetcher: this.name
                }));
            }
        });
        var trailer = doc('[data-site="YouTube"]');
        if (trailer.length && trailer.attr("data-id")) {
            data.trailers.push("https://www.youtube.com/watch?v=" + trailer.attr("data-id"));
        }
        var cast_scroller = doc("#cast_scroller .card");
        if (cast_scroller && cast_scroller.length) {
            cast_scroller.each((index, _card) => {
                var _a, _b;
                const card = doc(_card);
                var link_element = card.find("p a[href*=person]");
                var link = $this.site + link_element.attr("href");
                var id = (_a = link.match(/person\/(\d+)\-/)) === null || _a === void 0 ? void 0 : _a[1];
                var name = ((link_element.text() || link_element.html()) + "").trim();
                var img = card.find("img").attr("src");
                var character = (_b = card.find(".character").text()) === null || _b === void 0 ? void 0 : _b.trim();
                if (link && name && id) {
                    data.cast.push(cast_1.default.fromObject({
                        name: name,
                        character: character,
                        id: id,
                        type: "cast",
                        avatar: `${this.site}${img}`,
                        link: link,
                        fetcher: this.name
                    }));
                }
            });
        }
        var providerImage = doc(".provider img");
        if (providerImage.length) {
            var image = providerImage.attr("src");
            if (image)
                image = `${this.site}${image}`;
            var name = providerImage.attr("alt");
            var networkLink = doc("[haref*=network/]").attr("href");
            if (networkLink)
                networkLink = `${this.site}${networkLink}`;
            var networkImage = doc("[haref*=network/] img").attr("src");
            if (networkImage)
                networkImage = `${this.site}${networkImage}`;
            var homepage = (_s = (_r = doc(`.homepage .social_link [class="glyphicons_v2 link"]`)) === null || _r === void 0 ? void 0 : _r.parent()) === null || _s === void 0 ? void 0 : _s.attr("href");
            if (image && name) {
                data.networks.push({
                    name: name === null || name === void 0 ? void 0 : name.replace("Now Streaming on ", ""),
                    type: cast_1.NetworkType.streaming,
                    url: homepage !== null && homepage !== void 0 ? homepage : networkLink,
                    image: image
                });
            }
        }
        var socialLinks = doc(".social_link");
        if (socialLinks.length) {
            socialLinks.each((index, ele) => {
                var a = doc(ele);
                var link = a.attr("href");
                var name = a.text();
                /// onlye facebook, twitter and instagram
                if (link && name && (link.includes("facebook") || link.includes("twitter") || link.includes("instagram"))) {
                    data.networks.push({
                        name: name,
                        type: cast_1.NetworkType.social,
                        url: link,
                        image: ""
                    });
                }
            });
        }
        return data;
    }
    movies(options) {
        throw new Error("Method not implemented.");
    }
    search(query, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            var $this = this;
            var language = (0, lodash_1.get)(options, "language", this.language);
            var returner = [];
            var response = yield $this.requester.get(`https://www.themoviedb.org/search/trending?language=${language}&query=` + encodeURIComponent(query), $this.headers());
            var body = response.body;
            if (!body)
                throw new Error("Not found");
            try {
                body = JSON.parse(body);
            }
            catch (error) {
            }
            var result = (_a = body.results) !== null && _a !== void 0 ? _a : body;
            if (result instanceof Array) {
                result.forEach(data => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                    if (data instanceof Object) {
                        if (data.media_type == "tv") {
                            returner.push(movie_1.default.fromObject({
                                id: data.id,
                                link: `https://www.themoviedb.org/tv/${data.id}`,
                                title: (_a = data.name) !== null && _a !== void 0 ? _a : data.original_name,
                                subtitle: (_b = data.original_name) !== null && _b !== void 0 ? _b : data.name,
                                description: (0, helpers_1.normalize)(data.overview),
                                duration: "0h 0m",
                                type: types_1.MediaTypes.movie,
                                rating: `${data.vote_average}`,
                                released: data.first_air_date,
                                year: (0, helpers_1.getYear)((_c = data.first_air_date) !== null && _c !== void 0 ? _c : data.release_date),
                                poster: posterToURI(data.poster_path),
                                background: posterToURI(data.backdrop_path),
                                trailers: [],
                                genders: (_d = lodash_1.default.get(data, "genre_ids", []).map((e) => {
                                    var _a;
                                    return (_a = Genders.byId(e)) !== null && _a !== void 0 ? _a : category_1.default.fromObject({
                                        name: "",
                                        id: e,
                                        type: "category",
                                        link: `https://www.themoviedb.org/genre/${e}/tv`,
                                        poster: "",
                                        description: "",
                                        fetcher: this.name
                                    });
                                })) !== null && _d !== void 0 ? _d : [],
                                sources: [],
                                cast: [],
                                fetcher: this.name,
                                tmdbID: data.id,
                                networks: [],
                            }));
                        }
                        else {
                            returner.push(movie_1.default.fromObject({
                                id: data.id,
                                link: `https://www.themoviedb.org/movie/${data.id}`,
                                title: (0, helpers_1.normalize)((_e = data.title) !== null && _e !== void 0 ? _e : data.original_title),
                                subtitle: (0, helpers_1.normalize)((_f = data.original_title) !== null && _f !== void 0 ? _f : data.title),
                                description: (0, helpers_1.normalize)(data.overview),
                                duration: "0h 0m",
                                type: types_1.MediaTypes.movie,
                                rating: `${data.vote_average}`,
                                released: (_g = data.release_date) !== null && _g !== void 0 ? _g : data.first_air_date,
                                year: (0, helpers_1.getYear)((_h = data.first_air_date) !== null && _h !== void 0 ? _h : data.release_date),
                                poster: posterToURI(data.poster_path),
                                background: posterToURI(data.backdrop_path),
                                trailers: [],
                                genders: (_j = lodash_1.default.get(data, "genre_ids", []).map((e) => {
                                    var _a;
                                    return (_a = Genders.byId(e)) !== null && _a !== void 0 ? _a : category_1.default.fromObject({
                                        name: "",
                                        id: e,
                                        type: "category",
                                        link: `https://www.themoviedb.org/genre/${e}/tv`,
                                        poster: "",
                                        description: "",
                                        fetcher: this.name
                                    });
                                })) !== null && _j !== void 0 ? _j : [],
                                sources: [],
                                cast: [],
                                fetcher: this.name,
                                networks: [],
                            }));
                        }
                    }
                });
            }
            return returner;
        });
    }
    movie(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var language = (0, lodash_1.get)(options, "language", this.language);
            var response = yield this.requester.get(`https://www.themoviedb.org/movie/${id}?language=${language}`, this.headers());
            var html = response.body;
            if (!html)
                throw new Error("Movie not found");
            if (`${html}`.toLocaleLowerCase().includes("page not found ")) {
                throw new Error("Movie not found");
            }
            var data = this.parseSource(html);
            return movie_1.default.fromObject({
                id: id,
                link: `https://www.themoviedb.org/movie/${id}`,
                title: (0, helpers_1.normalize)(data.title),
                subtitle: (0, helpers_1.normalize)(data.subtitle),
                description: (0, helpers_1.normalize)(data.description),
                duration: (0, helpers_1.parseRuntime)(data.runtime),
                type: types_1.MediaTypes.movie,
                rating: data.rating,
                released: data.release,
                year: (0, helpers_1.getYear)(data.release),
                poster: data.poster,
                background: data.background,
                trailers: data.trailers,
                genders: data.genders,
                sources: [],
                cast: data.cast,
                fetcher: this.name,
                tmdbID: id,
                networks: data.networks,
            });
        });
    }
    series(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var $this = this;
            throw new Error("Method not implemented.");
        });
    }
    serie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var language = "es";
            var resposen = yield this.requester.get(`https://www.themoviedb.org/tv/${id}?language=${language}`, this.headers());
            var body = resposen.body;
            if (!body)
                throw new Error("Serie not found");
            if (`${body}`.toLocaleLowerCase().includes("page not found ")) {
                throw new Error("Serie not found");
            }
            var parsed = this.parseSource(body);
            var link = `https://www.themoviedb.org/tv/${id}`;
            return serie_1.default.fromObject({
                id: id,
                link: link,
                title: parsed.title,
                subtitle: parsed.subtitle,
                description: parsed.description,
                type: types_1.MediaTypes.tv,
                rating: parsed.rating,
                votes: 0,
                released: parsed.release,
                year: (0, helpers_1.getYear)(parsed.release),
                poster: parsed.poster,
                background: parsed.background,
                genders: parsed.genders,
                seasons: [],
                cast: parsed.cast,
                trailers: parsed.trailers,
                fetcher: this.name,
                tmdbID: id,
                networks: parsed.networks,
            });
        });
    }
    serieFull(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var serie = yield this.serie(id);
            var seasons = yield this.seasons(id);
            seasons = yield Promise.all(seasons.map((season) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    var _season = yield this.season(season.id, id);
                    season.episodes = _season.episodes;
                    season.poster = (_a = season.poster) !== null && _a !== void 0 ? _a : _season.poster;
                    return season;
                }
                catch (error) {
                    return season;
                }
            })));
            serie.seasons = seasons;
            return serie;
        });
    }
    seasons(serieID, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var $this = this;
            var language = (0, lodash_1.get)(options, "language", this.language);
            var response = yield this.requester.get(`https://www.themoviedb.org/tv/${serieID}/seasons?language=${language}`, this.headers());
            var html = response.body;
            if (!html)
                throw new Error("Serie not found");
            if (html.indexOf("Page not found") > -1) {
                throw new Error("Serie not found");
            }
            var doc = (0, cheerio_1.load)(html);
            var seasons = [];
            var seasons_list = doc(".season_wrapper");
            seasons_list.each((index, _season) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                const season = doc(_season);
                var link = $this.site + season.find("a").attr("href");
                var season_id = link.split("season/")[1];
                if (season_id.indexOf("?") > -1) {
                    season_id = season_id.split("?")[0];
                }
                var description = (_b = (_a = season.find(".season_overview")) === null || _a === void 0 ? void 0 : _a.text()) === null || _b === void 0 ? void 0 : _b.trim();
                var content = `${(_c = season.find(".content  h4")) === null || _c === void 0 ? void 0 : _c.text()}`.trim();
                var poster = (_d = season.find(".poster")) === null || _d === void 0 ? void 0 : _d.attr("src");
                var released = (_f = (_e = content === null || content === void 0 ? void 0 : content.match(/\d{4}/g)) === null || _e === void 0 ? void 0 : _e[0]) !== null && _f !== void 0 ? _f : "";
                var release_date = "";
                if (description === null || description === void 0 ? void 0 : description.includes("premiere on ")) {
                    var date = new Date(description === null || description === void 0 ? void 0 : description.split("premiere on ")[1]);
                    if ((0, lodash_1.isNumber)(date.getTime())) {
                        release_date = date.toISOString();
                    }
                }
                if (season_id && link)
                    seasons.push(season_1.default.fromObject({
                        id: `${(_g = Number(season_id)) !== null && _g !== void 0 ? _g : season_id}`,
                        link: link,
                        name: season_id == "0" ? "Specials" : `Season ${(_h = Number(season_id)) !== null && _h !== void 0 ? _h : season_id}`,
                        season: (_j = Number(season_id)) !== null && _j !== void 0 ? _j : (index + 1),
                        poster: poster !== null && poster !== void 0 ? poster : "",
                        released: release_date !== null && release_date !== void 0 ? release_date : released,
                        year: (0, helpers_1.getYear)(release_date !== null && release_date !== void 0 ? release_date : released),
                        episodes: [],
                        fetcher: $this.name
                    }));
            });
            return seasons;
        });
    }
    season(id, serieID, options) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            var $this = this;
            var language = (0, lodash_1.get)(options, "language", this.language);
            var response = yield this.requester.get(`${$this.site}/tv/${serieID}/season/${id}?language=${language}`, this.headers());
            var html = response.body;
            if (!html)
                throw new Error("Season not found");
            if (html.indexOf("Page not found") > -1) {
                throw new Error("Season not found");
            }
            var doc = (0, cheerio_1.load)(html);
            var link = `${$this.site}/tv/${serieID}/season/${id}`;
            var name = `${(_a = doc(".title a")) === null || _a === void 0 ? void 0 : _a.text()}`.trim();
            var first_image = (_b = doc(".episode_list .episode .backdrop").attr("src")) !== null && _b !== void 0 ? _b : doc(".poster").attr("src");
            var release_date = (_c = doc(".episode_list .episode .date span").first().text()) !== null && _c !== void 0 ? _c : "";
            const _season = season_1.default.fromObject({
                id: id,
                link: link,
                name: name,
                season: (_d = Number(id)) !== null && _d !== void 0 ? _d : id,
                poster: first_image ? posterToURI(first_image) : "",
                released: release_date,
                episodes: [],
                fetcher: this.name
            });
            var episodes_list = doc(".episode_list .episode");
            episodes_list.each((index, _episode) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                const episode = doc(_episode);
                var link = $this.site + episode.find("a").attr("href");
                var title = `${episode.find(".title a").text()}`.trim();
                var description = (_b = (_a = episode.find(".overview")) === null || _a === void 0 ? void 0 : _a.text()) === null || _b === void 0 ? void 0 : _b.trim();
                var image = episode.find(".backdrop").attr("src");
                var episode_number = (_c = episode.find(".episode_number")) === null || _c === void 0 ? void 0 : _c.text();
                var release_date = (_d = doc(".episode_list .episode .date span").first().text()) !== null && _d !== void 0 ? _d : "";
                var duration = (_e = doc(".episode_list .episode .date span").last().text()) !== null && _e !== void 0 ? _e : "";
                _season.addEpisode(episode_1.default.fromObject({
                    id: link,
                    title: title,
                    description: description,
                    duration: duration,
                    released: release_date,
                    rating: "",
                    votes: 0,
                    episode: (_f = Number(episode_number)) !== null && _f !== void 0 ? _f : episode_number,
                    season: (_g = Number(id)) !== null && _g !== void 0 ? _g : id,
                    link: link,
                    poster: (_h = `${this.site}/${image}`) !== null && _h !== void 0 ? _h : "",
                    servers: [],
                    fetcher: this.name
                }));
            });
            return _season;
        });
    }
    episodes(seasonID, serieID) {
        throw new Error("Method not implemented.");
    }
    episode(id, seasonID, serieID) {
        throw new Error("Method not implemented.");
    }
    genders() {
        return __awaiter(this, void 0, void 0, function* () {
            var response = yield this.requester.get(`${this.site}/tv`, this.headers());
            var html = response.body;
            if (!html)
                throw new Error("no found");
            var returner = [];
            var $ = (0, cheerio_1.load)(html);
            $("#with_genres a").each((index, element) => {
                var _a, _b;
                var a = $(element);
                var id = (_a = a.attr("href")) === null || _a === void 0 ? void 0 : _a.split("with_genres=")[1];
                var name = (_b = a.text()) === null || _b === void 0 ? void 0 : _b.trim();
                var link = `${this.site}/tv/genre/${id}`;
                if (id && name)
                    returner.push(category_1.default.fromObject({
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
        });
    }
    cast() {
        throw new Error("Method not implemented.");
    }
    byType(type, options) {
        throw new Error("Method not implemented.");
    }
    getById(id, type) {
        throw new Error("Method not implemented.");
    }
    top() {
        throw new Error("Method not implemented.");
    }
    topMovies() {
        throw new Error("Method not implemented.");
    }
    topSeries() {
        throw new Error("Method not implemented.");
    }
    home() {
        throw new Error("Method not implemented.");
    }
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
exports.default = TMDBAPI;
