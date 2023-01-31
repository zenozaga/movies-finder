import { isNumber } from "lodash";
import { SourceResolution, SourceTypes } from "../models/source";
import { Languages } from "../types";
import { decode } from "./base64";

 
export function slugify(text:string) {

  return `${text}`.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}


export function isValidURI(str:string) {

    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);

}


/**
 * return origin from URL
 * @param {String} url 
 * @returns {String}
 */
export function getOrigin(url:string){

    if(!isValidURI(url)) return null;
    
    if(typeof window !== "undefined"){

        if(window.URL){
            return new URL(url).origin;
        }else{
            var a = document.createElement('a');
            a.href = url;
            return a.origin;
        }

    }else{
        
        // get origin by regex
        var match = url.match(/^(https?:\/\/[^/]+)/);
        if(match){
            return match[1];
        }
    }

    return url;

}


/**
 * return host from URL
 * @param {String} url 
 * @returns {String}
 */

export function getHost(url:string){
    
        if(!isValidURI(url)) return null;
        
        if(typeof window !== "undefined"){
    
            if(window.URL){
                return new URL(url).host;
            }else{
                var a = document.createElement('a');
                a.href = url;
                return a.host;
            }
    
        }else{
            
            // get origin by regex
            var match = url.match(/^(https?:\/\/[^/]+)/);
            if(match){
                return match[1];
            }
        }
    
        return url;
    
}


export function normalize(str:string){
    return `${str}`.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}


export function getTypeByExtension(url:string):  SourceTypes {

    var _url = `${url}`.toLowerCase();

    if(_url.endsWith(".mp4")) return  SourceTypes.MP4;
    if(_url.endsWith(".m3u8")) return  SourceTypes.M3U8;
    if(_url.endsWith(".mpd")) return  SourceTypes.DASH;
    if(_url.endsWith(".webm")) return  SourceTypes.WEBM;
     
    return SourceTypes.MP4;


}


export function parseLanguage(lang:string): Languages {

    // lowercase and normalize
    const _lang = normalize(lang).toLowerCase();

    if((_lang.includes("castellano") || _lang == "es" || _lang.includes("español") || _lang.includes("spanish")|| _lang.includes("espanol")) && !_lang.includes("latino")){
        return Languages.cast;
    }

    if(_lang.includes("subt") || _lang.includes("subtitulado") || _lang == "en" || _lang.includes("english") || _lang.includes("ingles")){
        return Languages.en;
    }
    
    return Languages.mx;

}


export function parseQuality(quality:string): SourceResolution {
    
        // lowercase and normalize
        const _quality = normalize(quality).toLowerCase();

        if(_quality.includes("2160p") || _quality.includes("2160") || _quality.includes("4k")){
            return SourceResolution.UHD;
        }
    
        if(_quality.includes("1080p") || _quality.includes("1080") || _quality.includes("fullhd") ){
            return SourceResolution.FULLHD;
        }
    
        if(_quality.includes("720p") || _quality.includes("720") || _quality.includes("hd") ){
            return SourceResolution.HD;
        }
    
        if(_quality.includes("480p") || _quality.includes("480") || _quality.includes("sd") ){
            return SourceResolution.SD;
        }
    
        if(_quality.includes("360p") || _quality.includes("360")){
            return SourceResolution.SD;
        }
    
        return SourceResolution.HD;
    
}


const parseDuration = (duration:string) => {

    try {

        var hours = duration.match(/(\d+)h/)?.[1] || 0;
        var minutes = duration.match(/(\d+)m/)?.[1] || 0;

        return `${hours}h ${minutes}m`;

    } catch (error) {
        return duration;
    }

};



export function parseRuntime(runtime:any) : string {

    if(!runtime) return "0h 0m";

    if(isNumber(runtime)) {
        var hours = Math.floor(runtime / 60);
        var minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
    }

    return parseDuration(runtime);

}


export function headersToObject(headers?:Headers){
    
    if(!headers) return {};
    var obj:{[key:string]:string} = {};

    headers.forEach((value, key) => {
        obj[key] = value;
    });

    return obj;

}

export function getYear(date:string){
    var _data = new Date(date);
    if(isNaN(_data.getTime())) return "";
    return `${_data.getFullYear()}`;
}

export function validDate(date:string){
    return !isNaN((new Date(date)).getTime());
}

export function tryDate(date:string, def?:string){
    if(!validDate(date)) return def ?? date;
    return new Date(date).toISOString();
}

export function tryAtob(str:string){
    try {
        return decode(str);
    } catch (error) {
        return str;
    }
}

