"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Languages = exports.MediaTypes = void 0;
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
