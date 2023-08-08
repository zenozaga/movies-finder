"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Requester = /** @class */ (function () {
    function Requester() {
    }
    Requester.prototype.get = function (url, headers, noFollow) {
        throw new Error("Method not implemented.");
    };
    Requester.prototype.post = function (url, body, headers, noFollow) {
        throw new Error("Method not implemented.");
    };
    Requester.prototype.head = function (url, headers, noFollow) {
        throw new Error("Method not implemented.");
    };
    Requester.from = function (obj) {
        return {
            get: function (url, headers, noFollow) {
                return obj.get(url, headers, noFollow).then(function (response) {
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
            post: function (url, body, headers, noFollow) {
                return obj.post(url, body, headers, noFollow).then(function (response) {
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
            head: function (url, headers, noFollow) {
                return obj.head(url, headers, noFollow).then(function (response) {
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
    };
    return Requester;
}());
exports.default = Requester;
