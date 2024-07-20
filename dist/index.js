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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.sort = exports.apis = exports.providers = void 0;
const requester_1 = __importDefault(require("./models/requester"));
const tmdb_1 = __importDefault(require("./api/tmdb"));
const tekilaz_1 = __importDefault(require("./providers/tekilaz"));
// import Cuevana from "./providers/cuevana/index";
// import CuevanaChat from "./providers/cuevana-chat/index";
const lodash_1 = __importDefault(require("lodash"));
const types_1 = require("./types");
__exportStar(require("./types"), exports);
// import CuevanaChat from "./providers/cuevana-chat";
// import Cuevana from "./providers/cuevana";
/**
 * return a list of providers
 * @returns {Array<DefaultProvider>}
 */
function providers() {
    return [
        //  new Cuevana(),
        // new CuevanaChat(),
        new tekilaz_1.default()
    ];
}
exports.providers = providers;
function apis() {
    return [
        new tmdb_1.default()
    ];
}
exports.apis = apis;
/**
 *
 * @param {*} names
 * @param {*} provs
 * @returns {DefaultProvider[]}
 */
const sortProvidersByName = (names, provs) => {
    var sorted = [];
    var rest = [];
    if (!names)
        return provs;
    if (typeof names === "string")
        names = [names];
    for (let index = 0; index < provs.length; index++) {
        const prov = provs[index];
        if (names.includes(prov.name)) {
            sorted.push(prov);
        }
        else {
            rest.push(prov);
        }
    }
    return sorted.concat(rest);
};
/**
 * Sort providers by names
 * @param {Stirng[]} names
 *
 */
exports.sort = ["Cuevana", "CuevanaChat", "Tekilaz"];
/**
 *
 * @param {WebViewBridged} instance
 * @returns {void}
 */
const use = (instance) => {
    var requester = requester_1.default.from({
        get(url, headers, noFollow) {
            return instance.http.get(url, headers, noFollow);
        },
        post(url, body, headers, noFollow) {
            return instance.http.post(url, body, headers, noFollow);
        },
        head(url, headers, noFollow) {
            return instance.http.request("HEAD", url, headers, noFollow);
        }
    });
    const providerErrorHander = (error, provider) => {
        var _a;
        console.log(`ProviderError: name:${(_a = provider === null || provider === void 0 ? void 0 : provider.name) !== null && _a !== void 0 ? _a : provider} \nerror:${error}`);
    };
    instance.methodsManager.register("mf:search", (query, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
        var provs = sortProvidersByName(exports.sort, providers());
        for (let index = 0; index < provs.length; index++) {
            const provider = provs[index];
            provider.setRequester(requester);
            var result = yield provider.search(query, options).catch(e => providerErrorHander(e, provider));
            if (result && result.length) {
                instance.emit("mf:search", query, options, result);
                return result;
            }
        }
        return [];
    }));
    instance.methodsManager.register("mf:byType", (type = "tv", options = {}) => __awaiter(void 0, void 0, void 0, function* () {
        var _type = (type == "tv" || type == "serie" || type == "series") ? "tv" : "movie";
        var provs = sortProvidersByName(exports.sort, providers());
        for (let index = 0; index < provs.length; index++) {
            const provider = provs[index];
            provider.setRequester(requester);
            var result = yield provider.byType(_type, options).catch(e => providerErrorHander(e, provider));
            if (result && result.length) {
                instance.emit("mf:byType", type, options, result);
                return result;
            }
        }
        return [];
    }));
    instance.methodsManager.register("mf:byID", (idorLink, type = "") => __awaiter(void 0, void 0, void 0, function* () {
        var provs = sortProvidersByName(exports.sort, providers());
        for (let index = 0; index < provs.length; index++) {
            const provider = provs[index];
            if (!provider.match(idorLink)) {
                console.log(`ProviderError: name:${provider.name} not match with ${idorLink}`);
                continue;
            }
            provider.setRequester(requester);
            try {
                var result = yield provider.getById(idorLink, type).catch(e => providerErrorHander(e, provider));
                if (result && result instanceof types_1.Movie) {
                    if (result.sources && !result.sources.length) {
                        continue;
                    }
                    result.sources = result.sources.map((source) => {
                        lodash_1.default.set(source, "language", "klk");
                        source.from = source.name;
                        return source;
                    });
                }
                if (result && result instanceof types_1.Episode) {
                    if (result && !result.servers.length) {
                        continue;
                    }
                    result.servers = result.servers.map((source) => {
                        source.from = source.name;
                        lodash_1.default.set(source, "language", source.lang);
                        return source;
                    });
                }
                if (result) {
                    instance.emit("mf:byID", idorLink, type, result);
                    return result;
                }
            }
            catch (error) {
            }
        }
        return null;
    }));
    instance.methodsManager.register("mf:episode", (idorLink, type = "") => __awaiter(void 0, void 0, void 0, function* () {
        var provs = sortProvidersByName(exports.sort, providers());
        for (let index = 0; index < provs.length; index++) {
            const provider = provs[index];
            provider.setRequester(requester);
            var result = yield provider.getById(idorLink, type).catch(e => providerErrorHander(e, provider));
            if (result) {
                instance.emit("mf:episode", idorLink, type, result);
                return result;
            }
        }
        return null;
    }));
    instance.methodsManager.register("mf:episodes", (idorLink, type = "") => __awaiter(void 0, void 0, void 0, function* () {
        var provs = sortProvidersByName(exports.sort, providers());
        for (let index = 0; index < provs.length; index++) {
            const provider = provs[index];
            provider.setRequester(requester);
            var result = yield provider.episodes(idorLink, type).catch(e => providerErrorHander(e, provider));
            if (result) {
                instance.emit("mf:episode", idorLink, type, result);
                return result;
            }
        }
        return null;
    }));
    instance.methodsManager.register("mf:genders", (options, type = "") => __awaiter(void 0, void 0, void 0, function* () {
        var provs = sortProvidersByName(exports.sort, providers());
        for (let index = 0; index < provs.length; index++) {
            const provider = provs[index];
            provider.setRequester(requester);
            var result = yield provider.genders(options).catch(e => providerErrorHander(e, provider));
            if (result) {
                instance.emit("mf:genders", options, type, result);
                return result;
            }
        }
        return null;
    }));
    instance.methodsManager.register("mf:home", (options, type = "") => __awaiter(void 0, void 0, void 0, function* () {
        var provs = sortProvidersByName(exports.sort, providers());
        for (let index = 0; index < provs.length; index++) {
            const provider = provs[index];
            provider.setRequester(requester);
            var result = yield provider.home().catch(e => providerErrorHander(e, provider));
            if (result) {
                instance.emit("mf:home", options, type, result);
                return result;
            }
        }
        return null;
    }));
    function getCustomSession() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var request = yield requester.get(`https://hiroduo.com/v1/sections`);
                var data = request.body;
                try {
                    data = JSON.parse(data);
                }
                catch (error) {
                }
                if (typeof data == "object" && !Array.isArray(data)) {
                    var title = (_a = data.title) !== null && _a !== void 0 ? _a : "";
                    var items = (_b = data.items) !== null && _b !== void 0 ? _b : [];
                    if (title && items && items.length) {
                        return {
                            title: title,
                            items: items,
                            type: "big",
                        };
                    }
                }
                else if (Array.isArray(data) && data.length) {
                    return {
                        title: "Mega top",
                        items: data,
                        type: "big",
                    };
                }
            }
            catch (error) {
            }
            return null;
        });
    }
    instance.methodsManager.register("mf:sections", (options, type = "") => __awaiter(void 0, void 0, void 0, function* () {
        var provs = sortProvidersByName(exports.sort, providers());
        for (let index = 0; index < provs.length; index++) {
            const provider = provs[index];
            provider.setRequester(requester);
            var result = yield provider.sections().catch(e => providerErrorHander(e, provider));
            if (result && result.length) {
                try {
                    var customsessions = yield getCustomSession();
                    if (customsessions != null) {
                        result = [customsessions, ...result];
                    }
                }
                catch (error) {
                }
                instance.emit("mf:sections", options, type, result);
                return result;
            }
        }
        return null;
    }));
    instance.methodsManager.register("tmdb:search", (query) => __awaiter(void 0, void 0, void 0, function* () {
        var api = apis()[0];
        api.setRequester(requester);
        var result = yield api.search(query).catch(e => providerErrorHander(e, api));
        if (result && result.length) {
            instance.emit("tmdb:search", query, result);
            return result;
        }
        return null;
    }));
    instance.methodsManager.register("tmdb:getSerie", (idorLink) => __awaiter(void 0, void 0, void 0, function* () {
        var api = apis()[0];
        api.setRequester(requester);
        var result = yield api.serie(idorLink).catch(e => providerErrorHander(e, api));
        if (result) {
            instance.emit("tmdb:getSerie", idorLink, result);
            return result;
        }
        return null;
    }));
    instance.methodsManager.register("tmdb:getSerieFull", (idorLink, language = "es") => __awaiter(void 0, void 0, void 0, function* () {
        var api = apis()[0];
        api.setRequester(requester);
        var result = yield api.serieFull(idorLink, {
            language: language
        }).catch(e => providerErrorHander(e, api));
        if (!result) {
            throw new Error("No se pudo obtener la serie");
        }
        return result;
    }));
    instance.methodsManager.register("tmdb:getMovie", (idorLink) => __awaiter(void 0, void 0, void 0, function* () {
        var api = apis()[0];
        api.setRequester(requester);
        var result = yield api.movie(idorLink).catch((e) => providerErrorHander(e, api));
        if (result) {
            instance.emit("tmdb:getMovie", idorLink, result);
            return result;
        }
        return null;
    }));
    instance.methodsManager.register("tmdb:getEpisode", (idorLink, language = "es") => __awaiter(void 0, void 0, void 0, function* () {
        var api = apis()[0];
        api.setRequester(requester);
        var result = yield api.episode(idorLink).catch((e) => providerErrorHander(e, api));
        if (result) {
            instance.emit("tmdb:getEpisode", idorLink, result);
            return result;
        }
        return null;
    }));
    instance.methodsManager.register("tmdb:getSeasons", (id, language = "es") => __awaiter(void 0, void 0, void 0, function* () {
        var api = apis()[0];
        api.setRequester(requester);
        var result = yield api.seasons(id, { language: language }).catch(e => providerErrorHander(e, api));
        if (result) {
            instance.emit("tmdb:getSeason", id, result);
            return result;
        }
        return null;
    }));
    instance.methodsManager.register("tmdb:getSeason", (id, season, language = "es") => __awaiter(void 0, void 0, void 0, function* () {
        var api = apis()[0];
        api.setRequester(requester);
        var result = yield api.season(id, season, { language: language }).catch(e => providerErrorHander(e, api));
        if (result) {
            instance.emit("tmdb:getSeason", id, season, result);
            return result;
        }
        return null;
    }));
    instance.emit("mf:loaded", {
        sort: exports.sort,
        use: exports.use,
        providers,
        Requester: requester_1.default,
        apis
    });
};
exports.use = use;
exports.default = {
    sort: exports.sort,
    use: exports.use,
    providers,
    Requester: requester_1.default,
    apis
};
