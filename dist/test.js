"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var src_1 = require("./src");
var toResponse = function (response) {
    console.log(response);
    var headers = {};
    return {
        statusText: response.statusText,
        status: response.status,
        body: response.data,
        string: typeof response.data === "string" ? response.data : JSON.stringify(response.data),
        headers: headers,
        toString: function () {
            return this.string;
        },
    };
};
var requester = {
    get: function (url, headers, noFollow) {
        return axios_1.default.get(url, { headers: headers, maxRedirects: noFollow ? 0 : 5 }).then(toResponse);
    },
    post: function (url, body, headers, noFollow) {
        return axios_1.default.post(url, body, { headers: headers, maxRedirects: noFollow ? 0 : 5 }).then(toResponse);
    },
    head: function (url, headers, noFollow) {
        return axios_1.default.head(url, { headers: headers, maxRedirects: noFollow ? 0 : 5 }).then(toResponse);
    }
};
var provs = (0, src_1.providers)();
provs.forEach(function (prov) { return prov.setRequester(requester); });
var cuevana = provs[0];
cuevana.series().then(function (series) {
    console.log(series);
});
