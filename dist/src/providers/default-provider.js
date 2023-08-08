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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    DefaultProvider.prototype.sections = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, []];
            });
        });
    };
    return DefaultProvider;
}());
exports.default = DefaultProvider;
