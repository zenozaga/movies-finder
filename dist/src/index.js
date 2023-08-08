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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = exports.sort = exports.apis = exports.providers = void 0;
var requester_1 = __importDefault(require("./models/requester"));
var tmdb_1 = __importDefault(require("./api/tmdb"));
// import Tekilaz from "./providers/tekilaz";
// import Cuevana from "./providers/cuevana/index";
var index_1 = __importDefault(require("./providers/cuevana-chat/index"));
var lodash_1 = __importDefault(require("lodash"));
var types_1 = require("./types");
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
        new index_1.default(),
        // new Tekilaz()
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
var use = function (instance) {
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
    var providerErrorHander = function (error, provider) {
        var _a;
        console.log("ProviderError: name:".concat((_a = provider === null || provider === void 0 ? void 0 : provider.name) !== null && _a !== void 0 ? _a : provider, " \nerror:").concat(error));
    };
    instance.methodsManager.register("mf:search", function (query, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(void 0, void 0, void 0, function () {
            var provs, _loop_1, result, index, state_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provs = sortProvidersByName(exports.sort, providers());
                        _loop_1 = function (index) {
                            var provider;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        provider = provs[index];
                                        provider.setRequester(requester);
                                        return [4 /*yield*/, provider.search(query, options).catch(function (e) { return providerErrorHander(e, provider); })];
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
        return __awaiter(void 0, void 0, void 0, function () {
            var _type, provs, _loop_2, result, index, state_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _type = (type == "tv" || type == "serie" || type == "series") ? "tv" : "movie";
                        provs = sortProvidersByName(exports.sort, providers());
                        _loop_2 = function (index) {
                            var provider;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        provider = provs[index];
                                        provider.setRequester(requester);
                                        return [4 /*yield*/, provider.byType(_type, options).catch(function (e) { return providerErrorHander(e, provider); })];
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
        return __awaiter(void 0, void 0, void 0, function () {
            var provs, _loop_3, result, index, state_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provs = sortProvidersByName(exports.sort, providers());
                        _loop_3 = function (index) {
                            var provider, error_1;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        provider = provs[index];
                                        if (!provider.match(idorLink)) {
                                            console.log("ProviderError: name:".concat(provider.name, " not match with ").concat(idorLink));
                                            return [2 /*return*/, "continue"];
                                        }
                                        provider.setRequester(requester);
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, provider.getById(idorLink, type).catch(function (e) { return providerErrorHander(e, provider); })];
                                    case 2:
                                        result = _b.sent();
                                        if (result && result instanceof types_1.Movie) {
                                            if (result.sources && !result.sources.length) {
                                                return [2 /*return*/, "continue"];
                                            }
                                            result.sources = result.sources.map(function (source) {
                                                lodash_1.default.set(source, "language", "klk");
                                                source.from = source.name;
                                                return source;
                                            });
                                        }
                                        if (result && result instanceof types_1.Episode) {
                                            if (result && !result.servers.length) {
                                                return [2 /*return*/, "continue"];
                                            }
                                            result.servers = result.servers.map(function (source) {
                                                source.from = source.name;
                                                lodash_1.default.set(source, "language", source.lang);
                                                return source;
                                            });
                                        }
                                        if (result) {
                                            instance.emit("mf:byID", idorLink, type, result);
                                            return [2 /*return*/, { value: result }];
                                        }
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_1 = _b.sent();
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
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
        return __awaiter(void 0, void 0, void 0, function () {
            var provs, _loop_4, result, index, state_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provs = sortProvidersByName(exports.sort, providers());
                        _loop_4 = function (index) {
                            var provider;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        provider = provs[index];
                                        provider.setRequester(requester);
                                        return [4 /*yield*/, provider.getById(idorLink, type).catch(function (e) { return providerErrorHander(e, provider); })];
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
    instance.methodsManager.register("mf:episodes", function (idorLink, type) {
        if (type === void 0) { type = ""; }
        return __awaiter(void 0, void 0, void 0, function () {
            var provs, _loop_5, result, index, state_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provs = sortProvidersByName(exports.sort, providers());
                        _loop_5 = function (index) {
                            var provider;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        provider = provs[index];
                                        provider.setRequester(requester);
                                        return [4 /*yield*/, provider.episodes(idorLink, type).catch(function (e) { return providerErrorHander(e, provider); })];
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
                        return [5 /*yield**/, _loop_5(index)];
                    case 2:
                        state_5 = _a.sent();
                        if (typeof state_5 === "object")
                            return [2 /*return*/, state_5.value];
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, null];
                }
            });
        });
    });
    instance.methodsManager.register("mf:genders", function (options, type) {
        if (type === void 0) { type = ""; }
        return __awaiter(void 0, void 0, void 0, function () {
            var provs, _loop_6, result, index, state_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provs = sortProvidersByName(exports.sort, providers());
                        _loop_6 = function (index) {
                            var provider;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        provider = provs[index];
                                        provider.setRequester(requester);
                                        return [4 /*yield*/, provider.genders(options).catch(function (e) { return providerErrorHander(e, provider); })];
                                    case 1:
                                        result = _b.sent();
                                        if (result) {
                                            instance.emit("mf:genders", options, type, result);
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
                        return [5 /*yield**/, _loop_6(index)];
                    case 2:
                        state_6 = _a.sent();
                        if (typeof state_6 === "object")
                            return [2 /*return*/, state_6.value];
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, null];
                }
            });
        });
    });
    instance.methodsManager.register("mf:home", function (options, type) {
        if (type === void 0) { type = ""; }
        return __awaiter(void 0, void 0, void 0, function () {
            var provs, _loop_7, result, index, state_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provs = sortProvidersByName(exports.sort, providers());
                        _loop_7 = function (index) {
                            var provider;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        provider = provs[index];
                                        provider.setRequester(requester);
                                        return [4 /*yield*/, provider.home().catch(function (e) { return providerErrorHander(e, provider); })];
                                    case 1:
                                        result = _b.sent();
                                        if (result) {
                                            instance.emit("mf:home", options, type, result);
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
                        return [5 /*yield**/, _loop_7(index)];
                    case 2:
                        state_7 = _a.sent();
                        if (typeof state_7 === "object")
                            return [2 /*return*/, state_7.value];
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, null];
                }
            });
        });
    });
    function getCustomSession() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var request, data, title, items, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, requester.get("https://hiroduo.com/v1/sections")];
                    case 1:
                        request = _c.sent();
                        data = request.body;
                        try {
                            data = JSON.parse(data);
                        }
                        catch (error) {
                        }
                        if (typeof data == "object" && !Array.isArray(data)) {
                            title = (_a = data.title) !== null && _a !== void 0 ? _a : "";
                            items = (_b = data.items) !== null && _b !== void 0 ? _b : [];
                            if (title && items && items.length) {
                                return [2 /*return*/, {
                                        title: title,
                                        items: items,
                                        type: "big",
                                    }];
                            }
                        }
                        else if (Array.isArray(data) && data.length) {
                            return [2 /*return*/, {
                                    title: "Mega top",
                                    items: data,
                                    type: "big",
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _c.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    }
    instance.methodsManager.register("mf:sections", function (options, type) {
        if (type === void 0) { type = ""; }
        return __awaiter(void 0, void 0, void 0, function () {
            var provs, _loop_8, result, customsessions, index, state_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provs = sortProvidersByName(exports.sort, providers());
                        _loop_8 = function (index) {
                            var provider, error_3;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        provider = provs[index];
                                        provider.setRequester(requester);
                                        return [4 /*yield*/, provider.sections().catch(function (e) { return providerErrorHander(e, provider); })];
                                    case 1:
                                        result = _b.sent();
                                        if (!(result && result.length)) return [3 /*break*/, 6];
                                        _b.label = 2;
                                    case 2:
                                        _b.trys.push([2, 4, , 5]);
                                        return [4 /*yield*/, getCustomSession()];
                                    case 3:
                                        customsessions = _b.sent();
                                        if (customsessions != null) {
                                            result = __spreadArray([customsessions], result, true);
                                        }
                                        return [3 /*break*/, 5];
                                    case 4:
                                        error_3 = _b.sent();
                                        return [3 /*break*/, 5];
                                    case 5:
                                        instance.emit("mf:sections", options, type, result);
                                        return [2 /*return*/, { value: result }];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        };
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < provs.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_8(index)];
                    case 2:
                        state_8 = _a.sent();
                        if (typeof state_8 === "object")
                            return [2 /*return*/, state_8.value];
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, null];
                }
            });
        });
    });
    instance.methodsManager.register("tmdb:search", function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var api, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    api = apis()[0];
                    api.setRequester(requester);
                    return [4 /*yield*/, api.search(query).catch(function (e) { return providerErrorHander(e, api); })];
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
    instance.methodsManager.register("tmdb:getSerie", function (idorLink) { return __awaiter(void 0, void 0, void 0, function () {
        var api, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    api = apis()[0];
                    api.setRequester(requester);
                    return [4 /*yield*/, api.serie(idorLink).catch(function (e) { return providerErrorHander(e, api); })];
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
        return __awaiter(void 0, void 0, void 0, function () {
            var api, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = apis()[0];
                        api.setRequester(requester);
                        return [4 /*yield*/, api.serieFull(idorLink, {
                                language: language
                            }).catch(function (e) { return providerErrorHander(e, api); })];
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
    instance.methodsManager.register("tmdb:getMovie", function (idorLink) { return __awaiter(void 0, void 0, void 0, function () {
        var api, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    api = apis()[0];
                    api.setRequester(requester);
                    return [4 /*yield*/, api.movie(idorLink).catch(function (e) { return providerErrorHander(e, api); })];
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
        return __awaiter(void 0, void 0, void 0, function () {
            var api, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = apis()[0];
                        api.setRequester(requester);
                        return [4 /*yield*/, api.episode(idorLink).catch(function (e) { return providerErrorHander(e, api); })];
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
        return __awaiter(void 0, void 0, void 0, function () {
            var api, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = apis()[0];
                        api.setRequester(requester);
                        return [4 /*yield*/, api.seasons(id, { language: language }).catch(function (e) { return providerErrorHander(e, api); })];
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
        return __awaiter(void 0, void 0, void 0, function () {
            var api, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = apis()[0];
                        api.setRequester(requester);
                        return [4 /*yield*/, api.season(id, season, { language: language }).catch(function (e) { return providerErrorHander(e, api); })];
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
    instance.emit("mf:loaded", {
        sort: exports.sort,
        use: exports.use,
        providers: providers,
        Requester: requester_1.default,
        apis: apis
    });
};
exports.use = use;
exports.default = {
    sort: exports.sort,
    use: exports.use,
    providers: providers,
    Requester: requester_1.default,
    apis: apis
};
