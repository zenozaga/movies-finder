"use strict";
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
const lodash_1 = require("lodash");
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
class CuevanaChat extends default_provider_1.default {
    constructor() {
        super(...arguments);
        this.name = "CuevanaChat";
        this.site = "https://cuevana.biz/";
        this.language = "es";
    }
    match(urlOrID) {
        return urlOrID.includes("//cuevana5") || urlOrID.includes("//cuevana");
    }
    /**
     * Headers for the request
     * @returns {{}}
     */
    headers(extra = {}) {
        var _a;
        return Object.assign({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
            "Origin": (_a = (0, helpers_1.getOrigin)(this.site)) !== null && _a !== void 0 ? _a : this.site,
            //  "Host": getHost(this.site),
            "Referer": this.site
        }, extra);
    }
    /**
     * Check if the response is a 301 Moved Permanently
     * @param promise
     * @returns
     */
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
    /**
     *
     * @param {String} html
     * @returns {Array<Movie|Serie>}
     */
    parseCollectionHTML(html, selector, type) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        var $ = (0, cheerio_1.load)(html);
        var list = $(selector !== null && selector !== void 0 ? selector : "main .MovieList > li > .TPost");
        var returner = [];
        for (let index = 0; index < list.length; index++) {
            const element = $(list[index]);
            var link = this.fixUrl((_a = element.find("a").attr("href")) !== null && _a !== void 0 ? _a : "");
            var isMovie = (link === null || link === void 0 ? void 0 : link.includes("/serie/")) == false;
            if (type && types_1.MediaTypes.movie == type && isMovie == false)
                continue;
            if (type && types_1.MediaTypes.tv == type && isMovie == true)
                continue;
            var image = (_b = element.find("[srcSet]")) === null || _b === void 0 ? void 0 : _b.attr("srcset");
            if (!image)
                image = (_c = element.find(".wp-post-image")) === null || _c === void 0 ? void 0 : _c.attr("src");
            var year = (_f = (_e = (_d = element.find(".Year")) === null || _d === void 0 ? void 0 : _d.text()) === null || _e === void 0 ? void 0 : _e.trim()) !== null && _f !== void 0 ? _f : "";
            var title = (_h = (_g = element.find(".Title:eq(0)")) === null || _g === void 0 ? void 0 : _g.text()) === null || _h === void 0 ? void 0 : _h.trim();
            var poster = (_j = image === null || image === void 0 ? void 0 : image.replace(/(\-[0-9]{3}x([0-9]{3}))/g, "")) !== null && _j !== void 0 ? _j : "";
            var description = (_l = (_k = element.find(".Description")) === null || _k === void 0 ? void 0 : _k.text()) === null || _l === void 0 ? void 0 : _l.trim();
            var year = (_p = (_o = (_m = element.find(".Year")) === null || _m === void 0 ? void 0 : _m.text()) === null || _o === void 0 ? void 0 : _o.trim()) !== null && _p !== void 0 ? _p : "";
            var rating = (_r = (_q = element.find(".Info .Vote")) === null || _q === void 0 ? void 0 : _q.text()) === null || _r === void 0 ? void 0 : _r.trim();
            var release = (_t = (_s = element.find(".Info .Date")) === null || _s === void 0 ? void 0 : _s.text()) === null || _t === void 0 ? void 0 : _t.trim();
            var duration = (0, helpers_1.parseRuntime)((_v = (_u = element.find(".Info .Time")) === null || _u === void 0 ? void 0 : _u.text()) === null || _v === void 0 ? void 0 : _v.trim());
            var poster = image ? this.fixUrl(image) : "";
            var background = poster;
            if (image === null || image === void 0 ? void 0 : image.includes("url=")) {
                image = this.fixImageUrl(image);
                var uri = new URL(image);
                image = (_w = uri.searchParams.get("url")) !== null && _w !== void 0 ? _w : image;
                poster = image;
                background = image;
            }
            if (!isMovie) {
                returner.push(serie_1.default.fromObject({
                    id: link,
                    link: link,
                    title: (0, helpers_1.normalize)(title),
                    description: (0, helpers_1.normalize)(description),
                    poster: poster,
                    background: background,
                    rating: rating,
                    released: (0, helpers_1.validDate)(release) ? (0, helpers_1.tryDate)(release) : (0, helpers_1.tryDate)(year),
                    fetcher: this.name,
                    votes: 0,
                    seasons: [],
                    cast: [],
                    genders: [],
                    subtitle: "",
                    year: year,
                    trailers: [],
                    type: types_1.MediaTypes.tv
                }));
            }
            else {
                returner.push(movie_1.default.fromObject({
                    id: link,
                    title: (0, helpers_1.normalize)(title),
                    subtitle: (0, helpers_1.normalize)(title),
                    description: (0, helpers_1.normalize)(description),
                    duration: duration,
                    type: types_1.MediaTypes.movie,
                    rating: rating,
                    released: release,
                    poster: this.fixUrl(poster),
                    background: this.fixUrl(background),
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
    parseMovieHTML(html, type = "") {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        var $this = this;
        var $ = (0, cheerio_1.load)(html);
        var __NEXT_DATA__ = $('script#__NEXT_DATA__').html();
        var id = (_a = $("#top-single")) === null || _a === void 0 ? void 0 : _a.attr("data-id");
        var poster = this.fixImageUrl(`${(_b = $(".TPost .Image img[srcset]")) === null || _b === void 0 ? void 0 : _b.attr('srcset')}`);
        var background = this.fixImageUrl(`${(_c = $(".backdrop > .Image img[srcset]")) === null || _c === void 0 ? void 0 : _c.attr("srcset")}`);
        var title = (_e = (_d = $(".TPost .Title:eq(0)")) === null || _d === void 0 ? void 0 : _d.text()) === null || _e === void 0 ? void 0 : _e.trim();
        var subtitle = (_g = (_f = $(".TPost .SubTitle")) === null || _f === void 0 ? void 0 : _f.text()) === null || _g === void 0 ? void 0 : _g.trim();
        var description = (_j = (_h = $(".TPost .Description")) === null || _h === void 0 ? void 0 : _h.text()) === null || _j === void 0 ? void 0 : _j.trim();
        var release = (_l = (_k = $(".TPost .meta")) === null || _k === void 0 ? void 0 : _k.text()) === null || _l === void 0 ? void 0 : _l.trim();
        var rating = (_o = (_m = $("#TPVotes")) === null || _m === void 0 ? void 0 : _m.attr("data-percent")) === null || _o === void 0 ? void 0 : _o.trim();
        var canonical = (_q = (_p = $("link[rel='canonical']")) === null || _p === void 0 ? void 0 : _p.attr("href")) !== null && _q !== void 0 ? _q : "";
        var _season_episode = canonical === null || canonical === void 0 ? void 0 : canonical.match(/\-([0-9].*)x([0-9].*)/);
        var year = (_s = (_r = `${release}`.match(/([0-9]{4})/g)) === null || _r === void 0 ? void 0 : _r[0]) !== null && _s !== void 0 ? _s : release;
        var runtime = (0, helpers_1.parseRuntime)(release);
        type = canonical.includes("episodio") ? "episode" : type;
        var cast = [];
        var trailers = [];
        var genres = [];
        var seasons = [];
        var servers = [];
        var relates = [];
        if (poster === null || poster === void 0 ? void 0 : poster.includes('tmdb.org')) {
            poster = poster.replace(/\/p\/(.*?)\//g, "/p/original/");
        }
        if (background === null || background === void 0 ? void 0 : background.includes('tmdb.org')) {
            background = background.replace(/\/p\/(.*?)\//g, "/p/original/");
        }
        if (poster)
            poster = this.fixUrl(poster);
        if ($("#OptY iframe")) {
            if ((_t = $("#OptY iframe")) === null || _t === void 0 ? void 0 : _t.attr("data-src"))
                trailers.push(`${(_u = $("#OptY iframe")) === null || _u === void 0 ? void 0 : _u.attr("data-src")}`);
        }
        $("[data-embed]").each((index, ele) => {
            var _a;
            var url = (0, helpers_1.tryAtob)((_a = $(ele).attr("data-embed")) !== null && _a !== void 0 ? _a : "");
            var name = `${$(ele).find(`span:eq(0)`).text()}`.trim();
            if (url)
                servers.push(source_1.default.fromObject({
                    name: name !== null && name !== void 0 ? name : "",
                    url: this.fixUrl(url),
                    type: (0, helpers_1.getTypeByExtension)(url),
                    resolution: source_1.default.parseResolution(name !== null && name !== void 0 ? name : ""),
                    lang: (0, helpers_1.parseLanguage)(name !== null && name !== void 0 ? name : ""),
                    from: canonical !== null && canonical !== void 0 ? canonical : id,
                    fetcher: this.name
                }));
        });
        $(".InfoList a[href*='category']").each((index, ele) => {
            var _a, _b, _c, _d;
            var element = $(ele);
            var id = (_b = (_a = element.attr("href")) === null || _a === void 0 ? void 0 : _a.split("category/")[1]) !== null && _b !== void 0 ? _b : "";
            var link = `${this.site}/category/${id}`;
            var name = (_d = (_c = element.text()) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : "";
            genres.push(category_1.default.fromObject({
                id: id,
                name: name,
                link: link,
                type: "category",
                poster: "",
                description: "",
                fetcher: this.name
            }));
        });
        $(".loadactor a").each((index, ele) => {
            var _a, _b, _c, _d, _e;
            var element = $(ele);
            var name = (_b = (_a = element.text()) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "";
            var link = (_d = (_c = element.attr("href")) === null || _c === void 0 ? void 0 : _c.replace("cast_tv", "actor")) !== null && _d !== void 0 ? _d : "";
            var id = (_e = link.split("actor/")[1]) !== null && _e !== void 0 ? _e : "";
            cast.push(cast_1.default.fromObject({
                name: name,
                id: id,
                type: "cast",
                avatar: "",
                link: link,
                fetcher: this.name
            }));
        });
        $("#select-season option").each((seasonIndex, ele) => {
            var _a, _b, _c, _d;
            var element = $(ele);
            var id = (_b = (_a = `${element.val()}`) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "";
            var name = (_c = element.text()) === null || _c === void 0 ? void 0 : _c.trim();
            var season_number = element.val();
            season_number = (_d = parseInt(season_number)) !== null && _d !== void 0 ? _d : (seasonIndex + 1);
            var season = season_1.default.fromObject({
                id: id,
                link: canonical !== null && canonical !== void 0 ? canonical : id,
                name: name !== null && name !== void 0 ? name : "",
                season: season_number,
                poster: "",
                released: "",
                episodes: [],
                fetcher: this.name
            });
            $(`#season-${id}.all-episodes li`).each((index, eps) => {
                var _a, _b, _c, _d, _e, _f;
                var episode = $(eps);
                var link = (_b = (_a = episode.find("a")) === null || _a === void 0 ? void 0 : _a.attr("href")) !== null && _b !== void 0 ? _b : "";
                var id = (_c = link.match(/post\-([0-9]*)\s/)) === null || _c === void 0 ? void 0 : _c[1];
                var image = (_d = episode.find("img[data-src]")) === null || _d === void 0 ? void 0 : _d.attr("data-src");
                var title = (_f = (_e = episode.find(".Title")) === null || _e === void 0 ? void 0 : _e.text()) === null || _f === void 0 ? void 0 : _f.trim();
                if (`${image}`.includes('tmdb.org')) {
                    image = image.replace(/\/p\/(.*?)\//g, "/p/original/");
                }
                season.addEpisode(episode_1.default.fromObject({
                    id: link !== null && link !== void 0 ? link : id,
                    title: title !== null && title !== void 0 ? title : "",
                    description: description,
                    duration: runtime,
                    released: release,
                    rating: rating !== null && rating !== void 0 ? rating : "",
                    votes: 0,
                    episode: index + 1,
                    season: season_number,
                    link: this.fixUrl(link),
                    poster: image ? this.fixUrl(image) : "",
                    servers: [],
                    fetcher: this.name
                }));
            });
            seasons.push(season);
        });
        var _relates = this.parseCollectionHTML(html, ".MovieList.Rows > li > .post");
        if (_relates.length > 0) {
            relates = relates.concat([
                ..._relates
            ]);
        }
        if (type == "tv") {
            return serie_1.default.fromObject({
                id: canonical !== null && canonical !== void 0 ? canonical : id,
                link: canonical !== null && canonical !== void 0 ? canonical : id,
                title: title,
                subtitle: subtitle,
                description: description,
                type: types_1.MediaTypes.movie,
                rating: rating !== null && rating !== void 0 ? rating : "",
                votes: 0,
                released: (0, helpers_1.validDate)(release) ? (0, helpers_1.tryDate)(release) : (0, helpers_1.tryDate)(year),
                poster: poster ? this.fixUrl(poster) : "",
                background: background ? this.fixUrl(background) : "",
                genders: genres,
                seasons: seasons,
                cast: cast,
                trailers: trailers,
                year: year,
                fetcher: this.name,
                relates: relates !== null && relates !== void 0 ? relates : []
            });
        }
        else if (type == "episode") {
            return episode_1.default.fromObject({
                id: canonical !== null && canonical !== void 0 ? canonical : id,
                title: title,
                description: description,
                duration: runtime,
                released: (0, helpers_1.validDate)(release) ? (0, helpers_1.tryDate)(release) : (0, helpers_1.tryDate)(year),
                rating: rating !== null && rating !== void 0 ? rating : "",
                votes: 0,
                episode: Number(_season_episode ? _season_episode[2] : 0),
                season: Number(_season_episode ? _season_episode[1] : 0),
                link: canonical !== null && canonical !== void 0 ? canonical : id,
                poster: poster ? this.fixUrl(poster) : "",
                servers: servers,
                fetcher: this.name,
                relates: relates !== null && relates !== void 0 ? relates : []
            });
        }
        else {
            return movie_1.default.fromObject({
                id: canonical !== null && canonical !== void 0 ? canonical : id,
                link: canonical !== null && canonical !== void 0 ? canonical : id,
                title: title,
                subtitle: subtitle,
                description: description,
                duration: runtime,
                type: types_1.MediaTypes.movie,
                rating: rating !== null && rating !== void 0 ? rating : "",
                released: (0, helpers_1.validDate)(release) ? (0, helpers_1.tryDate)(release) : (0, helpers_1.tryDate)(year),
                poster: poster ? this.fixUrl(poster) : "",
                background: background ? this.fixUrl(background) : "",
                trailers: trailers,
                genders: genres,
                sources: servers,
                year: year,
                cast: cast,
                fetcher: this.name,
                relates: relates
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
        if (url.startsWith("/")) {
            url = this.site + url.substring(1);
        }
        return url;
    }
    fixImageUrl(url) {
        var _a;
        if (!url || !url.includes("url="))
            return url;
        url = this.fixUrl(url);
        var uri = new URL(url);
        return (_a = uri.searchParams.get("url")) !== null && _a !== void 0 ? _a : url;
    }
    byType(type, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            var url = this.site;
            var isMovie = !(type == "tv" || type == "serie" || type == "series");
            if (!isMovie) {
                url = `${this.site}series`;
            }
            else {
                url = `${this.site}peliculas`;
            }
            var page = (0, lodash_1.get)(options, "page", 1);
            var repsonse = yield this.requester.get(`${url}/page/${page}`, this.headers());
            return this.parseCollectionHTML((_a = repsonse.body) !== null && _a !== void 0 ? _a : repsonse, undefined, type);
        });
    }
    search(query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${this.site}/?s=${encodeURIComponent(query)}`;
            var response = yield this.requester.get(url, this.headers());
            var body = response.body;
            if (!body)
                throw new Error("No found results");
            var list = this.parseCollectionHTML(body);
            if (list && list.length > 0) {
                return list;
            }
            return [];
        });
    }
    getById(idorLink, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (idorLink.includes("/serie/")) {
                type = "tv";
            }
            else {
                type = type !== null && type !== void 0 ? type : "movie";
            }
            if (idorLink.includes('http')) {
                var response = yield this.requester.get(idorLink, this.headers({ "Referer": this.site }));
                var html = response.body;
                var data = this.parseMovieHTML(html, type);
                if (data)
                    data.link = idorLink;
                return data;
            }
            ;
            throw new Error("Not found");
        });
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
        return __awaiter(this, void 0, void 0, function* () {
            var response = yield this.requester.get(`${this.site}`, this.headers());
            var body = response.body;
            if (!body)
                throw new Error("No found results");
            var episodes = this.parseCollectionHTML(body, ".episodes .post");
            var series = this.parseCollectionHTML(body, ".series_listado .TPost");
            var movies = this.parseCollectionHTML(body, ".MovieList.Rows .post");
            var topSeries = this.parseCollectionHTML(body, "#aa-series .TPost");
            var topMovies = this.parseCollectionHTML(body, ".MovieList.top .TPost");
            return {
                series: series,
                movies: movies,
                episodes: episodes,
                topMovies: topMovies,
                topSeries: topSeries,
            };
        });
    }
    movies(options) {
        return this.byType("movie", options);
    }
    movie(id, options) {
        return this.getById(id, "movie");
    }
    series(options) {
        return this.byType("tv", options);
    }
    serie(id, options) {
        return this.getById(id, "tv");
    }
    seasons(serieID, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!serieID)
                throw new Error("serieID is required");
            var serie = yield this.getById(serieID, "tv");
            if (serie instanceof serie_1.default)
                return serie.seasons;
            return [];
        });
    }
    season(id, serieID, options) {
        return this.seasons(serieID, options).then(seasons => {
            var season = seasons.find(s => `${s.id}` == `${id}`);
            if (season)
                return season;
            throw new Error("Not found");
        });
    }
    episodes(seasonID, serieID, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!serieID)
                throw new Error("serieID is required");
            if (!seasonID)
                throw new Error("seasonID is required");
            var serie = yield this.season(seasonID, serieID, options);
            if (serie instanceof serie_1.default)
                return serie.episodes;
            return [];
        });
    }
    episode(id, seasonID, serieID, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var episode = this.getById(id, "episode");
            return episode;
        });
    }
    genders() {
        return __awaiter(this, void 0, void 0, function* () {
            var response = yield this.requester.get(`${this.site}/inicio`, this.headers());
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
    cast(options) {
        throw new Error("Method not implemented.");
    }
    sections() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            var home = yield this.home();
            var returner = [];
            if (((_a = home.topMovies) === null || _a === void 0 ? void 0 : _a.length) || ((_b = home.topSeries) === null || _b === void 0 ? void 0 : _b.length))
                returner.push({
                    title: "Top de Hoy",
                    items: [...((_c = home.topMovies) !== null && _c !== void 0 ? _c : []), ...((_d = home.topSeries) !== null && _d !== void 0 ? _d : [])],
                    type: "poster",
                });
            if (home.episodes && home.episodes.length)
                returner.push({
                    title: "Ultimos episodios",
                    items: home.episodes,
                    type: "thumb",
                });
            if (home.movies && home.movies.length)
                returner.push({
                    title: "Peliculas",
                    items: home.movies,
                    type: "poster",
                });
            if (home.series && home.series.length)
                returner.push({
                    title: "Series",
                    items: home.series,
                    type: "poster",
                });
            if (home.topMovies && home.topMovies.length)
                returner.push({
                    title: "Peliculas de hoy",
                    items: home.topMovies,
                    type: "poster",
                });
            if (home.topSeries && home.topSeries.length)
                returner.push({
                    title: "Series de hoy",
                    items: home.topSeries,
                    type: "poster",
                });
            return returner;
        });
    }
}
exports.default = CuevanaChat;
