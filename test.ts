import axios,{AxiosResponse} from 'axios';
import MF, { Requester,Response } from './src';


const   toResponse = (response:   AxiosResponse):Response => {
    return {
        get string() {
            return response.data;
        },
        get body() {
            return this.string;
        },
        get json() {
            try {
                return JSON.parse(this.string);
            }
            catch (error) {
                return null;
            }
        },
        status: response.status,
        statusText: response.statusText,
        headers: Object.keys(response.headers).map((key) => {
            return {
                name: key,
                value: response.headers[key]
            }
        }) as any,
        length: response.data.length
    }
}

const requester: Requester = {
    

  
    async get(url, headers, noFollow):Promise<Response> {
        
        var response = await axios.get(url, 
            {
                headers,
                maxRedirects: noFollow ? 0 : 5
            }
        );

        return toResponse(response);
    },

    post(url, body, headers, noFollow) {
        
        return axios.post(url, body, {headers}).then((response) => {
            return toResponse(response);
        });
    
    },

    head(url, headers, noFollow) {
        return axios.head(url, {headers}).then((response) => {
            return toResponse(response);
        });
    },
}

 