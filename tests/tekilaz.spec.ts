import { describe, it } from "mocha"
import assert from "node:assert";

import { Movie, Requester, Response } from "../src"
import CuevanaChat from "../src/providers/cuevana-chat";
import Tekilaz from "../src/providers/tekilaz";
import Serie from "../src/models/serie";



const requester = Requester.default();
const tekilaz = new Tekilaz();
tekilaz.setRequester(requester);

describe("Tekilaz finder test", () => {


    // it("get hash", async () => {

    //     const hash = await tekilaz.getHash()
    //     assert.ok(typeof hash == "string")

    // })

    // it("fetch movies", async () => {

    //     const movies = await tekilaz.movies();
    //     assert.ok(movies.length > 0)
    // })


    // it("fetch a movie", async () => {

    //     const id = "https://cuevana.biz//pelicula/1062323/el-campeon"
    //     const movie = await tekilaz.movie(id);
    //     assert.ok(typeof movie == "object")

    // })


    // it("fetch series", async () => {

    //     const series = await tekilaz.series();
    //     assert.ok(series.length > 0)

    // })



    // it("fetch single serie", async () => {


    //     const id = "https://cuevana.biz/serie/68349/el-hada-de-las-pesas"
    //     const serie = await tekilaz.serie(id);

    //     assert.ok(Array.isArray(serie.seasons))

 
    // })


    // it("fetch season", async () => {

    //     const id = "https://cuevana.biz/serie/68349/el-hada-de-las-pesas"
    //     const season = await tekilaz.season("1",id)

    //     assert.ok(Array.isArray(season.episodes))
 
    // })


    it("fetch episode", async () => {

        const id =  'https://cuevana.biz/serie/68349/el-hada-de-las-pesas/temporada/0/episodio/0';
        const episode = await tekilaz.getById(id);


        console.log(episode);

    })


    
    
})