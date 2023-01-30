"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultProvider = /** @class */ (function () {
    function DefaultProvider() {
        this.name = "Default Provider";
        this.language = "es";
        this.site = "";
    }
    Object.defineProperty(DefaultProvider.prototype, "requester", {
        get: function () {
            if (!this._requester)
                throw new Error("Requester not set");
            return this._requester;
        },
        enumerable: false,
        configurable: true
    });
    ;
    DefaultProvider.prototype.setRequester = function (requester) {
        this._requester = requester;
    };
    DefaultProvider.prototype.headers = function (extra) {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.setSite = function (site) {
        this.site = site;
    };
    DefaultProvider.prototype.match = function (urlOrID) {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.byType = function (type, options) {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.bytType = function (type, options) {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.search = function (query, options) {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.getById = function (id, type) {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.top = function () {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.topMovies = function () {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.topSeries = function () {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.home = function () {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.movies = function (options) {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.movie = function (id, options) {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.series = function (options) {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.serie = function (id, options) {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.seasons = function (serieID, options) {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.season = function (id, serieID, options) {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.episodes = function (seasonID, serieID, options) {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.episode = function (id, seasonID, serieID, options) {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.genders = function (options) {
        throw new Error("Method not implemented.");
    };
    DefaultProvider.prototype.cast = function (options) {
        throw new Error("Method not implemented.");
    };
    return DefaultProvider;
}());
exports.default = DefaultProvider;
