"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const src_1 = require("./src");
const toResponse = (response) => {
    console.log(response);
    var headers = {};
    return {
        statusText: response.statusText,
        status: response.status,
        body: response.data,
        string: typeof response.data === "string" ? response.data : JSON.stringify(response.data),
        headers: headers,
        toString() {
            return this.string;
        },
    };
};
const requester = {
    get(url, headers, noFollow) {
        return axios_1.default.get(url, { headers, maxRedirects: noFollow ? 0 : 5 }).then(toResponse);
    },
    post(url, body, headers, noFollow) {
        return axios_1.default.post(url, body, { headers, maxRedirects: noFollow ? 0 : 5 }).then(toResponse);
    },
    head(url, headers, noFollow) {
        return axios_1.default.head(url, { headers, maxRedirects: noFollow ? 0 : 5 }).then(toResponse);
    }
};
const provs = (0, src_1.providers)();
provs.forEach((prov) => prov.setRequester(requester));
const cuevana = provs[0];
cuevana.series().then((series) => {
    console.log(series);
});
