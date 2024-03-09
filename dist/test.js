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
const toResponse = (response) => {
    return {
        get string() {
            return response.data;
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
        status: response.status,
        statusText: response.statusText,
        headers: Object.keys(response.headers).map((key) => {
            return {
                name: key,
                value: response.headers[key]
            };
        }),
        length: response.data.length
    };
};
const requester = {
    get(url, headers, noFollow) {
        return __awaiter(this, void 0, void 0, function* () {
            var response = yield axios_1.default.get(url, {
                headers,
                maxRedirects: noFollow ? 0 : 5
            });
            return toResponse(response);
        });
    },
    post(url, body, headers, noFollow) {
        return axios_1.default.post(url, body, { headers }).then((response) => {
            return toResponse(response);
        });
    },
    head(url, headers, noFollow) {
        return axios_1.default.head(url, { headers }).then((response) => {
            return toResponse(response);
        });
    },
};
