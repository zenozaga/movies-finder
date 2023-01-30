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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = require("cheerio");
var lodash_1 = __importStar(require("lodash"));
var cast_1 = __importDefault(require("../models/cast"));
var category_1 = __importDefault(require("../models/category"));
var episode_1 = __importDefault(require("../models/episode"));
var movie_1 = __importDefault(require("../models/movie"));
var season_1 = __importDefault(require("../models/season"));
var serie_1 = __importDefault(require("../models/serie"));
var default_provider_1 = __importDefault(require("../providers/default-provider"));
var types_1 = require("../types");
var helpers_1 = require("../utils/helpers");
function posterToURI(poster) {
    return "https://image.tmdb.org/t/p/original".concat(poster);
}
var Genders = {
    list: function () {
        return [{ "id": "28", "name": "Action", "link": "https://www.themoviedb.org/genre/28/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "12", "name": "Adventure", "link": "https://www.themoviedb.org/genre/12/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "16", "name": "Animation", "link": "https://www.themoviedb.org/genre/16/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "35", "name": "Comedy", "link": "https://www.themoviedb.org/genre/35/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "80", "name": "Crime", "link": "https://www.themoviedb.org/genre/80/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "99", "name": "Documentary", "link": "https://www.themoviedb.org/genre/99/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "18", "name": "Drama", "link": "https://www.themoviedb.org/genre/18/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10751", "name": "Family", "link": "https://www.themoviedb.org/genre/10751/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "14", "name": "Fantasy", "link": "https://www.themoviedb.org/genre/14/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "36", "name": "History", "link": "https://www.themoviedb.org/genre/36/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "27", "name": "Horror", "link": "https://www.themoviedb.org/genre/27/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10402", "name": "Music", "link": "https://www.themoviedb.org/genre/10402/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "9648", "name": "Mystery", "link": "https://www.themoviedb.org/genre/9648/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10749", "name": "Romance", "link": "https://www.themoviedb.org/genre/10749/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "878", "name": "Science Fiction", "link": "https://www.themoviedb.org/genre/878/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10770", "name": "TV Movie", "link": "https://www.themoviedb.org/genre/10770/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "53", "name": "Thriller", "link": "https://www.themoviedb.org/genre/53/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10752", "name": "War", "link": "https://www.themoviedb.org/genre/10752/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "37", "name": "Western", "link": "https://www.themoviedb.org/genre/37/movie", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10759", "name": "Action & Adventure", "link": "https://www.themoviedb.org/genre/10759/tv", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10762", "name": "Kids", "link": "https://www.themoviedb.org/genre/10762/tv", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10763", "name": "News", "link": "https://www.themoviedb.org/genre/10763/tv", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10764", "name": "Reality", "link": "https://www.themoviedb.org/genre/10764/tv", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10765", "name": "Sci-Fi & Fantasy", "link": "https://www.themoviedb.org/genre/10765/tv", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10766", "name": "Soap", "link": "https://www.themoviedb.org/genre/10766/tv", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10767", "name": "Talk", "link": "https://www.themoviedb.org/genre/10767/tv", "fetcher": "", "type": "category", "poster": "", "description": "" }, { "id": "10768", "name": "War & Politics", "link": "https://www.themoviedb.org/genre/10768/tv", "fetcher": "", "type": "category", "poster": "", "description": "" }]
            .map(function (e) { return category_1.default.fromObject({
            name: e.name,
            id: "".concat(e.id),
            type: "category",
            link: e.link,
            poster: "",
            description: "",
            fetcher: "tmdb"
        }); });
    },
    byId: function (id) {
        return Genders.list().find(function (e) { return e.id == "".concat(id); });
    }
};
var TMDBAPI = /** @class */ (function (_super) {
    __extends(TMDBAPI, _super);
    function TMDBAPI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "TMDB";
        _this.site = "https://www.themoviedb.org";
        _this.language = "es";
        return _this;
    }
    /**
     *  Headers for the requests
     */
    TMDBAPI.prototype.headers = function () {
        return {
            "Referer": "https://www.themoviedb.org/tv/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
            "Host": "www.themoviedb.org",
            "Origin": "https://www.themoviedb.org"
        };
    };
    TMDBAPI.prototype.parseSource = function (html) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
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
        };
        data.title = (_b = (_a = doc(".title.ott_true h2 a")) === null || _a === void 0 ? void 0 : _a.text()) === null || _b === void 0 ? void 0 : _b.trim();
        data.subtitle = data.title;
        data.description = (_d = (_c = doc(".overview")) === null || _c === void 0 ? void 0 : _c.text()) === null || _d === void 0 ? void 0 : _d.trim();
        data.runtime = (_f = (_e = doc(".runtime")) === null || _e === void 0 ? void 0 : _e.text()) === null || _f === void 0 ? void 0 : _f.trim();
        data.poster = (_h = (_g = doc("#media_scroller .poster img")) === null || _g === void 0 ? void 0 : _g.attr("src")) !== null && _h !== void 0 ? _h : "";
        data.background = (_k = (_j = doc("#media_scroller .backdrop img")) === null || _j === void 0 ? void 0 : _j.attr("src")) !== null && _k !== void 0 ? _k : "";
        if (data.poster)
            data.poster = "".concat($this.site).concat(data.poster);
        if (data.background)
            data.background = "".concat($this.site).concat(data.background);
        data.rating = (_m = (_l = doc("[data-percent]")) === null || _l === void 0 ? void 0 : _l.attr("data-percent")) !== null && _m !== void 0 ? _m : "";
        data.release = (_q = (_p = (_o = doc(".release")) === null || _o === void 0 ? void 0 : _o.html()) === null || _p === void 0 ? void 0 : _p.trim()) !== null && _q !== void 0 ? _q : "";
        var genres = doc(".genres a");
        genres.each(function (index, ele) {
            var a = doc(ele);
            var link = $this.site + "".concat(a.attr("href"));
            var name = "".concat(a.html());
            var id = link.substring(link.indexOf("/genre/") + "/genre/".length, link.indexOf("/movie"));
            if (link && name && id) {
                data.genders.push(category_1.default.fromObject({
                    name: name,
                    id: id,
                    type: "category",
                    link: link,
                    poster: "",
                    description: "",
                    fetcher: _this.name
                }));
            }
        });
        var trailer = doc('[data-site="YouTube"]');
        if (trailer.length && trailer.attr("data-id")) {
            data.trailers.push("https://www.youtube.com/watch?v=" + trailer.attr("data-id"));
        }
        var cast_scroller = doc("#cast_scroller .card");
        if (cast_scroller && cast_scroller.length) {
            cast_scroller.each(function (index, _card) {
                var _a, _b;
                var card = doc(_card);
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
                        avatar: "".concat(_this.site).concat(img),
                        link: link,
                        fetcher: _this.name
                    }));
                }
            });
        }
        return data;
    };
    TMDBAPI.prototype.movies = function (options) {
        throw new Error("Method not implemented.");
    };
    TMDBAPI.prototype.search = function (query, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var $this, language, returner, response, body, result;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        $this = this;
                        language = (0, lodash_1.get)(options, "language", this.language);
                        returner = [];
                        return [4 /*yield*/, $this.requester.get("https://www.themoviedb.org/search/trending?language=".concat(language, "&query=") + encodeURIComponent(query), $this.headers())];
                    case 1:
                        response = _b.sent();
                        body = response.body;
                        if (!body)
                            throw new Error("Not found");
                        try {
                            body = JSON.parse(body);
                        }
                        catch (error) {
                        }
                        result = (_a = body.results) !== null && _a !== void 0 ? _a : body;
                        if (result instanceof Array) {
                            result.forEach(function (data) {
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                                if (data instanceof Object) {
                                    if (data.media_type == "tv") {
                                        returner.push(movie_1.default.fromObject({
                                            id: data.id,
                                            link: "https://www.themoviedb.org/tv/".concat(data.id),
                                            title: (_a = data.name) !== null && _a !== void 0 ? _a : data.original_name,
                                            subtitle: (_b = data.original_name) !== null && _b !== void 0 ? _b : data.name,
                                            description: (0, helpers_1.normalize)(data.overview),
                                            duration: "0h 0m",
                                            type: types_1.MediaTypes.movie,
                                            rating: "".concat(data.vote_average),
                                            released: data.first_air_date,
                                            year: (0, helpers_1.getYear)((_c = data.first_air_date) !== null && _c !== void 0 ? _c : data.release_date),
                                            poster: posterToURI(data.poster_path),
                                            background: posterToURI(data.backdrop_path),
                                            trailers: [],
                                            genders: (_d = lodash_1.default.get(data, "genre_ids", []).map(function (e) {
                                                var _a;
                                                return (_a = Genders.byId(e)) !== null && _a !== void 0 ? _a : category_1.default.fromObject({
                                                    name: "",
                                                    id: e,
                                                    type: "category",
                                                    link: "https://www.themoviedb.org/genre/".concat(e, "/tv"),
                                                    poster: "",
                                                    description: "",
                                                    fetcher: _this.name
                                                });
                                            })) !== null && _d !== void 0 ? _d : [],
                                            sources: [],
                                            cast: [],
                                            fetcher: _this.name,
                                            tmdbID: data.id
                                        }));
                                    }
                                    else {
                                        returner.push(movie_1.default.fromObject({
                                            id: data.id,
                                            link: "https://www.themoviedb.org/movie/".concat(data.id),
                                            title: (0, helpers_1.normalize)((_e = data.title) !== null && _e !== void 0 ? _e : data.original_title),
                                            subtitle: (0, helpers_1.normalize)((_f = data.original_title) !== null && _f !== void 0 ? _f : data.title),
                                            description: (0, helpers_1.normalize)(data.overview),
                                            duration: "0h 0m",
                                            type: types_1.MediaTypes.movie,
                                            rating: "".concat(data.vote_average),
                                            released: (_g = data.release_date) !== null && _g !== void 0 ? _g : data.first_air_date,
                                            year: (0, helpers_1.getYear)((_h = data.first_air_date) !== null && _h !== void 0 ? _h : data.release_date),
                                            poster: posterToURI(data.poster_path),
                                            background: posterToURI(data.backdrop_path),
                                            trailers: [],
                                            genders: (_j = lodash_1.default.get(data, "genre_ids", []).map(function (e) {
                                                var _a;
                                                return (_a = Genders.byId(e)) !== null && _a !== void 0 ? _a : category_1.default.fromObject({
                                                    name: "",
                                                    id: e,
                                                    type: "category",
                                                    link: "https://www.themoviedb.org/genre/".concat(e, "/tv"),
                                                    poster: "",
                                                    description: "",
                                                    fetcher: _this.name
                                                });
                                            })) !== null && _j !== void 0 ? _j : [],
                                            sources: [],
                                            cast: [],
                                            fetcher: _this.name
                                        }));
                                    }
                                }
                            });
                        }
                        return [2 /*return*/, returner];
                }
            });
        });
    };
    TMDBAPI.prototype.movie = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var language, response, html, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        language = (0, lodash_1.get)(options, "language", this.language);
                        return [4 /*yield*/, this.requester.get("https://www.themoviedb.org/movie/".concat(id, "?language=").concat(language), this.headers())];
                    case 1:
                        response = _a.sent();
                        html = response.body;
                        if (!html)
                            throw new Error("Movie not found");
                        if ("".concat(html).toLocaleLowerCase().includes("page not found ")) {
                            throw new Error("Movie not found");
                        }
                        data = this.parseSource(html);
                        return [2 /*return*/, movie_1.default.fromObject({
                                id: id,
                                link: "https://www.themoviedb.org/movie/".concat(id),
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
                                tmdbID: id
                            })];
                }
            });
        });
    };
    TMDBAPI.prototype.series = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var $this;
            return __generator(this, function (_a) {
                $this = this;
                throw new Error("Method not implemented.");
            });
        });
    };
    TMDBAPI.prototype.serie = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var language, resposen, body, parsed, link;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        language = "es";
                        return [4 /*yield*/, this.requester.get("https://www.themoviedb.org/tv/".concat(id, "?language=").concat(language), this.headers())];
                    case 1:
                        resposen = _a.sent();
                        body = resposen.body;
                        if (!body)
                            throw new Error("Serie not found");
                        if ("".concat(body).toLocaleLowerCase().includes("page not found ")) {
                            throw new Error("Serie not found");
                        }
                        parsed = this.parseSource(body);
                        link = "https://www.themoviedb.org/tv/".concat(id);
                        return [2 /*return*/, serie_1.default.fromObject({
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
                                fetcher: this.name
                            })];
                }
            });
        });
    };
    TMDBAPI.prototype.serieFull = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var serie, seasons;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.serie(id)];
                    case 1:
                        serie = _a.sent();
                        return [4 /*yield*/, this.seasons(id)];
                    case 2:
                        seasons = _a.sent();
                        return [4 /*yield*/, Promise.all(seasons.map(function (season) { return __awaiter(_this, void 0, void 0, function () {
                                var _season, error_1;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _b.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, this.season(season.id, id)];
                                        case 1:
                                            _season = _b.sent();
                                            season.episodes = _season.episodes;
                                            season.poster = (_a = season.poster) !== null && _a !== void 0 ? _a : _season.poster;
                                            return [2 /*return*/, season];
                                        case 2:
                                            error_1 = _b.sent();
                                            return [2 /*return*/, season];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 3:
                        seasons = _a.sent();
                        serie.seasons = seasons;
                        return [2 /*return*/, serie];
                }
            });
        });
    };
    TMDBAPI.prototype.seasons = function (serieID, options) {
        return __awaiter(this, void 0, void 0, function () {
            var $this, language, response, html, doc, seasons, seasons_list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $this = this;
                        language = (0, lodash_1.get)(options, "language", this.language);
                        return [4 /*yield*/, this.requester.get("https://www.themoviedb.org/tv/".concat(serieID, "/seasons?language=").concat(language), this.headers())];
                    case 1:
                        response = _a.sent();
                        html = response.body;
                        if (!html)
                            throw new Error("Serie not found");
                        if (html.indexOf("Page not found") > -1) {
                            throw new Error("Serie not found");
                        }
                        doc = (0, cheerio_1.load)(html);
                        seasons = [];
                        seasons_list = doc(".season_wrapper");
                        seasons_list.each(function (index, _season) {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                            var season = doc(_season);
                            var link = $this.site + season.find("a").attr("href");
                            var season_id = link.split("season/")[1];
                            if (season_id.indexOf("?") > -1) {
                                season_id = season_id.split("?")[0];
                            }
                            var description = (_b = (_a = season.find(".season_overview")) === null || _a === void 0 ? void 0 : _a.text()) === null || _b === void 0 ? void 0 : _b.trim();
                            var content = "".concat((_c = season.find(".content  h4")) === null || _c === void 0 ? void 0 : _c.text()).trim();
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
                                    id: "".concat((_g = Number(season_id)) !== null && _g !== void 0 ? _g : season_id),
                                    link: link,
                                    name: season_id == "0" ? "Specials" : "Season ".concat((_h = Number(season_id)) !== null && _h !== void 0 ? _h : season_id),
                                    season: (_j = Number(season_id)) !== null && _j !== void 0 ? _j : (index + 1),
                                    poster: poster !== null && poster !== void 0 ? poster : "",
                                    released: release_date !== null && release_date !== void 0 ? release_date : released,
                                    year: (0, helpers_1.getYear)(release_date !== null && release_date !== void 0 ? release_date : released),
                                    episodes: [],
                                    fetcher: $this.name
                                }));
                        });
                        return [2 /*return*/, seasons];
                }
            });
        });
    };
    TMDBAPI.prototype.season = function (id, serieID, options) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var $this, language, response, html, doc, link, name, first_image, release_date, _season, episodes_list;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        $this = this;
                        language = (0, lodash_1.get)(options, "language", this.language);
                        return [4 /*yield*/, this.requester.get("".concat($this.site, "/tv/").concat(serieID, "/season/").concat(id, "?language=").concat(language), this.headers())];
                    case 1:
                        response = _e.sent();
                        html = response.body;
                        if (!html)
                            throw new Error("Season not found");
                        if (html.indexOf("Page not found") > -1) {
                            throw new Error("Season not found");
                        }
                        doc = (0, cheerio_1.load)(html);
                        link = "".concat($this.site, "/tv/").concat(serieID, "/season/").concat(id);
                        name = "".concat((_a = doc(".title a")) === null || _a === void 0 ? void 0 : _a.text()).trim();
                        first_image = (_b = doc(".episode_list .episode .backdrop").attr("src")) !== null && _b !== void 0 ? _b : doc(".poster").attr("src");
                        release_date = (_c = doc(".episode_list .episode .date span").first().text()) !== null && _c !== void 0 ? _c : "";
                        _season = season_1.default.fromObject({
                            id: id,
                            link: link,
                            name: name,
                            season: (_d = Number(id)) !== null && _d !== void 0 ? _d : id,
                            poster: first_image ? posterToURI(first_image) : "",
                            released: release_date,
                            episodes: [],
                            fetcher: this.name
                        });
                        episodes_list = doc(".episode_list .episode");
                        episodes_list.each(function (index, _episode) {
                            var _a, _b, _c, _d, _e, _f, _g, _h;
                            var episode = doc(_episode);
                            var link = $this.site + episode.find("a").attr("href");
                            var title = "".concat(episode.find(".title a").text()).trim();
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
                                poster: (_h = "".concat(_this.site, "/").concat(image)) !== null && _h !== void 0 ? _h : "",
                                servers: [],
                                fetcher: _this.name
                            }));
                        });
                        return [2 /*return*/, _season];
                }
            });
        });
    };
    TMDBAPI.prototype.episodes = function (seasonID, serieID) {
        throw new Error("Method not implemented.");
    };
    TMDBAPI.prototype.episode = function (id, seasonID, serieID) {
        throw new Error("Method not implemented.");
    };
    TMDBAPI.prototype.genders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, html, returner, $;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requester.get("".concat(this.site, "/tv"), this.headers())];
                    case 1:
                        response = _a.sent();
                        html = response.body;
                        if (!html)
                            throw new Error("no found");
                        returner = [];
                        $ = (0, cheerio_1.load)(html);
                        $("#with_genres a").each(function (index, element) {
                            var _a, _b;
                            var a = $(element);
                            var id = (_a = a.attr("href")) === null || _a === void 0 ? void 0 : _a.split("with_genres=")[1];
                            var name = (_b = a.text()) === null || _b === void 0 ? void 0 : _b.trim();
                            var link = "".concat(_this.site, "/tv/genre/").concat(id);
                            if (id && name)
                                returner.push(category_1.default.fromObject({
                                    id: "".concat(id),
                                    name: name,
                                    link: link,
                                    fetcher: _this.name,
                                    type: "category",
                                    poster: "",
                                    description: ""
                                }));
                        });
                        return [2 /*return*/, returner];
                }
            });
        });
    };
    TMDBAPI.prototype.cast = function () {
        throw new Error("Method not implemented.");
    };
    TMDBAPI.prototype.byType = function (type, options) {
        throw new Error("Method not implemented.");
    };
    TMDBAPI.prototype.getById = function (id, type) {
        throw new Error("Method not implemented.");
    };
    TMDBAPI.prototype.top = function () {
        throw new Error("Method not implemented.");
    };
    TMDBAPI.prototype.topMovies = function () {
        throw new Error("Method not implemented.");
    };
    TMDBAPI.prototype.topSeries = function () {
        throw new Error("Method not implemented.");
    };
    TMDBAPI.prototype.home = function () {
        throw new Error("Method not implemented.");
    };
    Object.defineProperty(TMDBAPI, "instance", {
        /**
         * return a TMDBAPI instance
         * @returns {TMDBAPI}
         */
        get: function () {
            if (this.___instance === null) {
                this.___instance = new TMDBAPI();
            }
            return this.___instance;
        },
        enumerable: false,
        configurable: true
    });
    return TMDBAPI;
}(default_provider_1.default));
exports.default = TMDBAPI;
