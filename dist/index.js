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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apis = exports.providers = void 0;
var requester_1 = __importDefault(require("./models/requester"));
var tmdb_1 = __importDefault(require("./api/tmdb"));
var tekilaz_1 = __importDefault(require("./providers/tekilaz"));
var index_1 = __importDefault(require("./providers/cuevana/index"));
var index_2 = __importDefault(require("./providers/cuevana-chat/index"));
__exportStar(require("./types"), exports);
// import CuevanaChat from "./providers/cuevana-chat";
// import Cuevana from "./providers/cuevana";
/**
 * return a list of providers
 * @returns {Array<DefaultProvider>}
 */
function providers() {
    return [
        new index_2.default(),
        new index_1.default(),
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
var sortProvidersByName = function (names, provs) {
    var sorted = [];
    var rest = [];
    if (!names)
        return provs;
    if (typeof names === "string")
        names = [names];
    for (var index = 0; index < provs.length; index++) {
        var prov = provs[index];
        if (names.includes(prov.name)) {
            sorted.push(prov);
        }
        else {
            rest.push(prov);
        }
    }
    return sorted.concat(rest);
};
var MovieFinder = {
    /**
     * Sort providers by names
     * @param {Stirng[]} names
     *
     */
    sort: ["CuevanaChat", "Tekilaz", "Cuevana"],
    /**
     *
     * @param {WebViewBridged} instance
     * @returns {void}
     */
    use: function (instance) {
        var _this = this;
        var requester = requester_1.default.from({
            get: function (url, headers, noFollow) {
                return instance.http.get(url, headers, noFollow);
            },
            post: function (url, body, headers, noFollow) {
                return instance.http.post(url, body, headers, noFollow);
            },
            head: function (url, headers, noFollow) {
                return instance.http.request("HEAD", url, headers, noFollow);
            }
        });
        instance.methodsManager.register("mf:search", function (query, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var provs, _loop_1, result, index, state_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            provs = sortProvidersByName(MovieFinder.sort, providers());
                            _loop_1 = function (index) {
                                var provider;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            provider = provs[index];
                                            provider.setRequester(requester);
                                            return [4 /*yield*/, provider.search(query, options).catch(function (e) {
                                                    console.log("ProviderError: name:".concat(provider.name, " error:").concat(e));
                                                })];
                                        case 1:
                                            result = _b.sent();
                                            if (result && result.length) {
                                                instance.emit("mf:search", query, options, result);
                                                return [2 /*return*/, { value: result }];
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            index = 0;
                            _a.label = 1;
                        case 1:
                            if (!(index < provs.length)) return [3 /*break*/, 4];
                            return [5 /*yield**/, _loop_1(index)];
                        case 2:
                            state_1 = _a.sent();
                            if (typeof state_1 === "object")
                                return [2 /*return*/, state_1.value];
                            _a.label = 3;
                        case 3:
                            index++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, []];
                    }
                });
            });
        });
        instance.methodsManager.register("mf:byType", function (type, options) {
            if (type === void 0) { type = "tv"; }
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var _type, provs, _loop_2, result, index, state_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _type = (type == "tv" || type == "serie" || type == "series") ? "tv" : "movie";
                            provs = sortProvidersByName(MovieFinder.sort, providers());
                            _loop_2 = function (index) {
                                var provider;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            provider = provs[index];
                                            provider.setRequester(requester);
                                            return [4 /*yield*/, provider.byType(_type, options).catch(function (e) {
                                                    console.log("ProviderError: name:".concat(provider.name, " error:").concat(e));
                                                })];
                                        case 1:
                                            result = _b.sent();
                                            if (result && result.length) {
                                                instance.emit("mf:byType", type, options, result);
                                                return [2 /*return*/, { value: result }];
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            index = 0;
                            _a.label = 1;
                        case 1:
                            if (!(index < provs.length)) return [3 /*break*/, 4];
                            return [5 /*yield**/, _loop_2(index)];
                        case 2:
                            state_2 = _a.sent();
                            if (typeof state_2 === "object")
                                return [2 /*return*/, state_2.value];
                            _a.label = 3;
                        case 3:
                            index++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, []];
                    }
                });
            });
        });
        instance.methodsManager.register("mf:byID", function (idorLink, type) {
            if (type === void 0) { type = ""; }
            return __awaiter(_this, void 0, void 0, function () {
                var provs, _loop_3, result, index, state_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            provs = sortProvidersByName(MovieFinder.sort, providers());
                            _loop_3 = function (index) {
                                var provider;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            provider = provs[index];
                                            if (!provider.match(idorLink)) {
                                                console.log("ProviderError: name:".concat(provider.name, " not match with ").concat(idorLink));
                                                return [2 /*return*/, "continue"];
                                            }
                                            provider.setRequester(requester);
                                            return [4 /*yield*/, provider.getById(idorLink, type).catch(function (e) {
                                                    console.log("ProviderError: name:".concat(provider.name, " error:").concat(e));
                                                })];
                                        case 1:
                                            result = _b.sent();
                                            if (result) {
                                                instance.emit("mf:byID", idorLink, type, result);
                                                return [2 /*return*/, { value: result }];
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            index = 0;
                            _a.label = 1;
                        case 1:
                            if (!(index < provs.length)) return [3 /*break*/, 4];
                            return [5 /*yield**/, _loop_3(index)];
                        case 2:
                            state_3 = _a.sent();
                            if (typeof state_3 === "object")
                                return [2 /*return*/, state_3.value];
                            _a.label = 3;
                        case 3:
                            index++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, null];
                    }
                });
            });
        });
        instance.methodsManager.register("mf:episode", function (idorLink, type) {
            if (type === void 0) { type = ""; }
            return __awaiter(_this, void 0, void 0, function () {
                var provs, _loop_4, result, index, state_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            provs = sortProvidersByName(MovieFinder.sort, providers());
                            _loop_4 = function (index) {
                                var provider;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            provider = provs[index];
                                            provider.setRequester(requester);
                                            return [4 /*yield*/, provider.episodes(idorLink, type).catch(function (e) {
                                                    console.log("ProviderError: name:".concat(provider.name, " error:").concat(e));
                                                })];
                                        case 1:
                                            result = _b.sent();
                                            if (result) {
                                                instance.emit("mf:episode", idorLink, type, result);
                                                return [2 /*return*/, { value: result }];
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            index = 0;
                            _a.label = 1;
                        case 1:
                            if (!(index < provs.length)) return [3 /*break*/, 4];
                            return [5 /*yield**/, _loop_4(index)];
                        case 2:
                            state_4 = _a.sent();
                            if (typeof state_4 === "object")
                                return [2 /*return*/, state_4.value];
                            _a.label = 3;
                        case 3:
                            index++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, null];
                    }
                });
            });
        });
        instance.methodsManager.register("tmdb:search", function (query) { return __awaiter(_this, void 0, void 0, function () {
            var api, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = apis()[0];
                        api.setRequester(requester);
                        return [4 /*yield*/, api.search(query).catch(function (e) {
                                console.log("ProviderError: name:".concat(api.name, " error:").concat(e));
                            })];
                    case 1:
                        result = _a.sent();
                        if (result && result.length) {
                            instance.emit("tmdb:search", query, result);
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/, null];
                }
            });
        }); });
        instance.methodsManager.register("tmdb:getSerie", function (idorLink) { return __awaiter(_this, void 0, void 0, function () {
            var api, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = apis()[0];
                        api.setRequester(requester);
                        return [4 /*yield*/, api.serie(idorLink).catch(function (e) {
                                console.log("ProviderError: name:".concat(api.name, " error:").concat(e));
                            })];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            instance.emit("tmdb:getSerie", idorLink, result);
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/, null];
                }
            });
        }); });
        instance.methodsManager.register("tmdb:getSerieFull", function (idorLink, language) {
            if (language === void 0) { language = "es"; }
            return __awaiter(_this, void 0, void 0, function () {
                var api, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = apis()[0];
                            api.setRequester(requester);
                            return [4 /*yield*/, api.serieFull(idorLink, {
                                    language: language
                                }).catch(function (e) {
                                    console.log("ProviderError: name:".concat(api.name, " error:").concat(e));
                                })];
                        case 1:
                            result = _a.sent();
                            if (!result) {
                                throw new Error("No se pudo obtener la serie");
                            }
                            return [2 /*return*/, result];
                    }
                });
            });
        });
        instance.methodsManager.register("tmdb:getMovie", function (idorLink) { return __awaiter(_this, void 0, void 0, function () {
            var api, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = apis()[0];
                        api.setRequester(requester);
                        return [4 /*yield*/, api.movie(idorLink).catch(function (e) {
                                console.log("ProviderError: name:".concat(api.name, " error:").concat(e));
                            })];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            instance.emit("tmdb:getMovie", idorLink, result);
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/, null];
                }
            });
        }); });
        instance.methodsManager.register("tmdb:getEpisode", function (idorLink, language) {
            if (language === void 0) { language = "es"; }
            return __awaiter(_this, void 0, void 0, function () {
                var api, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = apis()[0];
                            api.setRequester(requester);
                            return [4 /*yield*/, api.episode(idorLink).catch(function (e) {
                                    console.log("ProviderError: name:".concat(api.name, " error:").concat(e));
                                })];
                        case 1:
                            result = _a.sent();
                            if (result) {
                                instance.emit("tmdb:getEpisode", idorLink, result);
                                return [2 /*return*/, result];
                            }
                            return [2 /*return*/, null];
                    }
                });
            });
        });
        instance.methodsManager.register("tmdb:getSeasons", function (id, language) {
            if (language === void 0) { language = "es"; }
            return __awaiter(_this, void 0, void 0, function () {
                var api, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = apis()[0];
                            api.setRequester(requester);
                            return [4 /*yield*/, api.seasons(id, { language: language }).catch(function (e) {
                                    console.log("ProviderError: name:".concat(api.name, " error:").concat(e));
                                })];
                        case 1:
                            result = _a.sent();
                            if (result) {
                                instance.emit("tmdb:getSeason", id, result);
                                return [2 /*return*/, result];
                            }
                            return [2 /*return*/, null];
                    }
                });
            });
        });
        instance.methodsManager.register("tmdb:getSeason", function (id, season, language) {
            if (language === void 0) { language = "es"; }
            return __awaiter(_this, void 0, void 0, function () {
                var api, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = apis()[0];
                            api.setRequester(requester);
                            return [4 /*yield*/, api.season(id, season, { language: language }).catch(function (e) {
                                    console.log("ProviderError: name:".concat(api.name, " error:").concat(e));
                                })];
                        case 1:
                            result = _a.sent();
                            if (result) {
                                instance.emit("tmdb:getSeason", id, season, result);
                                return [2 /*return*/, result];
                            }
                            return [2 /*return*/, null];
                    }
                });
            });
        });
        instance.emit("mf:loaded", MovieFinder);
    },
    /// list of providers
    providers: providers,
    Requester: requester_1.default,
    apis: apis
};
exports.default = MovieFinder;
