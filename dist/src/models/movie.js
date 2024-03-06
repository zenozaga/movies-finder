"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
class Movie {
    constructor(id, link, title, subtitle, description, duration, type, rating, released, year, poster, background, trailers, sources, imdbID, tmdbID, fetcher, cast, genders, relates, networks) {
        this.id = id;
        this.link = link;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.duration = duration;
        this.type = types_1.MediaTypes.movie;
        this.rating = rating;
        this.released = released;
        this.year = year;
        this.poster = poster;
        this.background = background;
        this.trailers = trailers;
        this.sources = sources;
        this.imdbID = imdbID;
        this.tmdbID = tmdbID;
        this.fetcher = fetcher;
        this.cast = cast;
        this.genders = genders;
        this.relates = relates !== null && relates !== void 0 ? relates : [];
        this.networks = networks !== null && networks !== void 0 ? networks : [];
    }
    static fromObject(obj) {
        var _a, _b;
        return new Movie(obj.id, obj.link, obj.title, obj.subtitle, obj.description, obj.duration, obj.type, obj.rating, obj.released, obj.year || "", obj.poster, obj.background, obj.trailers, obj.sources, obj.imdbID || "", obj.tmdbID || "", obj.fetcher, obj.cast, obj.genders, (_a = obj.relates) !== null && _a !== void 0 ? _a : [], (_b = obj.networks) !== null && _b !== void 0 ? _b : []);
    }
    toObject() {
        var _a, _b;
        return {
            id: this.id,
            title: this.title,
            subtitle: this.subtitle,
            description: this.description,
            duration: this.duration,
            type: this.type,
            rating: this.rating,
            released: this.released,
            year: this.year,
            poster: this.poster,
            background: this.background,
            trailers: this.trailers,
            sources: this.sources,
            imdbID: this.imdbID,
            tmdbID: this.tmdbID,
            fetcher: this.fetcher,
            cast: this.cast,
            genders: this.genders,
            relates: (_a = this.relates) !== null && _a !== void 0 ? _a : [],
            networks: (_b = this.networks) !== null && _b !== void 0 ? _b : []
        };
    }
    toString() {
        return JSON.stringify(this.toObject());
    }
}
exports.default = Movie;
