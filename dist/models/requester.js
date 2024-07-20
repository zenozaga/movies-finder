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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class Requester {
    get(url, headers, noFollow) {
        throw new Error("Method not implemented.");
    }
    post(url, body, headers, noFollow) {
        throw new Error("Method not implemented.");
    }
    head(url, headers, noFollow) {
        throw new Error("Method not implemented.");
    }
    static from(obj) {
        return {
            get(url, headers, noFollow) {
                return obj.get(url, headers, noFollow).then((response) => {
                    var _a, _b, _c;
                    return {
                        get string() {
                            var _a, _b;
                            return (_b = (_a = response === null || response === void 0 ? void 0 : response.string) !== null && _a !== void 0 ? _a : response === null || response === void 0 ? void 0 : response.data) !== null && _b !== void 0 ? _b : response;
                        },
                        get body() {
                            return this.string;
                        },
                        get json() {
                            try {
                                return JSON.parse(this.string);
                            }
                            catch (error) {
                                return null;
                            }
                        },
                        status: (_a = response.status) !== null && _a !== void 0 ? _a : 200,
                        statusText: (_b = response.statusText) !== null && _b !== void 0 ? _b : "OK",
                        headers: (_c = response.headers) !== null && _c !== void 0 ? _c : new Headers(),
                    };
                });
            },
            post(url, body, headers, noFollow) {
                return obj.post(url, body, headers, noFollow).then((response) => {
                    var _a, _b, _c;
                    return {
                        get string() {
                            var _a, _b;
                            return (_b = (_a = response === null || response === void 0 ? void 0 : response.string) !== null && _a !== void 0 ? _a : response === null || response === void 0 ? void 0 : response.data) !== null && _b !== void 0 ? _b : response;
                        },
                        get body() {
                            return this.string;
                        },
                        get json() {
                            try {
                                return JSON.parse(this.string);
                            }
                            catch (error) {
                                return null;
                            }
                        },
                        status: (_a = response.status) !== null && _a !== void 0 ? _a : 200,
                        statusText: (_b = response.statusText) !== null && _b !== void 0 ? _b : "OK",
                        headers: (_c = response.headers) !== null && _c !== void 0 ? _c : new Headers(),
                    };
                });
            },
            head(url, headers, noFollow) {
                return obj.head(url, headers, noFollow).then((response) => {
                    var _a, _b, _c;
                    return {
                        get string() {
                            var _a, _b;
                            return (_b = (_a = response === null || response === void 0 ? void 0 : response.string) !== null && _a !== void 0 ? _a : response === null || response === void 0 ? void 0 : response.data) !== null && _b !== void 0 ? _b : response;
                        },
                        get body() {
                            return this.string;
                        },
                        get json() {
                            try {
                                return JSON.parse(this.string);
                            }
                            catch (error) {
                                return null;
                            }
                        },
                        status: (_a = response.status) !== null && _a !== void 0 ? _a : 200,
                        statusText: (_b = response.statusText) !== null && _b !== void 0 ? _b : "OK",
                        headers: (_c = response.headers) !== null && _c !== void 0 ? _c : new Headers(),
                    };
                });
            }
        };
    }
    static default() {
        return Requester.from({
            get(url, headers, noFollow) {
                return __awaiter(this, void 0, void 0, function* () {
                    const response = yield axios_1.default.get(url, {
                        headers,
                        maxRedirects: noFollow ? 0 : 5,
                    });
                    return {
                        status: response.status,
                        headers: response.headers,
                        length: response.data.length,
                        statusText: response.statusText,
                        body: response.data,
                        get string() {
                            if (typeof response.data === "object") {
                                return JSON.stringify(response.data);
                            }
                            return response.data;
                        },
                        get json() {
                            if (typeof response.data === "object") {
                                return response.data;
                            }
                            try {
                                return JSON.parse(response.data);
                            }
                            catch (error) {
                                return null;
                            }
                        }
                    };
                });
            },
            post(url, body, headers, noFollow) {
                return __awaiter(this, void 0, void 0, function* () {
                    const response = yield axios_1.default.post(url, body, {
                        headers,
                        maxRedirects: noFollow ? 0 : 5,
                    });
                    return {
                        status: response.status,
                        headers: response.headers,
                        length: response.data.length,
                        statusText: response.statusText,
                        body: response.data,
                        get string() {
                            if (typeof response.data === "object") {
                                return JSON.stringify(response.data);
                            }
                            return response.data;
                        },
                        get json() {
                            if (typeof response.data === "object") {
                                return response.data;
                            }
                            try {
                                return JSON.parse(response.data);
                            }
                            catch (error) {
                                return null;
                            }
                        }
                    };
                });
            },
            head(url, headers, noFollow) {
                return __awaiter(this, void 0, void 0, function* () {
                    const response = yield axios_1.default.head(url, {
                        headers,
                        maxRedirects: noFollow ? 0 : 5,
                    });
                    return {
                        status: response.status,
                        headers: response.headers,
                        length: response.data.length,
                        statusText: response.statusText,
                        body: response.data,
                        get string() {
                            if (typeof response.data === "object") {
                                return JSON.stringify(response.data);
                            }
                            return response.data;
                        },
                        get json() {
                            if (typeof response.data === "object") {
                                return response.data;
                            }
                            try {
                                return JSON.parse(response.data);
                            }
                            catch (error) {
                                return null;
                            }
                        }
                    };
                });
            }
        });
    }
}
exports.default = Requester;
