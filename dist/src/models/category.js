"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Category {
    constructor(name, id, type, link, poster, description, fetcher, tmdID, imdbID) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.link = link;
        this.poster = poster;
        this.description = description;
        this.fetcher = fetcher;
    }
    static fromObject(obj) {
        return new Category(obj.name, obj.id, obj.type, obj.link, obj.poster, obj.description, obj.fetcher, obj.tmdID, obj.imdbID);
    }
    toObject() {
        return {
            name: this.name,
            id: this.id,
            type: this.type,
            link: this.link,
            poster: this.poster,
            description: this.description,
            fetcher: this.fetcher,
            tmdID: this.tmdID,
            imdbID: this.imdbID
        };
    }
    toString() {
        return JSON.stringify(this.toObject());
    }
}
exports.default = Category;
