"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultProvider {
    constructor() {
        this.name = "Default Provider";
        this.language = "es";
        this.site = "";
    }
    get requester() {
        if (!this._requester)
            throw new Error("Requester not set");
        return this._requester;
    }
    ;
    setRequester(requester) {
        this._requester = requester;
    }
    headers(extra) {
        throw new Error("Method not implemented.");
    }
    setSite(site) {
        this.site = site;
    }
    match(urlOrID) {
        throw new Error("Method not implemented.");
    }
    byType(type, options) {
        throw new Error("Method not implemented.");
    }
    search(query, options) {
        throw new Error("Method not implemented.");
    }
    getById(id, type) {
        throw new Error("Method not implemented.");
    }
    top() {
        throw new Error("Method not implemented.");
    }
    topMovies() {
        throw new Error("Method not implemented.");
    }
    topSeries() {
        throw new Error("Method not implemented.");
    }
    home() {
        throw new Error("Method not implemented.");
    }
    movies(options) {
        throw new Error("Method not implemented.");
    }
    movie(id, options) {
        throw new Error("Method not implemented.");
    }
    series(options) {
        throw new Error("Method not implemented.");
    }
    serie(id, options) {
        throw new Error("Method not implemented.");
    }
    seasons(serieID, options) {
        throw new Error("Method not implemented.");
    }
    season(id, serieID, options) {
        throw new Error("Method not implemented.");
    }
    episodes(seasonID, serieID, options) {
        throw new Error("Method not implemented.");
    }
    episode(id, seasonID, serieID, options) {
        throw new Error("Method not implemented.");
    }
    genders(options) {
        throw new Error("Method not implemented.");
    }
    cast(options) {
        throw new Error("Method not implemented.");
    }
    sections() {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
}
exports.default = DefaultProvider;
