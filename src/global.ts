import MoviesFinder from '.';
 

(function(factory, root){
    
    if(typeof window !== "undefined"){
        
        var define = (window as any).define as any        

        if(typeof define === "function" && define.amd){
        
            define(factory);
        
        }else if(typeof module === "object" && module.exports){
            
            module.exports = factory();


                
            Object.defineProperty(window, "MoviesFinder", {
                get(){
                    return factory();
                }
            });

            
        }
        

    }else {
        return factory();
    }

   
    
    
})(() => {

    return MoviesFinder;

}, this)