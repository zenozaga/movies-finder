import { SourceResolution, SourceTypes } from "../models/source";
import { Languages } from "../types";
export declare function slugify(text: string): string;
export declare function isValidURI(str: string): boolean;
/**
 * return origin from URL
 * @param {String} url
 * @returns {String}
 */
export declare function getOrigin(url: string): string | null;
/**
 * return host from URL
 * @param {String} url
 * @returns {String}
 */
export declare function getHost(url: string): string | null;
export declare function normalize(str: string): string;
export declare function getTypeByExtension(url: string): SourceTypes;
export declare function parseLanguage(lang: string): Languages;
export declare function parseQuality(quality: string): SourceResolution;
export declare function parseRuntime(runtime: any): string;
export declare function headersToObject(headers?: Headers): {
    [key: string]: string;
};
export declare function getYear(date: string): string;
export declare function validDate(date: string): boolean;
export declare function tryDate(date: string, def?: string): string;
export declare function tryAtob(str: string): string;
