/**
 * 
 * JSDoc define modules
 * @typedef {import("../src/classes/webview-bridged.js").default} WebViewBridged
 * @typedef {{ instance: WebViewBridged, init:() => WebViewBridged, onInit:(callback:(instance:WebViewBridged)=>void) => void }} WebViewBridgedStatic
 * 
 * 
 */

//import WebViewBridged from "../src/classes/webview-bridged";


var req = require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        "webview-bridged": "../../../webview-bridged/dist/index.min.js",
        "Gomedia": "https://zenozaga.io/bridged/gomedia-bridged-plugin.js",
        "MoviesFinder": "./index.min.js"
    }
});


req([
    "webview-bridged",
    "Gomedia",
    "MoviesFinder"
], Initialize)


/**
 * 
 * @param {WebViewBridgedStatic} WebViewBridged 
 * @param {{use:(instance:WebViewBridged)=>{}}} Gomedia 
 * @returns 
 */
function Initialize(WebViewBridged, Gomedia, MoviesFinder){

    
    if(!WebViewBridged.isSupported){
        document.write("WebViewBridged is not supported");
        console.log("WebViewBridged is not supported");
        return ;
    }else{
        console.log("WebViewBridged is supported");
    }
    
    WebViewBridged.onInit(function(instance){

 
        MoviesFinder.sort = ["Tekilaz"]
        // apply plugins
        MoviesFinder.use(instance);
        Gomedia.use(instance);
 
 
        //console.log("Send Message to WebViewBridged w");
        instance.sendToApp("methods",{ methods: instance.methodManager.call("methods") });

    });

    WebViewBridged.init()
    
    


}