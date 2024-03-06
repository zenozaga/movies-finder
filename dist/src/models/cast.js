"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkType = void 0;
var NetworkType;
(function (NetworkType) {
    NetworkType["streaming"] = "streaming";
    NetworkType["social"] = "social";
    NetworkType["official"] = "official";
})(NetworkType = exports.NetworkType || (exports.NetworkType = {}));
class Cast {
    constructor(name, character, id, type, avatar, link, fetcher, imdbID, tmdbID) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.avatar = avatar;
        this.link = link;
        this.fetcher = fetcher;
        this.imdbID = imdbID;
        this.tmdbID = tmdbID;
        this.character = character;
    }
    static fromObject(obj) {
        var _a;
        return new Cast(obj.name, (_a = obj.character) !== null && _a !== void 0 ? _a : "", obj.id, obj.type, obj.avatar, obj.link, obj.fetcher, obj.imdbID, obj.tmdbID);
    }
    toObject() {
        return {
            name: this.name,
            character: this.character,
            id: this.id,
            type: this.type,
            avatar: this.avatar,
            link: this.link,
            fetcher: this.fetcher,
            imdbID: this.imdbID,
            tmdbID: this.tmdbID
        };
    }
    toString() {
        return JSON.stringify(this.toObject());
    }
}
exports.default = Cast;
