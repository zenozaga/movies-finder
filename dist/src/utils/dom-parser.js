"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = require("cheerio");
var DOMParser = /** @class */ (function () {
    function DOMParser(html) {
        this.$ = (0, cheerio_1.load)(html);
    }
    DOMParser.parse = function (html) {
        return new DOMParser(html);
    };
    Object.defineProperty(DOMParser.prototype, "document", {
        get: function () {
            return this.$;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DOMParser.prototype, "html", {
        get: function () {
            return this.$.html();
        },
        enumerable: false,
        configurable: true
    });
    DOMParser.prototype.find = function (selector) {
        return this.$(selector);
    };
    DOMParser.prototype.findOne = function (selector) {
        return this.$(selector).first();
    };
    DOMParser.prototype.querySelector = function (selector) {
        return this.findOne(selector);
    };
    DOMParser.prototype.querySelectorAll = function (selector) {
        return this.find(selector);
    };
    DOMParser.prototype.getElementsByTagName = function (tagName) {
        return this.find(tagName);
    };
    DOMParser.prototype.getElementsByClassName = function (className) {
        return this.find(".".concat(className));
    };
    DOMParser.prototype.getElementById = function (id) {
        return this.findOne("#".concat(id));
    };
    return DOMParser;
}());
exports.default = DOMParser;
