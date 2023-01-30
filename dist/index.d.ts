import Requester from "./models/requester";
import DefaultProvider from "./providers/default-provider";
import TMDBAPI from "./api/tmdb";
export * from "./types";
/**
 * return a list of providers
 * @returns {Array<DefaultProvider>}
 */
export declare function providers(): DefaultProvider[];
export declare function apis(): TMDBAPI[];
declare const MovieFinder: {
    /**
     * Sort providers by names
     * @param {Stirng[]} names
     *
     */
    sort: string[];
    /**
     *
     * @param {WebViewBridged} instance
     * @returns {void}
     */
    use(instance: any): void;
    providers: typeof providers;
    Requester: typeof Requester;
    apis: typeof apis;
};
export default MovieFinder;
