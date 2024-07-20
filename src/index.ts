 

import Requester from "./models/requester";
import DefaultProvider, { Section } from "./providers/default-provider";

import TMDBAPI from "./api/tmdb";

import Tekilaz from "./providers/tekilaz";
// import Cuevana from "./providers/cuevana/index";

// import CuevanaChat from "./providers/cuevana-chat/index";
import _, { escape } from "lodash";
import { Movie, Episode } from "./types";
export * from "./types";


 

 

// import CuevanaChat from "./providers/cuevana-chat";
// import Cuevana from "./providers/cuevana";


/**
 * return a list of providers
 * @returns {Array<DefaultProvider>}
 */

export function providers() : DefaultProvider[] {

    return [
      //  new Cuevana(),
        // new CuevanaChat(),
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


/**
 * Sort providers by names
 * @param {Stirng[]} names 
 * 
 */

export const sort = ["Cuevana", "CuevanaChat", "Tekilaz"]

/**
 * 
 * @param {WebViewBridged} instance 
 * @returns {void}
 */

export const use = (instance:any) => {



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



        const providerErrorHander = (error:any, provider:any) => {
            console.log(`ProviderError: name:${provider?.name ?? provider} \nerror:${error}`);
        }
 
        instance.methodsManager.register("mf:search", async (query:string, options = {}) => {

            var provs = sortProvidersByName(sort,providers());

            for (let index = 0; index < provs.length; index++) {

                const provider = provs[index];
                provider.setRequester(requester);

                var result = await provider.search(query, options).catch(e => providerErrorHander(e, provider));

                if (result && result.length) {
                    instance.emit("mf:search", query, options, result);
                    return result;
                }
            }


            return [];

        });

        instance.methodsManager.register("mf:byType", async (type = "tv", options = {}) => {

            var _type =  (type == "tv" || type == "serie" || type == "series") ? "tv" : "movie";
            var provs = sortProvidersByName(sort,providers());


            for (let index = 0; index < provs.length; index++) {

                const provider = provs[index];
                provider.setRequester(requester);

                var result = await provider.byType(_type, options).catch(e => providerErrorHander(e,provider));
                

                if (result && result.length) {
                    instance.emit("mf:byType", type, options, result);
                    return result;
                }
            }

            return [];

        });

        instance.methodsManager.register("mf:byID", async (idorLink:string, type = "") => {

            var provs = sortProvidersByName(sort,providers());


            for (let index = 0; index < provs.length; index++) {

                const provider = provs[index];
                
                if(!provider.match(idorLink)){
                    console.log(`ProviderError: name:${provider.name} not match with ${idorLink}`);
                    continue;
                }
                
                provider.setRequester(requester);

                try {

                    var result = await provider.getById(idorLink, type).catch(e => providerErrorHander(e, provider));



                    if(result && result instanceof Movie ){

                        if(result.sources && !result.sources.length){
                            continue;
                        }

    
                        result.sources = result.sources.map((source) => {
                            _.set(source,"language", "klk")
                            source.from = source.name;
                            return source;
                        })

                    }


                    
                    if(result && result instanceof Episode ){

                        if(result && !result.servers.length){
                            continue;
                        }

                        result.servers = result.servers.map((source) => {
                            source.from = source.name;
                            _.set(source,"language", source.lang)
                            return source;
                        })

                    }
    

                    if (result) {
    
                        instance.emit("mf:byID", idorLink, type, result);
                        return result;
                        
                    }
                        
                } catch (error) {
                    
                }
               
            }

            return null;

        });

        instance.methodsManager.register("mf:episode", async (idorLink:string, type = "") => {

            var provs = sortProvidersByName(sort,providers());


            for (let index = 0; index < provs.length; index++) {

                const provider = provs[index];
                provider.setRequester(requester);

                var result = await provider.getById(idorLink, type).catch(e => providerErrorHander(e,provider));

                if (result) {
                    instance.emit("mf:episode", idorLink, type, result);
                    return result;
                }
            }

            return null;

        });


        instance.methodsManager.register("mf:episodes", async (idorLink:string, type = "") => {

            var provs = sortProvidersByName(sort,providers());


            for (let index = 0; index < provs.length; index++) {

                const provider = provs[index];
                provider.setRequester(requester);

                var result = await provider.episodes(idorLink, type).catch(e => providerErrorHander(e,provider));

                if (result) {
                    instance.emit("mf:episode", idorLink, type, result);
                    return result;
                }
            }

            return null;

        });

        instance.methodsManager.register("mf:genders", async (options:any, type = "") => {

            var provs = sortProvidersByName(sort,providers());


            for (let index = 0; index < provs.length; index++) {

                const provider = provs[index];
                provider.setRequester(requester);

                var result = await provider.genders(options).catch(e => providerErrorHander(e,provider));

                if (result) {
                    instance.emit("mf:genders", options, type, result);
                    return result;
                }
            }

            return null;

        });


        instance.methodsManager.register("mf:home", async (options:any, type = "") => {

            var provs = sortProvidersByName(sort,providers());


            for (let index = 0; index < provs.length; index++) {

                const provider = provs[index];
                provider.setRequester(requester);

                var result = await provider.home().catch(e => providerErrorHander(e,provider));

                if (result) {
                    instance.emit("mf:home", options, type, result);
                    return result;
                }
            }

            return null;

        });


        async function getCustomSession() : Promise<Section|null> {


            try {

                var request = await requester.get(`https://hiroduo.com/v1/sections`);
                var data = request.body;

                try {
                    data = JSON.parse(data)
                } catch (error) {
                    
                }

                if(typeof data == "object" && !Array.isArray(data)){

                    var title = data.title ?? "";
                    var items = data.items ?? [];

                    if(title && items && items.length){
                            
                            return { 
                                title: title,
                                items: items as any[],
                                type: "big",
                            } as Section
    
                    }


                }else if (Array.isArray(data) && data.length) {
                    return { 
                        title: "Mega top",
                        items: data as any[],
                        type: "big",
                    } as Section
                }
 
                

            } catch (error) {
                
            }

            return null

        }

        instance.methodsManager.register("mf:sections", async (options:any, type = "") => {

            var provs = sortProvidersByName(sort,providers());


            for (let index = 0; index < provs.length; index++) {

                const provider = provs[index];
                provider.setRequester(requester);

                var result = await provider.sections().catch(e => providerErrorHander(e,provider));


                if (result && result.length) {

                    try {

                        var customsessions = await getCustomSession();
                        if(customsessions != null){
                            result = [customsessions, ...result]
                        }

                    } catch (error) {
                        
                    }


                    instance.emit("mf:sections", options, type, result);
                    return result;
                }
            }

            return null;

        });

        instance.methodsManager.register("tmdb:search", async (query:string) => {

            var api = apis()[0];
            api.setRequester(requester);

            var result = await api.search(query).catch( e => providerErrorHander(e,api));

            if (result && result.length) {
                instance.emit("tmdb:search", query, result);
                return result;
            }

            return null;

        })

        instance.methodsManager.register("tmdb:getSerie", async (idorLink:string) => {

            var api = apis()[0];
            api.setRequester(requester);

            var result = await api.serie(idorLink).catch( e => providerErrorHander(e,api));

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
            }).catch( e => providerErrorHander(e,api));

            if(!result){
                throw new Error("No se pudo obtener la serie");
            }
      

            return result;

        })


        instance.methodsManager.register("tmdb:getMovie", async (idorLink:string) => {
                
                var api = apis()[0];
                api.setRequester(requester);
    
                var result = await api.movie(idorLink).catch((e) => providerErrorHander(e,api));
    
                if (result) {
                    instance.emit("tmdb:getMovie", idorLink, result);
                    return result;
                }
    
                return null;
        })

        instance.methodsManager.register("tmdb:getEpisode", async (idorLink:string, language:string = "es") => {
                
                var api = apis()[0];
                api.setRequester(requester);
    
                var result = await api.episode(idorLink).catch((e) =>  providerErrorHander(e,api));
    
                if (result) {
                    instance.emit("tmdb:getEpisode", idorLink, result);
                    return result;
                }
    
                return null;
        })

        instance.methodsManager.register("tmdb:getSeasons", async (id:string, language:string = "es") => {

            var api = apis()[0];
            api.setRequester(requester);

            var result = await api.seasons(id, {language:language}).catch( e => providerErrorHander(e,api));

            if (result) {
                instance.emit("tmdb:getSeason", id, result);
                return result;
            }

            return null;

        })

        instance.methodsManager.register("tmdb:getSeason", async (id:string, season:string, language = "es") => {

            var api = apis()[0];
            api.setRequester(requester);

            var result = await api.season(id, season, {language:language}).catch( e => providerErrorHander(e,api));

            if (result) {
                instance.emit("tmdb:getSeason", id, season, result);
                return result;
            }

            return null;

        })

        instance.emit("mf:loaded", {
            sort,
            use,
            providers,
            Requester,
            apis
        });

}

 
export default {
    sort,
    use,
    providers,
    Requester,
    apis
}