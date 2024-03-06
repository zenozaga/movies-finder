"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Season = exports.Episode = exports.TvShow = exports.Movie = exports.Requester = exports.Languages = exports.MediaTypes = void 0;
const requester_1 = __importDefault(require("./models/requester"));
exports.Requester = requester_1.default;
const movie_1 = __importDefault(require("./models/movie"));
exports.Movie = movie_1.default;
const serie_1 = __importDefault(require("./models/serie"));
exports.TvShow = serie_1.default;
const episode_1 = __importDefault(require("./models/episode"));
exports.Episode = episode_1.default;
const season_1 = __importDefault(require("./models/season"));
exports.Season = season_1.default;
__exportStar(require("."), exports);
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["movie"] = "movie";
    MediaTypes["tv"] = "tv";
    MediaTypes["anime"] = "anime";
    MediaTypes["unknown"] = "unknown";
    MediaTypes["episode"] = "episode";
})(MediaTypes || (MediaTypes = {}));
exports.MediaTypes = MediaTypes;
;
var Languages;
(function (Languages) {
    Languages["en"] = "english";
    Languages["es"] = "spanish";
    Languages["mx"] = "latino";
    Languages["sub"] = "subtitulado";
    Languages["cast"] = "castellano";
    Languages["unknown"] = "unknown";
})(Languages || (Languages = {}));
exports.Languages = Languages;
