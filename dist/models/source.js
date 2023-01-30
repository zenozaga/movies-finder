"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceResolution = exports.SourceTypes = void 0;
var helpers_1 = require("../utils/helpers");
var SourceTypes;
(function (SourceTypes) {
    SourceTypes["MP4"] = "mp4";
    SourceTypes["WEBM"] = "webm";
    SourceTypes["M3U8"] = "m3u8";
    SourceTypes["HLS"] = "m3u8";
    SourceTypes["DASH"] = "mpd";
    SourceTypes["MPD"] = "mpd";
})(SourceTypes = exports.SourceTypes || (exports.SourceTypes = {}));
var SourceResolution;
(function (SourceResolution) {
    SourceResolution["SD"] = "360p";
    SourceResolution["MD"] = "480p";
    SourceResolution["HD"] = "720p";
    SourceResolution["FULLHD"] = "1080p";
    SourceResolution["UHD"] = "4k";
})(SourceResolution = exports.SourceResolution || (exports.SourceResolution = {}));
var Source = /** @class */ (function () {
    function Source(from, url, resolution, type, headers, fetcher, lang, name) {
        this.from = from;
        this.url = url;
        this.resolution = Source.parseResolution(resolution);
        this.type = Source.parseType(type);
        this.headers = headers;
        this.fetcher = fetcher || "default";
        this.lang = (0, helpers_1.parseLanguage)(lang || "latino");
        this.name = name || "unknown";
    }
    Source.parseResolution = function (resolution) {
        switch ((resolution + "").toLowerCase()) {
            case '240':
            case '240p':
            case '360':
            case '360p':
                return SourceResolution.SD;
            case 'sd':
            case '480':
            case '480p':
                return SourceResolution.MD;
            case '720':
            case '720p':
            case 'hd':
                return SourceResolution.HD;
            case 'fullhd':
            case '1080':
            case '1080p':
                return SourceResolution.FULLHD;
            case '2160':
            case '4k':
            case '4kp':
                return SourceResolution.UHD;
            default:
                return SourceResolution.HD;
        }
    };
    Source.parseType = function (type) {
        switch ((type + "").toLowerCase()) {
            case 'mp4':
                return SourceTypes.MP4;
            case 'webm':
                return SourceTypes.WEBM;
            case 'mpd':
                return SourceTypes.MPD;
            case 'm3u':
            case 'm3u8':
                return SourceTypes.HLS;
            default:
                return SourceTypes.MP4;
        }
    };
    Source.fromObject = function (json) {
        return new Source(json.from, json.url, json.resolution, json.type, json.headers, json.fetcher, json.lang, json.name);
    };
    Source.prototype.toJSON = function () {
        return {
            url: this.url,
            resolution: this.resolution,
            type: this.type,
            headers: this.headers,
            from: this.from,
            fetcher: this.fetcher
        };
    };
    Source.prototype.toString = function () {
        return JSON.stringify(this.toJSON());
    };
    return Source;
}());
exports.default = Source;
