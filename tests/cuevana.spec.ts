// import { describe, it } from "mocha"
// import assert from "node:assert";

// import { Movie, Requester, Response } from "../src"
// import CuevanaChat from "../src/providers/cuevana-chat";
// import Serie from "../src/models/serie";



// const requester = Requester.default();
// const cuevana = new CuevanaChat();
// cuevana.setRequester(requester)




// describe("Cuevana finder test", () => {



//     it("find movies", async () => {

//         const movies = await cuevana.movies()
//         assert.ok(movies.length > 0)

//     })


//     it("find series", async () => {

//         const series = await cuevana.series()
//         assert.ok(series.length > 0)
//     })


//     it("fetch serie", async () => {

//         const id = "https://cuevana.biz/serie/76479/the-boys"
//         const serie = await cuevana.serie(id)
//         assert.ok(serie instanceof Serie)
//     })


//     it("fetch movie", async () => {

//         const id = "https://cuevana.biz/pelicula/982202/stella-ein-leben";
//         const movie = await cuevana.movie(id)
//         assert.ok(typeof movie == "object")
//     })


//     it("fetch season", async () => {

//         const season = await cuevana.season("1", "https://cuevana.biz/serie/96648/dulce-hogar")
//     })


// })

 