"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var Serie = /** @class */ (function () {
    function Serie(id, link, title, subtitle, description, rating, votes, released, year, poster, background, trailers, imdbID, tmdbID, fetcher, seasons, cast, genders, relates) {
        if (relates === void 0) { relates = []; }
        this.id = id;
        this.link = link;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.rating = rating;
        this.released = released;
        this.poster = poster;
        this.background = background;
        this.trailers = trailers;
        this.imdbID = imdbID;
        this.tmdbID = tmdbID;
        this.fetcher = fetcher;
        this.votes = votes;
        this.seasons = seasons;
        this.cast = cast;
        this.genders = genders;
        this.year = year;
        this.cast = cast;
        this.genders = genders;
        this.relates = relates;
        this.type = types_1.MediaTypes.tv;
    }
    Serie.fromObject = function (obj) {
        var _a, _b, _c, _d;
        return new Serie(obj.id, obj.link, obj.title, obj.subtitle, obj.description, obj.rating, obj.votes, obj.released, (_a = obj.year) !== null && _a !== void 0 ? _a : "", obj.poster, obj.background, obj.trailers, (_b = obj.imdbID) !== null && _b !== void 0 ? _b : "", (_c = obj.tmdbID) !== null && _c !== void 0 ? _c : "", obj.fetcher, obj.seasons, obj.cast, obj.genders, (_d = obj.relates) !== null && _d !== void 0 ? _d : []);
    };
    Serie.prototype.toObject = function () {
        return {
            id: this.id,
            link: this.link,
            title: this.title,
            subtitle: this.subtitle,
            description: this.description,
            type: this.type,
            rating: this.rating,
            released: this.released,
            poster: this.poster,
            background: this.background,
            trailers: this.trailers,
            imdbID: this.imdbID,
            tmdbID: this.tmdbID,
            fetcher: this.fetcher,
            votes: this.votes,
            year: this.year,
            seasons: this.seasons,
            cast: this.cast,
            genders: this.genders
        };
    };
    Serie.prototype.toString = function () {
        return JSON.stringify(this.toObject());
    };
    return Serie;
}());
exports.default = Serie;
