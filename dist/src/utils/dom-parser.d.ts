import { Cheerio, CheerioAPI } from "cheerio";
declare class DOMParser {
    private $;
    constructor(html: string);
    static parse(html: string): DOMParser;
    get document(): CheerioAPI;
    get html(): string;
    find(selector: string): Cheerio<import("cheerio").AnyNode>;
    findOne(selector: string): Cheerio<import("cheerio").AnyNode>;
    querySelector(selector: string): Cheerio<import("cheerio").AnyNode>;
    querySelectorAll(selector: string): Cheerio<import("cheerio").AnyNode>;
    getElementsByTagName(tagName: string): Cheerio<import("cheerio").AnyNode>;
    getElementsByClassName(className: string): Cheerio<import("cheerio").AnyNode>;
    getElementById(id: string): Cheerio<import("cheerio").AnyNode>;
}
export default DOMParser;
