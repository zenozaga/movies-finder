import axios, {AxiosResponse} from 'axios';
import { Requester,Response, providers } from './src';


const toResponse = (response:AxiosResponse): Response => {

    console.log(response)
    var headers:{ [key: string]: string } = {};

    return {
        statusText: response.statusText,
        status: response.status,
        body: response.data,
        string: typeof response.data === "string" ? response.data : JSON.stringify(response.data),
        headers: headers,

        toString() {
            return this.string;
        },
    } as Response;
}

const requester:Requester = {
    get(url, headers, noFollow) {
        return axios.get(url, { headers, maxRedirects: noFollow ? 0 : 5 }).then(toResponse);
    },
    post(url, body, headers, noFollow) {
        return axios.post(url, body, { headers, maxRedirects: noFollow ? 0 : 5 }).then(toResponse);
    },
    head(url, headers, noFollow) {
        return axios.head(url, { headers, maxRedirects: noFollow ? 0 : 5 }).then(toResponse);
    }
}



const provs = providers();
provs.forEach((prov) => prov.setRequester(requester));

const cuevana = provs[0]

cuevana.series().then((series) => {
    console.log(series)
}) 