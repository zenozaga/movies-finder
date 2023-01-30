// @ts-ignore

// import Requester from "../models/requester";

// class IMDBAPI {
    

//     /**
//      * @type {Requester}
//      */
//     requester = null;

//     setRequester = (requester) => {
//         this.requester = requester;
//     }

    
//     /**
//      * 
//      * @param {String} query 
//      * @param {{}} options 
//      * @returns 
//      */
//     async search(query, options = {}) {
        
//         return await this.requester.get(`https://www.omdbapi.com/?s=${query}&apikey=${this.apiKey}`, {});
//     }

//     /**
//      * 
//      * @param {*} id 
//      * @returns {Promise<Movie>}
//      */
//     async getById(id) {
//         return await this.requester.get(`https://www.omdbapi.com/?i=${id}&apikey=${this.apiKey}`, {});
//     }



//     /**
//      * @type {IMDBAPI}
//      */
//     static ___instance = null;


//     /** 
//      * return a IMDBAPI instance
//      * @returns {IMDBAPI}
//      */
//     static get instance() {
//         if (this.___instance === null) {
//             this.___instance = new this();
//         }
//         return this.___instance;
//     }

// }

// export default IMDBAPI;