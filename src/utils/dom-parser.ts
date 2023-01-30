import { Cheerio, CheerioAPI, load } from "cheerio";

class DOMParser  {

    private $: CheerioAPI;

    constructor(html:string) {
        this.$ = load(html);
    }

    static parse(html:string) {
        return new DOMParser(html);
    }



    get document() {
        return this.$;
    }

    get html() {
        return this.$.html();
    }


    find(selector:string) {
        return this.$(selector);
    }

    findOne(selector:string) {
        return this.$(selector).first();
    }

    querySelector(selector:string) {
        return this.findOne(selector);
    }

    querySelectorAll(selector:string) {
        return this.find(selector);
    }
    

    getElementsByTagName(tagName:string) {
        return this.find(tagName);
    }

    getElementsByClassName(className:string) {
        return this.find(`.${className}`);
    }

    getElementById(id:string) {
        return this.findOne(`#${id}`);
    }

  
}


export default DOMParser;