"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Season {
    constructor(id, link, name, season, poster, released, year, episodes, tmdbID, imdbID, fetcher, type) {
        this.id = id;
        this.link = link;
        this.name = name;
        this.season = season;
        this.poster = poster;
        this.type = type !== null && type !== void 0 ? type : "season";
        this.released = released;
        this.year = year;
        this.episodes = episodes !== null && episodes !== void 0 ? episodes : [];
        this.tmdbID = tmdbID;
        this.imdbID = imdbID;
        this.fetcher = fetcher;
    }
    static fromObject(obj) {
        var _a, _b, _c;
        return new Season(obj.id, obj.link, obj.name, obj.season, obj.poster, obj.released, (_a = obj.year) !== null && _a !== void 0 ? _a : "", obj.episodes, (_b = obj.tmdbID) !== null && _b !== void 0 ? _b : "", (_c = obj.imdbID) !== null && _c !== void 0 ? _c : "", obj.fetcher, obj.type);
    }
    toObject() {
        return {
            id: this.id,
            link: this.link,
            name: this.name,
            season: this.season,
            poster: this.poster,
            type: this.type,
            released: this.released,
            year: this.year,
            episodes: this.episodes,
            tmdbID: this.tmdbID,
            imdbID: this.imdbID,
            fetcher: this.fetcher
        };
    }
    toString() {
        return JSON.stringify(this.toObject());
    }
    addEpisode(episode) {
        this.episodes.push(episode);
    }
}
exports.default = Season;
