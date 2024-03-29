"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
class Serie {
    constructor(id, link, title, subtitle, description, rating, votes, released, year, poster, background, trailers, imdbID, tmdbID, fetcher, seasons, cast, genders, relates = [], networks = []) {
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
        this.relates = relates !== null && relates !== void 0 ? relates : [];
        this.type = types_1.MediaTypes.tv;
        this.networks = networks;
    }
    static fromObject(obj) {
        var _a, _b, _c, _d, _e;
        return new Serie(obj.id, obj.link, obj.title, obj.subtitle, obj.description, obj.rating, obj.votes, obj.released, (_a = obj.year) !== null && _a !== void 0 ? _a : "", obj.poster, obj.background, obj.trailers, (_b = obj.imdbID) !== null && _b !== void 0 ? _b : "", (_c = obj.tmdbID) !== null && _c !== void 0 ? _c : "", obj.fetcher, obj.seasons, obj.cast, obj.genders, (_d = obj.relates) !== null && _d !== void 0 ? _d : [], (_e = obj.networks) !== null && _e !== void 0 ? _e : []);
    }
    toObject() {
        var _a, _b;
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
            genders: this.genders,
            relates: (_a = this.relates) !== null && _a !== void 0 ? _a : [],
            networks: (_b = this.networks) !== null && _b !== void 0 ? _b : []
        };
    }
    toString() {
        return JSON.stringify(this.toObject());
    }
}
exports.default = Serie;
