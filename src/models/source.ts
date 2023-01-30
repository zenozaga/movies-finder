import { Languages } from "../types";
import { normalize, parseLanguage } from "../utils/helpers";


export enum SourceTypes {
    MP4 = "mp4",
    WEBM = "webm",
    M3U8 = "m3u8",
    HLS = "m3u8",
    DASH = "mpd",
    MPD = "mpd"
}

export enum SourceResolution {
    SD = "360p",
    MD = "480p",
    HD = "720p",
    FULLHD = "1080p",
    UHD = "4k"
}


export interface SourceType{

    name:string;
    url:string;

    type:SourceTypes;
    resolution:SourceResolution;

    headers?:{
        [key:string]:string
    };
    
    lang:Languages;
    from:string;
    fetcher:string;

}

export default class Source  implements SourceType {
 

    name: string;
    url: string;
    type: SourceTypes;
    resolution: SourceResolution;
    headers?: { [key: string]: string; } | undefined;
    lang: Languages;
    from: string;
    fetcher: string;
    
    
    constructor(from:string, url:string, resolution:string, type:string, headers?:{[key:string]:string}, fetcher?:string, lang?:string, name?:string){
        this.from = from;
        this.url = url;
        this.resolution = Source.parseResolution(resolution);
        this.type = Source.parseType(type);
        this.headers = headers;
        this.fetcher = fetcher || "default";
        this.lang = parseLanguage(lang || "latino");
        this.name = name || "unknown";
    }


    static parseResolution(resolution:string) : SourceResolution {

        switch((resolution + "").toLowerCase()){
            
            case '240':
            case '240p':
            case '360':
            case '360p':
                return SourceResolution.SD;

            case 'sd':
            case '480':
            case '480p':
                return SourceResolution.MD;

            case '720':
            case '720p':
            case 'hd':
                return SourceResolution.HD;
            
            case 'fullhd':
            case '1080':
            case '1080p':
                return SourceResolution.FULLHD;

            case '2160':
            case '4k':
            case '4kp':
                return SourceResolution.UHD;
            
            default:
                return SourceResolution.HD;
        }

    }

    static parseType(type:string) : SourceTypes {
            
            switch((type + "").toLowerCase()){
                case 'mp4':
                    return SourceTypes.MP4;
                case 'webm':
                    return SourceTypes.WEBM;
                case 'mpd':
                    return SourceTypes.MPD;
                
                    
                case 'm3u':
                case 'm3u8':
                    return SourceTypes.HLS;
                default:
                    return SourceTypes.MP4;
            }

    }

 
    
    static fromObject(json:SourceType){
        return new Source(json.from, json.url, json.resolution, json.type, json.headers, json.fetcher, json.lang, json.name);
    }
 

    toJSON(){
        return {
            url: this.url,
            resolution: this.resolution,
            type: this.type,
            headers: this.headers,
            from: this.from,
            fetcher: this.fetcher
        };
    }

    toString(){
        return JSON.stringify(this.toJSON());
    }
}


 