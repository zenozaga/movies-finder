"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __importDefault(require("."));
(function (factory, root) {
    if (typeof window !== "undefined") {
        var define = window.define;
        if (typeof define === "function" && define.amd) {
            define(factory);
        }
        else if (typeof module === "object" && module.exports) {
            module.exports = factory();
            Object.defineProperty(window, "MoviesFinder", {
                get: function () {
                    return factory();
                }
            });
        }
    }
    else {
        return factory();
    }
})(function () {
    return _1.default;
}, this);
