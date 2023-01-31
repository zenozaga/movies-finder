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
var lodash_1 = require("lodash");
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
var CuevanaChat = /** @class */ (function (_super) {
    __extends(CuevanaChat, _super);
    function CuevanaChat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "CuevanaChat";
        _this.site = "https://cuevana3.chat/";
        _this.language = "es";
        return _this;
    }
    CuevanaChat.prototype.match = function (urlOrID) {
        return urlOrID.includes("cuevana3");
    };
    /**
     * Headers for the request
     * @returns {{}}
     */
    CuevanaChat.prototype.headers = function (extra) {
        var _a;
        if (extra === void 0) { extra = {}; }
        return Object.assign({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
            "Origin": (_a = (0, helpers_1.getOrigin)(this.site)) !== null && _a !== void 0 ? _a : this.site,
            //  "Host": getHost(this.site),
            "Referer": this.site
        }, extra);
    };
    /**
     * Check if the response is a 301 Moved Permanently
     * @param promise
     * @returns
     */
    CuevanaChat.prototype.checkMovePermanent = function (promise) {
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
    /**
     *
     * @param {String} html
     * @returns {Array<Movie|Serie>}
     */
    CuevanaChat.prototype.parseCollectionHTML = function (html, selector) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        var $ = (0, cheerio_1.load)(html);
        var list = $(selector !== null && selector !== void 0 ? selector : ".MovieList > li > .post, .MovieList > li > .TPost");
        var returner = [];
        for (var index = 0; index < list.length; index++) {
            var element = $(list[index]);
            var link = (_a = element.find("a").attr("href")) !== null && _a !== void 0 ? _a : "";
            var image = (_b = element.find("img[data-src]")) === null || _b === void 0 ? void 0 : _b.attr("data-src");
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
            if (link.includes("/serie/")) {
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
    };
    CuevanaChat.prototype.parseMovieHTML = function (html, type) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        if (type === void 0) { type = ""; }
        var $this = this;
        var $ = (0, cheerio_1.load)(html);
        var id = (_a = $("#top-single")) === null || _a === void 0 ? void 0 : _a.attr("data-id");
        var poster = (_b = $(".TPost .Image img[data-src]")) === null || _b === void 0 ? void 0 : _b.attr('data-src');
        var background = (_c = $(".backdrop > .Image img[data-src]")) === null || _c === void 0 ? void 0 : _c.attr("data-src");
        var title = (_e = (_d = $(".TPost .Title:eq(0)")) === null || _d === void 0 ? void 0 : _d.text()) === null || _e === void 0 ? void 0 : _e.trim();
        var subtitle = (_g = (_f = $(".TPost .SubTitle")) === null || _f === void 0 ? void 0 : _f.text()) === null || _g === void 0 ? void 0 : _g.trim();
        var description = (_j = (_h = $(".TPost .Description")) === null || _h === void 0 ? void 0 : _h.text()) === null || _j === void 0 ? void 0 : _j.trim();
        var release = (_l = (_k = $(".TPost .meta")) === null || _k === void 0 ? void 0 : _k.text()) === null || _l === void 0 ? void 0 : _l.trim();
        var rating = (_o = (_m = $("#TPVotes")) === null || _m === void 0 ? void 0 : _m.attr("data-percent")) === null || _o === void 0 ? void 0 : _o.trim();
        var canonical = (_q = (_p = $("link[rel='canonical']")) === null || _p === void 0 ? void 0 : _p.attr("href")) !== null && _q !== void 0 ? _q : "";
        var _season_episode = canonical === null || canonical === void 0 ? void 0 : canonical.match(/\-([0-9].*)x([0-9].*)/);
        var year = (_s = (_r = "".concat(release).match(/([0-9]{4})/g)) === null || _r === void 0 ? void 0 : _r[0]) !== null && _s !== void 0 ? _s : release;
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
                trailers.push("".concat((_u = $("#OptY iframe")) === null || _u === void 0 ? void 0 : _u.attr("data-src")));
        }
        $("[data-embed]").each(function (index, ele) {
            var _a;
            var url = (0, helpers_1.tryAtob)((_a = $(ele).attr("data-embed")) !== null && _a !== void 0 ? _a : "");
            var name = "".concat($(ele).find("img").attr("alt")).trim();
            if (url)
                servers.push(source_1.default.fromObject({
                    name: name !== null && name !== void 0 ? name : "",
                    url: _this.fixUrl(url),
                    type: (0, helpers_1.getTypeByExtension)(url),
                    resolution: source_1.default.parseResolution(name !== null && name !== void 0 ? name : ""),
                    lang: (0, helpers_1.parseLanguage)(name !== null && name !== void 0 ? name : ""),
                    from: canonical !== null && canonical !== void 0 ? canonical : id,
                    fetcher: _this.name
                }));
        });
        $(".InfoList a[href*='category']").each(function (index, ele) {
            var _a, _b, _c, _d;
            var element = $(ele);
            var id = (_b = (_a = element.attr("href")) === null || _a === void 0 ? void 0 : _a.split("category/")[1]) !== null && _b !== void 0 ? _b : "";
            var link = "".concat(_this.site, "/category/").concat(id);
            var name = (_d = (_c = element.text()) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : "";
            genres.push(category_1.default.fromObject({
                id: id,
                name: name,
                link: link,
                type: "category",
                poster: "",
                description: "",
                fetcher: _this.name
            }));
        });
        $(".loadactor a").each(function (index, ele) {
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
                fetcher: _this.name
            }));
        });
        $("#select-season option").each(function (seasonIndex, ele) {
            var _a, _b, _c;
            var element = $(ele);
            var id = (_b = (_a = "".concat(element.val())) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "";
            var name = (_c = element.text()) === null || _c === void 0 ? void 0 : _c.trim();
            var season = season_1.default.fromObject({
                id: id,
                link: canonical !== null && canonical !== void 0 ? canonical : id,
                name: name !== null && name !== void 0 ? name : "",
                season: seasonIndex,
                poster: "",
                released: "",
                episodes: [],
                fetcher: _this.name
            });
            $("#season-".concat(id, ".all-episodes li")).each(function (index, eps) {
                var _a, _b, _c, _d, _e, _f;
                var episode = $(eps);
                var link = (_b = (_a = episode.find("a")) === null || _a === void 0 ? void 0 : _a.attr("href")) !== null && _b !== void 0 ? _b : "";
                var id = (_c = link.match(/post\-([0-9]*)\s/)) === null || _c === void 0 ? void 0 : _c[1];
                var image = (_d = episode.find("img[data-src]")) === null || _d === void 0 ? void 0 : _d.attr("data-src");
                var title = (_f = (_e = episode.find(".Title")) === null || _e === void 0 ? void 0 : _e.text()) === null || _f === void 0 ? void 0 : _f.trim();
                if ("".concat(image).includes('tmdb.org')) {
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
                    season: seasonIndex,
                    link: _this.fixUrl(link),
                    poster: image ? _this.fixUrl(image) : "",
                    servers: [],
                    fetcher: _this.name
                }));
            });
            seasons.push(season);
        });
        var _relates = this.parseCollectionHTML(html, ".MovieList.Rows > li > .post");
        if (_relates.length > 0) {
            relates = relates.concat(__spreadArray([], _relates, true));
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
                poster: poster !== null && poster !== void 0 ? poster : "",
                background: (_v = background !== null && background !== void 0 ? background : poster) !== null && _v !== void 0 ? _v : "",
                genders: genres,
                seasons: seasons,
                cast: cast,
                trailers: trailers,
                year: year,
                fetcher: this.name,
                relates: relates
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
                poster: poster !== null && poster !== void 0 ? poster : "",
                servers: servers,
                fetcher: this.name
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
                poster: poster !== null && poster !== void 0 ? poster : "",
                background: (_w = background !== null && background !== void 0 ? background : poster) !== null && _w !== void 0 ? _w : "",
                trailers: trailers,
                genders: genres,
                sources: servers,
                year: year,
                cast: cast,
                fetcher: this.name,
                relates: relates
            });
        }
    };
    /**
     *
     * @param {String} url
     */
    CuevanaChat.prototype.fixUrl = function (url) {
        if (url.startsWith("//")) {
            url = "https:" + url;
        }
        return url;
    };
    CuevanaChat.prototype.byType = function (type, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var url, isMovie, page, repsonse, params, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.site;
                        isMovie = !(type == "tv" || type == "serie" || type == "series");
                        if (!isMovie) {
                            url = "".concat(this.site, "serie");
                        }
                        else {
                            url = "".concat(this.site, "peliculas");
                        }
                        page = (0, lodash_1.get)(options, "page", 1);
                        if (!isMovie) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.requester.get("".concat(url, "/page/").concat(page), this.headers())];
                    case 1:
                        repsonse = _b.sent();
                        return [2 /*return*/, this.parseCollectionHTML((_a = repsonse.body) !== null && _a !== void 0 ? _a : repsonse)];
                    case 2:
                        url = "".concat(this.site, "/wp-admin/admin-ajax.php");
                        params = new URLSearchParams({
                            "action": "cuevana_ajax_pagination",
                            "query_vars": "",
                            "page": "".concat(page),
                        });
                        return [4 /*yield*/, this.checkMovePermanent(this.requester.post(url, "".concat(params)))];
                    case 3:
                        response = _b.sent();
                        if (!response)
                            return [2 /*return*/, []];
                        return [2 /*return*/, this.parseCollectionHTML(response)];
                }
            });
        });
    };
    CuevanaChat.prototype.search = function (query, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, body, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.site, "/?s=").concat(encodeURIComponent(query));
                        return [4 /*yield*/, this.requester.get(url, this.headers())];
                    case 1:
                        response = _a.sent();
                        body = response.body;
                        if (!body)
                            throw new Error("No found results");
                        list = this.parseCollectionHTML(body);
                        if (list && list.length > 0) {
                            console.log(list);
                            return [2 /*return*/, list];
                        }
                        return [2 /*return*/, []];
                }
            });
        });
    };
    CuevanaChat.prototype.getById = function (idorLink, type) {
        return __awaiter(this, void 0, void 0, function () {
            var response, html, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (idorLink.includes("/serie/")) {
                            type = "tv";
                        }
                        else {
                            type = type !== null && type !== void 0 ? type : "movie";
                        }
                        if (!idorLink.includes('http')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.requester.get(idorLink, this.headers({ "Referer": this.site }))];
                    case 1:
                        response = _a.sent();
                        html = response.body;
                        data = this.parseMovieHTML(html, type);
                        if (data)
                            data.link = idorLink;
                        return [2 /*return*/, data];
                    case 2:
                        ;
                        throw new Error("Not found");
                }
            });
        });
    };
    CuevanaChat.prototype.top = function () {
        throw new Error("Method not implemented.");
    };
    CuevanaChat.prototype.topMovies = function () {
        throw new Error("Method not implemented.");
    };
    CuevanaChat.prototype.topSeries = function () {
        throw new Error("Method not implemented.");
    };
    CuevanaChat.prototype.home = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, body, episodes, series, movies, topSeries, topMovies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requester.get("".concat(this.site), this.headers())];
                    case 1:
                        response = _a.sent();
                        body = response.body;
                        if (!body)
                            throw new Error("No found results");
                        episodes = this.parseCollectionHTML(body, ".episodes .post");
                        series = this.parseCollectionHTML(body, ".series_listado .post");
                        movies = this.parseCollectionHTML(body, ".MovieList.Rows .post");
                        topSeries = this.parseCollectionHTML(body, "#aa-series .TPost");
                        topMovies = this.parseCollectionHTML(body, ".MovieList.top .TPost");
                        return [2 /*return*/, {
                                series: series,
                                movies: movies,
                                episodes: episodes,
                                topMovies: topMovies,
                                topSeries: topSeries,
                            }];
                }
            });
        });
    };
    CuevanaChat.prototype.movies = function (options) {
        return this.byType("movie", options);
    };
    CuevanaChat.prototype.movie = function (id, options) {
        return this.getById(id, "movie");
    };
    CuevanaChat.prototype.series = function (options) {
        return this.byType("tv", options);
    };
    CuevanaChat.prototype.serie = function (id, options) {
        return this.getById(id, "tv");
    };
    CuevanaChat.prototype.seasons = function (serieID, options) {
        return __awaiter(this, void 0, void 0, function () {
            var serie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!serieID)
                            throw new Error("serieID is required");
                        return [4 /*yield*/, this.getById(serieID, "tv")];
                    case 1:
                        serie = _a.sent();
                        if (serie instanceof serie_1.default)
                            return [2 /*return*/, serie.seasons];
                        return [2 /*return*/, []];
                }
            });
        });
    };
    CuevanaChat.prototype.season = function (id, serieID, options) {
        return this.seasons(serieID, options).then(function (seasons) {
            var season = seasons.find(function (s) { return "".concat(s.id) == "".concat(id); });
            if (season)
                return season;
            throw new Error("Not found");
        });
    };
    CuevanaChat.prototype.episodes = function (seasonID, serieID, options) {
        return __awaiter(this, void 0, void 0, function () {
            var serie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!serieID)
                            throw new Error("serieID is required");
                        if (!seasonID)
                            throw new Error("seasonID is required");
                        return [4 /*yield*/, this.season(seasonID, serieID, options)];
                    case 1:
                        serie = _a.sent();
                        if (serie instanceof serie_1.default)
                            return [2 /*return*/, serie.episodes];
                        return [2 /*return*/, []];
                }
            });
        });
    };
    CuevanaChat.prototype.episode = function (id, seasonID, serieID, options) {
        return __awaiter(this, void 0, void 0, function () {
            var episode;
            return __generator(this, function (_a) {
                episode = this.getById(id, "episode");
                return [2 /*return*/, episode];
            });
        });
    };
    CuevanaChat.prototype.genders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, body, $, returner, list;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.requester.get("".concat(this.site, "/inicio"), this.headers())];
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
    CuevanaChat.prototype.cast = function (options) {
        throw new Error("Method not implemented.");
    };
    return CuevanaChat;
}(default_provider_1.default));
exports.default = CuevanaChat;
