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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importStar(require("lodash"));
function toKeys(key) {
    if ((0, lodash_1.isArray)(key)) {
        return key.map(k => `${k}`);
    }
    return [`${key}`];
}
function getMultiple(obj, key) {
    var keys = toKeys(key);
    for (var i = 0; i < keys.length; i++) {
        if ((0, lodash_1.has)(obj, keys[i])) {
            return (0, lodash_1.get)(obj, keys[i]);
        }
    }
    return null;
}
class Collect {
    constructor(data = {}) {
        this.data = {};
        this.data = data;
    }
    static from(data) {
        return new Collect(data);
    }
    asString(key, def) {
        var _a, _b;
        return `${(_b = (_a = getMultiple(this.data, key)) !== null && _a !== void 0 ? _a : def) !== null && _b !== void 0 ? _b : ""}`;
    }
    asNumber(key, def) {
        var _a, _b;
        return Number((_b = (_a = getMultiple(this.data, key)) !== null && _a !== void 0 ? _a : def) !== null && _b !== void 0 ? _b : 0);
    }
    asBoolean(key, def) {
        var _a, _b;
        return Boolean((_b = (_a = getMultiple(this.data, key)) !== null && _a !== void 0 ? _a : def) !== null && _b !== void 0 ? _b : false);
    }
    asArray(key, def) {
        var _a, _b;
        return (_b = (_a = getMultiple(this.data, key)) !== null && _a !== void 0 ? _a : def) !== null && _b !== void 0 ? _b : [];
    }
    asObject(key, def) {
        var _a, _b;
        return (_b = (_a = getMultiple(this.data, key)) !== null && _a !== void 0 ? _a : def) !== null && _b !== void 0 ? _b : {};
    }
    each(key, callback) {
        lodash_1.default.each(getMultiple(this.data, key), (value, key) => {
            callback(value, `${key}`);
        });
    }
}
exports.default = Collect;
