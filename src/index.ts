 

import Requester from "./models/requester";
import DefaultProvider from "./providers/default-provider";

import TMDBAPI from "./api/tmdb";
import Tekilaz from "./providers/tekilaz";
import Cuevana from "./providers/cuevana/index";
import CuevanaChat from "./providers/cuevana-chat/index";

export * from "./types";
 

 

// import CuevanaChat from "./providers/cuevana-chat";
// import Cuevana from "./providers/cuevana";


/**
 * return a list of providers
 * @returns {Array<DefaultProvider>}
 */

export function providers() : DefaultProvider[] {

    return [
         new CuevanaChat(),
         new Cuevana(),
        new Tekilaz()
    ];
}

export function apis() : TMDBAPI[] {
    return [
        new TMDBAPI()
    ];
}


/**
 * 
 * @param {*} names 
 * @param {*} provs 
 * @returns {DefaultProvider[]} 
 */
const sortProvidersByName = (names:string[], provs:DefaultProvider[]) => {

    var sorted = [];
    var rest = [];

    if(!names) return provs;
    if(typeof names === "string") names = [names];

 
    for (let index = 0; index < provs.length; index++) {
        const prov = provs[index];
        if (names.includes(prov.name)) {
            sorted.push(prov);
        } else {
            rest.push(prov);
        }
    }

    return sorted.concat(rest);
 

}

const MovieFinder = {
    
    
    /**
     * Sort providers by names
     * @param {Stirng[]} names 
     * 
     */
    
    sort:  ["CuevanaChat","Tekilaz", "Cuevana"],


    /**
     * 
     * @param {WebViewBridged} instance 
     * @returns {void}
     */
    use(instance:any) {



        var requester = Requester.from({
            get(url, headers, noFollow) {
                return instance.http.get(url, headers, noFollow)
            },
            post(url, body, headers, noFollow) {
                return instance.http.post(url, body, headers, noFollow)
            },
            head(url, headers, noFollow) {
                return instance.http.request("HEAD", url, headers, noFollow)
            }
        })
 
        instance.methodsManager.register("mf:search", async (query:string, options = {}) => {

            var provs = sortProvidersByName(MovieFinder.sort,providers());

            for (let index = 0; index < provs.length; index++) {

                const provider = provs[index];
                provider.setRequester(requester);

                var result = await provider.search(query, options).catch((e) => {
                    console.log(`ProviderError: name:${provider.name} error:${e}`);
                });

                if (result && result.length) {
                    instance.emit("mf:search", query, options, result);
                    return result;
                }
            }


            return [];

        });

        instance.methodsManager.register("mf:byType", async (type = "tv", options = {}) => {

            var _type =  (type == "tv" || type == "serie" || type == "series") ? "tv" : "movie";
            var provs = sortProvidersByName(MovieFinder.sort,providers());


            for (let index = 0; index < provs.length; index++) {

                const provider = provs[index];
                provider.setRequester(requester);

                var result = await provider.byType(_type, options).catch((e) => {
                    console.log(`ProviderError: name:${provider.name} error:${e}`);
                });

                if (result && result.length) {
                    instance.emit("mf:byType", type, options, result);
                    return result;
                }
            }

            return [];

        });

        instance.methodsManager.register("mf:byID", async (idorLink:string, type = "") => {

            var provs = sortProvidersByName(MovieFinder.sort,providers());


            for (let index = 0; index < provs.length; index++) {

                const provider = provs[index];
                
                if(!provider.match(idorLink)){
                    console.log(`ProviderError: name:${provider.name} not match with ${idorLink}`);
                    continue;
                }
                
                provider.setRequester(requester);

                var result = await provider.getById(idorLink, type).catch((e) => {
                    console.log(`ProviderError: name:${provider.name} error:${e}`);
                });

                if (result) {
                    instance.emit("mf:byID", idorLink, type, result);
                    return result;
                }
            }

            return null;

        });

        instance.methodsManager.register("mf:episode", async (idorLink:string, type = "") => {

            var provs = sortProvidersByName(MovieFinder.sort,providers());


            for (let index = 0; index < provs.length; index++) {

                const provider = provs[index];
                provider.setRequester(requester);

                var result = await provider.episodes(idorLink, type).catch((e) => {
                    console.log(`ProviderError: name:${provider.name} error:${e}`);
                });

                if (result) {
                    instance.emit("mf:episode", idorLink, type, result);
                    return result;
                }
            }

            return null;

        });


        instance.methodsManager.register("tmdb:search", async (query:string) => {

            var api = apis()[0];
            api.setRequester(requester);

            var result = await api.search(query).catch((e) => {
                console.log(`ProviderError: name:${api.name} error:${e}`);
            });

            if (result && result.length) {
                instance.emit("tmdb:search", query, result);
                return result;
            }

            return null;

        })

        instance.methodsManager.register("tmdb:getSerie", async (idorLink:string) => {

            var api = apis()[0];
            api.setRequester(requester);

            var result = await api.serie(idorLink).catch((e) => {
                console.log(`ProviderError: name:${api.name} error:${e}`);
            });

            if (result) {
                instance.emit("tmdb:getSerie", idorLink, result);
                return result;
            }

            return null;


        })

        instance.methodsManager.register("tmdb:getSerieFull", async (idorLink:string, language = "es") => {

            var api = apis()[0];
            api.setRequester(requester);

            var result = await api.serieFull(idorLink, {
                language: language
            }).catch((e) => {
                console.log(`ProviderError: name:${api.name} error:${e}`);
            });

            if(!result){
                throw new Error("No se pudo obtener la serie");
            }
      

            return result;

        })


        instance.methodsManager.register("tmdb:getMovie", async (idorLink:string) => {
                
                var api = apis()[0];
                api.setRequester(requester);
    
                var result = await api.movie(idorLink).catch((e) => {
                    console.log(`ProviderError: name:${api.name} error:${e}`);
                });
    
                if (result) {
                    instance.emit("tmdb:getMovie", idorLink, result);
                    return result;
                }
    
                return null;
        })

        instance.methodsManager.register("tmdb:getEpisode", async (idorLink:string, language:string = "es") => {
                
                var api = apis()[0];
                api.setRequester(requester);
    
                var result = await api.episode(idorLink).catch((e) => {
                    console.log(`ProviderError: name:${api.name} error:${e}`);
                });
    
                if (result) {
                    instance.emit("tmdb:getEpisode", idorLink, result);
                    return result;
                }
    
                return null;
        })

        instance.methodsManager.register("tmdb:getSeasons", async (id:string, language:string = "es") => {

            var api = apis()[0];
            api.setRequester(requester);

            var result = await api.seasons(id, {language:language}).catch((e) => {
                console.log(`ProviderError: name:${api.name} error:${e}`);
            });

            if (result) {
                instance.emit("tmdb:getSeason", id, result);
                return result;
            }

            return null;

        })

        instance.methodsManager.register("tmdb:getSeason", async (id:string, season:string, language = "es") => {

            var api = apis()[0];
            api.setRequester(requester);

            var result = await api.season(id, season, {language:language}).catch((e) => {
                console.log(`ProviderError: name:${api.name} error:${e}`);
            });

            if (result) {
                instance.emit("tmdb:getSeason", id, season, result);
                return result;
            }

            return null;

        })

 
        instance.emit("mf:loaded", MovieFinder);
        console.log("MoviesFinder loaded");

    },

    /// list of providers
    providers,
    Requester,
    apis
};

export default MovieFinder;