"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
}
exports.default = Requester;
