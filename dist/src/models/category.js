"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Category = /** @class */ (function () {
    function Category(name, id, type, link, poster, description, fetcher, tmdID, imdbID) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.link = link;
        this.poster = poster;
        this.description = description;
        this.fetcher = fetcher;
    }
    Category.fromObject = function (obj) {
        return new Category(obj.name, obj.id, obj.type, obj.link, obj.poster, obj.description, obj.fetcher, obj.tmdID, obj.imdbID);
    };
    Category.prototype.toObject = function () {
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
    };
    Category.prototype.toString = function () {
        return JSON.stringify(this.toObject());
    };
    return Category;
}());
exports.default = Category;
