"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
class DOMParser {
    constructor(html) {
        this.$ = (0, cheerio_1.load)(html);
    }
    static parse(html) {
        return new DOMParser(html);
    }
    get document() {
        return this.$;
    }
    get html() {
        return this.$.html();
    }
    find(selector) {
        return this.$(selector);
    }
    findOne(selector) {
        return this.$(selector).first();
    }
    querySelector(selector) {
        return this.findOne(selector);
    }
    querySelectorAll(selector) {
        return this.find(selector);
    }
    getElementsByTagName(tagName) {
        return this.find(tagName);
    }
    getElementsByClassName(className) {
        return this.find(`.${className}`);
    }
    getElementById(id) {
        return this.findOne(`#${id}`);
    }
}
exports.default = DOMParser;
