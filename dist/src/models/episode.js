"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Episode {
    constructor(id, title, description, duration, released, rating, votes, episode, season, link, poster, servers, fetcher, imdbID, tmdbID, relates) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.released = released;
        this.rating = rating;
        this.votes = votes;
        this.episode = episode;
        this.season = season;
        this.link = link;
        this.poster = poster;
        this.servers = servers;
        this.fetcher = fetcher;
        this.imdbID = imdbID;
        this.tmdbID = tmdbID;
        this.relates = relates !== null && relates !== void 0 ? relates : [];
    }
    static fromObject(obj) {
        var _a, _b, _c;
        return new Episode(obj.id, obj.title, obj.description, obj.duration, obj.released, obj.rating, obj.votes, obj.episode, obj.season, obj.link, obj.poster, obj.servers, obj.fetcher, (_a = obj.imdbID) !== null && _a !== void 0 ? _a : "", (_b = obj.tmdbID) !== null && _b !== void 0 ? _b : "", (_c = obj.relates) !== null && _c !== void 0 ? _c : []);
    }
    toObject() {
        var _a;
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            duration: this.duration,
            released: this.released,
            rating: this.rating,
            votes: this.votes,
            episode: this.episode,
            season: this.season,
            link: this.link,
            poster: this.poster,
            servers: this.servers,
            fetcher: this.fetcher,
            imdbID: this.imdbID,
            tmdbID: this.tmdbID,
            relates: (_a = this.relates) !== null && _a !== void 0 ? _a : []
        };
    }
    toString() {
        return JSON.stringify(this.toObject());
    }
}
exports.default = Episode;
