"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importStar(require("lodash"));
var default_provider_1 = __importDefault(require("../default-provider"));
var movie_1 = __importDefault(require("../../models/movie"));
var serie_1 = __importDefault(require("../../models/serie"));
var episode_1 = __importDefault(require("../../models/episode"));
var season_1 = __importDefault(require("../../models/season"));
var cast_1 = __importDefault(require("../../models/cast"));
var category_1 = __importDefault(require("../../models/category"));
var helpers_1 = require("../../utils/helpers");
var source_1 = __importDefault(require("../../models/source"));
var cheerio_1 = require("cheerio");
var types_1 = require("../../types");
var Tekilaz = /** @class */ (function (_super) {
    __extends(Tekilaz, _super);
    function Tekilaz() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "Tekilaz";
        _this.language = "en";
        _this.site = "https://tekilaz.co/";
        _this.hash = null;
        return _this;
    }
    Tekilaz.prototype.urlInfo = function (url) {
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
    };
    Tekilaz.prototype.checkMovePermanent = function (promise) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var $this, body, body, _d, link, origin, result;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        $this = this;
                        if (!promise)
                            return [2 /*return*/, ""];
                        return [4 /*yield*/, promise];
                    case 1:
                        if (!((_a = (_e.sent()).body) !== null && _a !== void 0)) return [3 /*break*/, 2];
                        _d = _a;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, promise];
                    case 3:
                        _d = (_e.sent()).string;
                        _e.label = 4;
                    case 4:
                        body = _d;
                        if (!(typeof body == "string" && body.includes("301 Moved Permanently"))) return [3 /*break*/, 6];
                        if (!body.includes("The document has moved <a href="))
                            return [2 /*return*/, body];
                        link = body.split('The document has moved <a href="')[1].split('">here</a>')[0];
                        origin = (0, helpers_1.getOrigin)(link);
                        if (!origin || !link)
                            return [2 /*return*/, body];
                        $this.setSite(origin);
                        return [4 /*yield*/, ((_b = $this.requester) === null || _b === void 0 ? void 0 : _b.get(link, $this.headers()))];
                    case 5:
                        result = _e.sent();
                        return [2 /*return*/, (_c = result === null || result === void 0 ? void 0 : result.body) !== null && _c !== void 0 ? _c : result === null || result === void 0 ? void 0 : result.string];
                    case 6: return [2 /*return*/, body];
                }
            });
        });
    };
    Tekilaz.prototype.getHash = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var html, hash;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.hash)
                            return [2 /*return*/, this.hash];
                        return [4 /*yield*/, this.checkMovePermanent((_a = this.requester) === null || _a === void 0 ? void 0 : _a.get(this.site, this.headers()))];
                    case 1:
                        html = _b.sent();
                        if (html.indexOf('/_ssgManifest.js') > -1) {
                            hash = html.split('/_ssgManifest.js')[0];
                            hash = hash.substring(hash.lastIndexOf('/') + 1);
                            this.hash = hash;
                            return [2 /*return*/, hash];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    Tekilaz.prototype.parseCollection = function (list) {
        if (list === void 0) { list = []; }
        var $this = this;
        var returner = [];
        for (var index = 0; index < list.length; index++) {
            var ele = $this.parseElement(list[index]);
            returner.push(ele);
        }
        return returner;
    };
    Tekilaz.prototype.parseElement = function (json) {
        var _this = this;
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
        var cast = lodash_1.default.get(json, "cast.acting", lodash_1.default.get(json, "cast", [])).map(function (person) {
            var _a;
            return cast_1.default.fromObject({
                name: person.name,
                id: person.id,
                type: "cast",
                avatar: (_a = person.image) !== null && _a !== void 0 ? _a : "",
                link: "https://www.themoviedb.org/person/".concat(person.id, "?language=es"),
                fetcher: _this.name,
                tmdbID: person.id
            });
        });
        var genres = lodash_1.default.get(json, "genres", []).map(function (genre) {
            var _a, _b;
            return category_1.default.fromObject({
                name: genre.name,
                id: (_a = genre.slug) !== null && _a !== void 0 ? _a : (0, helpers_1.slugify)(genre === null || genre === void 0 ? void 0 : genre.name),
                type: "category",
                link: "".concat(_this.site, "genero/").concat((_b = genre.slug) !== null && _b !== void 0 ? _b : (0, helpers_1.slugify)(genre === null || genre === void 0 ? void 0 : genre.name)),
                poster: "",
                description: "",
                fetcher: _this.name
            });
        });
        var servers = (function () {
            var returner = [];
            var videoMap = lodash_1.default.get(json, "videos", {});
            var _loop_1 = function (lang) {
                videos = videoMap[lang];
                videos.map(function (video) {
                    returner.push(source_1.default.fromObject({
                        name: (0, helpers_1.normalize)("".concat(video.cyberlocker)),
                        url: video.result,
                        type: (0, helpers_1.getTypeByExtension)(video.result),
                        resolution: source_1.default.parseResolution(video.quality),
                        lang: (0, helpers_1.parseLanguage)(lang),
                        from: link,
                        fetcher: _this.name
                    }));
                });
            };
            var videos;
            for (var lang in videoMap) {
                _loop_1(lang);
            }
            return returner;
        })();
        var seasons = lodash_1.default.get(json, "seasons", []).map(function (season, index) {
            var _season = season_1.default.fromObject({
                id: link,
                link: link,
                name: "".concat(title, " - season ").concat(index),
                season: index,
                poster: "",
                released: "",
                episodes: [],
                fetcher: _this.name
            });
            lodash_1.default.get(season, "episodes", []).map(function (episode, episode_number) {
                var tmdbID = lodash_1.default.get(episode, "TMDbId", "");
                var poster = lodash_1.default.get(episode, "image", "");
                var title = lodash_1.default.get(episode, "title", "");
                var released = lodash_1.default.get(episode, "releaseDate", "");
                var episode_link = "".concat($this.site, "episodio/").concat(slug, "-temporada-").concat(lodash_1.default.get(episode, "slug.season", 0), "-episodio-").concat(lodash_1.default.get(episode, "slug.episode", 0));
                _season.addEpisode(episode_1.default.fromObject({
                    id: episode_link,
                    title: title !== null && title !== void 0 ? title : "".concat(title, " ").concat(index, "x").concat(episode_number),
                    description: "",
                    duration: "",
                    released: released,
                    rating: "",
                    votes: 0,
                    episode: episode_number,
                    season: index,
                    link: episode_link,
                    poster: poster !== null && poster !== void 0 ? poster : "",
                    servers: [],
                    fetcher: "",
                    tmdbID: tmdbID
                }));
            });
            return _season;
        });
        var rating = lodash_1.default.get(json, "rate.average", 0);
        var votes = lodash_1.default.get(json, "rate.votes", 0);
        var released = lodash_1.default.get(json, "releaseDate", "");
        var duration = lodash_1.default.get(json, "duration", (0, helpers_1.parseRuntime)(runtime));
        if (lodash_1.default.has(json, "nextEpisode")) {
            var link = "".concat(this.site, "episodio/").concat(slug, "-temporada-").concat(season, "-episodio-").concat(episode);
            return episode_1.default.fromObject({
                id: link,
                title: (0, helpers_1.normalize)(title !== null && title !== void 0 ? title : "".concat(title, " ").concat(season, "x").concat(episode)),
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
                tmdbID: TMDbId
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
                tmdbID: TMDbId
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
            });
        }
    };
    /**
     *
     * @param {String} url
     */
    Tekilaz.prototype.fixUrl = function (url) {
        if (url.startsWith("//")) {
            url = "https:" + url;
        }
        return url;
    };
    Tekilaz.prototype.headers = function (extra) {
        if (extra === void 0) { extra = {}; }
        return __assign({ "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36", "Origin": this.site, "Referer": this.site }, extra);
    };
    /**
     * Verify if the url or id is from this provider
     * @param urlOrID
     * @returns {boolean}
     */
    Tekilaz.prototype.match = function (urlOrID) {
        return urlOrID.includes("tekilaz");
    };
    Tekilaz.prototype.home = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hash, url, result, body, movies, series, episodes, tabTopMovies, tabTopSeries;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getHash()];
                    case 1:
                        hash = _a.sent();
                        url = "".concat(this.site, "/_next/data/").concat(hash, "/es.json");
                        return [4 /*yield*/, this.requester.get(url, this.headers())];
                    case 2:
                        result = _a.sent();
                        body = result.body;
                        if (!body)
                            throw new Error("No response");
                        try {
                            body = JSON.parse(result.body);
                        }
                        catch (error) {
                        }
                        movies = this.parseCollection(lodash_1.default.get(body, "pageProps.tabLastMovies", []));
                        series = this.parseCollection(lodash_1.default.get(body, "pageProps.series", []));
                        episodes = this.parseCollection(lodash_1.default.get(body, "pageProps.episodes", []));
                        tabTopMovies = this.parseCollection(lodash_1.default.get(body, "pageProps.tabTopMovies", []));
                        tabTopSeries = series;
                        return [2 /*return*/, {
                                episodes: episodes,
                                movies: movies,
                                series: series,
                                topMovies: tabTopMovies,
                                topSeries: tabTopSeries
                            }];
                }
            });
        });
    };
    Tekilaz.prototype.byType = function (type, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var $this, isMovie, page, hash, url, repsonse, body;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        $this = this;
                        isMovie = type == types_1.MediaTypes.movie;
                        page = Number(lodash_1.default.get(options, "page", 1));
                        return [4 /*yield*/, this.getHash()];
                    case 1:
                        hash = _b.sent();
                        url = "".concat($this.site, "/_next/data/").concat(hash, "/es/").concat(isMovie ? "peliculas" : 'series', "/page/").concat(page, ".json");
                        return [4 /*yield*/, ((_a = this.requester) === null || _a === void 0 ? void 0 : _a.get(url, this.headers()))];
                    case 2:
                        repsonse = _b.sent();
                        if (!repsonse)
                            return [2 /*return*/, []];
                        body = repsonse.body;
                        try {
                            body = JSON.parse(body);
                        }
                        catch (error) {
                        }
                        return [2 /*return*/, this.parseCollection(lodash_1.default.get(body, "pageProps.movies", []))];
                }
            });
        });
    };
    Tekilaz.prototype.search = function (query, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var hash, url, response, data, items;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getHash()];
                    case 1:
                        hash = _b.sent();
                        url = "".concat(this.site, "/_next/data/").concat(hash, "/es/search.json?q=").concat(query);
                        return [4 /*yield*/, ((_a = this.requester) === null || _a === void 0 ? void 0 : _a.get(url, this.headers()))];
                    case 2:
                        response = _b.sent();
                        if (!response)
                            return [2 /*return*/, []];
                        try {
                            data = response.body;
                            try {
                                data = JSON.parse(data);
                            }
                            catch (error) {
                            }
                            items = this.parseCollection(lodash_1.default.get(data, "pageProps.movies", []));
                            if (items && items.length) {
                                return [2 /*return*/, items];
                            }
                        }
                        catch (error) {
                            console.log("Error: ".concat(error));
                        }
                        return [2 /*return*/, []];
                }
            });
        });
    };
    Tekilaz.prototype.getById = function (idorLink, type) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var $this, hash, info, _type, url, response, data, media, parsed, relates;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        $this = this;
                        if (!idorLink.includes('http')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getHash()];
                    case 1:
                        hash = _b.sent();
                        info = this.urlInfo(idorLink);
                        _type = info.type;
                        url = "";
                        if (_type == types_1.MediaTypes.movie) {
                            url = "".concat($this.site, "/_next/data/").concat(hash, "/es/pelicula/").concat(info.slug, ".json");
                        }
                        else if (info.type == types_1.MediaTypes.tv) {
                            url = "".concat($this.site, "/_next/data/").concat(hash, "/es/serie/").concat(info.slug, ".json?serie=").concat(info.slug);
                        }
                        else {
                            url = "".concat($this.site, "/_next/data/").concat(hash, "/es/episodio/").concat(info.slug, "-temporada-").concat(info.season, "-episodio-").concat(info.episode, ".json");
                        }
                        return [4 /*yield*/, ((_a = this.requester) === null || _a === void 0 ? void 0 : _a.get(url, this.headers({
                                "Referer": this.site
                            })))];
                    case 2:
                        response = _b.sent();
                        if (!response)
                            throw new Error("No found");
                        data = response.body;
                        try {
                            data = JSON.parse(data);
                        }
                        catch (error) {
                        }
                        media = lodash_1.default.get(data, "pageProps.thisMovie", lodash_1.default.get(data, "pageProps.thisSerie", lodash_1.default.get(data, "pageProps.episode", null)));
                        if (!media)
                            throw new Error("No found");
                        parsed = this.parseElement(media);
                        relates = this.parseCollection(lodash_1.default.get(data, "pageProps.relatedMovies", lodash_1.default.get(data, "pageProps.relatedSeries", [])));
                        parsed.relates = relates.filter(function (item) { return item instanceof movie_1.default || item instanceof serie_1.default; });
                        return [2 /*return*/, parsed];
                    case 3: throw new Error("Not implemented");
                }
            });
        });
    };
    Tekilaz.prototype.top = function () {
        return __awaiter(this, void 0, void 0, function () {
            var home;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.home()];
                    case 1:
                        home = _a.sent();
                        return [2 /*return*/, __spreadArray(__spreadArray([], home.movies, true), home.series, true)];
                }
            });
        });
    };
    Tekilaz.prototype.topMovies = function () {
        return this.top().then(function (items) {
            return items.filter(function (item) { return item instanceof movie_1.default; });
        });
    };
    Tekilaz.prototype.topSeries = function () {
        return this.top().then(function (items) {
            return items.filter(function (item) { return item instanceof serie_1.default; });
        });
    };
    Tekilaz.prototype.movies = function (options) {
        return this.byType(types_1.MediaTypes.movie.toString(), options);
    };
    Tekilaz.prototype.movie = function (id) {
        return this.getById(id, types_1.MediaTypes.movie);
    };
    Tekilaz.prototype.series = function (options) {
        return this.byType(types_1.MediaTypes.tv.toString(), options);
    };
    Tekilaz.prototype.serie = function (id) {
        return this.getById(id, types_1.MediaTypes.tv);
    };
    Tekilaz.prototype.seasons = function (serieID) {
        if (!serieID)
            throw new Error("serieID is required");
        return this.getById(serieID).then(function (serie) {
            return serie.seasons;
        });
    };
    Tekilaz.prototype.season = function (id, serieID) {
        if (!serieID)
            throw new Error("serieID is required");
        return this.seasons(serieID).then(function (seasons) {
            return seasons.find(function (season) { return "".concat(season.season) == "".concat(id); });
        });
    };
    Tekilaz.prototype.episodes = function (seasonID, serieID) {
        if (!serieID)
            throw new Error("serieID is required");
        if (!seasonID)
            throw new Error("seasonID is required");
        return this.season(seasonID, serieID).then(function (season) {
            return season.episodes;
        });
    };
    Tekilaz.prototype.episode = function (id, seasonID, serieID) {
        if (!serieID)
            throw new Error("serieID is required");
        if (!seasonID)
            throw new Error("seasonID is required");
        return this.episodes(seasonID, serieID).then(function (episodes) {
            return episodes.find(function (episode) { return "".concat(episode.episode) == "".concat(id); });
        });
    };
    Tekilaz.prototype.genders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, body, $, returner, list;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requester.get(this.site)];
                    case 1:
                        response = _a.sent();
                        body = response.body;
                        if (!body)
                            throw new Error("No body");
                        $ = (0, cheerio_1.load)(body);
                        returner = [];
                        list = $('a[href*=genero]');
                        if (list.length > 0) {
                            list.each(function (index, element) {
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
                                        link: "".concat(_this.site, "/").concat(link),
                                        poster: "",
                                        description: "",
                                        fetcher: _this.name
                                    }));
                            });
                        }
                        return [2 /*return*/, returner];
                }
            });
        });
    };
    Tekilaz.prototype.cast = function () {
        throw new Error("Method not implemented.");
    };
    return Tekilaz;
}(default_provider_1.default));
exports.default = Tekilaz;
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
