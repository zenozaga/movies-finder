"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryAtob = exports.tryDate = exports.validDate = exports.getYear = exports.headersToObject = exports.parseRuntime = exports.parseQuality = exports.parseLanguage = exports.getTypeByExtension = exports.normalize = exports.getHost = exports.getOrigin = exports.isValidURI = exports.slugify = void 0;
var lodash_1 = require("lodash");
var source_1 = require("../models/source");
var types_1 = require("../types");
var base64_1 = require("./base64");
function slugify(text) {
    return "".concat(text).toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}
exports.slugify = slugify;
function isValidURI(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}
exports.isValidURI = isValidURI;
/**
 * return origin from URL
 * @param {String} url
 * @returns {String}
 */
function getOrigin(url) {
    if (!isValidURI(url))
        return null;
    if (globalThis.URL) {
        return new URL(url).origin;
    }
    else {
        // get origin by regex
        var match = url.match(/^(https?:\/\/[^/]+)/);
        if (match) {
            return match[1];
        }
    }
    return url;
}
exports.getOrigin = getOrigin;
/**
 * return host from URL
 * @param {String} url
 * @returns {String}
 */
function getHost(url) {
    if (!isValidURI(url))
        return null;
    if (typeof window !== "undefined") {
        if (window.URL) {
            return new URL(url).host;
        }
        else {
            var a = document.createElement('a');
            a.href = url;
            return a.host;
        }
    }
    else {
        // get origin by regex
        var match = url.match(/^(https?:\/\/[^/]+)/);
        if (match) {
            return match[1];
        }
    }
    return url;
}
exports.getHost = getHost;
function normalize(str) {
    return "".concat(str).normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}
exports.normalize = normalize;
function getTypeByExtension(url) {
    var _url = "".concat(url).toLowerCase();
    if (_url.endsWith(".mp4"))
        return source_1.SourceTypes.MP4;
    if (_url.endsWith(".m3u8"))
        return source_1.SourceTypes.M3U8;
    if (_url.endsWith(".mpd"))
        return source_1.SourceTypes.DASH;
    if (_url.endsWith(".webm"))
        return source_1.SourceTypes.WEBM;
    return source_1.SourceTypes.MP4;
}
exports.getTypeByExtension = getTypeByExtension;
function parseLanguage(lang) {
    // lowercase and normalize
    var _lang = normalize(lang).toLowerCase();
    if ((_lang.includes("castellano") || _lang == "es" || _lang.includes("español") || _lang.includes("spanish") || _lang.includes("espanol")) && !_lang.includes("latino")) {
        return types_1.Languages.cast;
    }
    if (_lang.includes("subt") || _lang.includes("subtitulado") || _lang == "en" || _lang.includes("english") || _lang.includes("ingles")) {
        return types_1.Languages.en;
    }
    return types_1.Languages.mx;
}
exports.parseLanguage = parseLanguage;
function parseQuality(quality) {
    // lowercase and normalize
    var _quality = normalize(quality).toLowerCase();
    if (_quality.includes("2160p") || _quality.includes("2160") || _quality.includes("4k")) {
        return source_1.SourceResolution.UHD;
    }
    if (_quality.includes("1080p") || _quality.includes("1080") || _quality.includes("fullhd")) {
        return source_1.SourceResolution.FULLHD;
    }
    if (_quality.includes("720p") || _quality.includes("720") || _quality.includes("hd")) {
        return source_1.SourceResolution.HD;
    }
    if (_quality.includes("480p") || _quality.includes("480") || _quality.includes("sd")) {
        return source_1.SourceResolution.SD;
    }
    if (_quality.includes("360p") || _quality.includes("360")) {
        return source_1.SourceResolution.SD;
    }
    return source_1.SourceResolution.HD;
}
exports.parseQuality = parseQuality;
var parseDuration = function (duration) {
    var _a, _b;
    try {
        var hours = ((_a = duration.match(/(\d+)h/)) === null || _a === void 0 ? void 0 : _a[1]) || 0;
        var minutes = ((_b = duration.match(/(\d+)m/)) === null || _b === void 0 ? void 0 : _b[1]) || 0;
        return "".concat(hours, "h ").concat(minutes, "m");
    }
    catch (error) {
        return duration;
    }
};
function parseRuntime(runtime) {
    if (!runtime)
        return "0h 0m";
    if ((0, lodash_1.isNumber)(runtime)) {
        var hours = Math.floor(runtime / 60);
        var minutes = runtime % 60;
        return "".concat(hours, "h ").concat(minutes, "m");
    }
    return parseDuration(runtime);
}
exports.parseRuntime = parseRuntime;
function headersToObject(headers) {
    if (!headers)
        return {};
    var obj = {};
    headers.forEach(function (value, key) {
        obj[key] = value;
    });
    return obj;
}
exports.headersToObject = headersToObject;
function getYear(date) {
    var _data = new Date(date);
    if (isNaN(_data.getTime()))
        return "";
    return "".concat(_data.getFullYear());
}
exports.getYear = getYear;
function validDate(date) {
    return !isNaN((new Date(date)).getTime());
}
exports.validDate = validDate;
function tryDate(date, def) {
    if (!validDate(date))
        return def !== null && def !== void 0 ? def : date;
    return new Date(date).toISOString();
}
exports.tryDate = tryDate;
function tryAtob(str) {
    try {
        return (0, base64_1.decode)(str);
    }
    catch (error) {
        return str;
    }
}
exports.tryAtob = tryAtob;
