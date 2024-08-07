import axios from "axios";


export interface Response {
    length: Response | undefined;

    status: number;
    statusText: string;
    headers: { [key: string]: string };

    body: any;
    string: string;
    json: any;
    toString(): string;

}

export interface RequesterType {
    get(url: string, headers: { [key: string]: string } | undefined, noFollow?: boolean): Promise<Response>;
    post(url: string, body: any, headers: { [key: string]: string } | undefined, noFollow?: boolean): Promise<Response>;
    head(url: string, headers: { [key: string]: string } | undefined, noFollow?: boolean): Promise<Response>;
}


abstract class Requester implements RequesterType {

    get(url: string, headers?: { [key: string]: string } | undefined, noFollow?: boolean): Promise<Response> {
        throw new Error("Method not implemented.");
    }

    post(url: string, body?: any, headers?: { [key: string]: string } | undefined, noFollow?: boolean): Promise<Response> {
        throw new Error("Method not implemented.");
    }

    head(url: string, headers?: { [key: string]: string } | undefined, noFollow?: boolean): Promise<Response> {
        throw new Error("Method not implemented.");
    }


    static from(obj: RequesterType): Requester {

        return {
            get(url, headers, noFollow) {
                return obj.get(url, headers, noFollow).then((response: any) => {
                    return {

                        get string() {
                            return response?.string ?? response?.data ?? response;
                        },

                        get body() {
                            return this.string;
                        },

                        get json() {
                            try {
                                return JSON.parse(this.string);
                            } catch (error) {
                                return null;
                            }
                        },

                        status: response.status ?? 200,
                        statusText: response.statusText ?? "OK",
                        headers: response.headers ?? new Headers(),

                    } as Response;

                });
            },
            post(url, body, headers, noFollow) {
                return obj.post(url, body, headers, noFollow).then((response: any) => {

                    return {

                        get string() {
                            return response?.string ?? response?.data ?? response;
                        },

                        get body() {
                            return this.string;
                        },

                        get json() {
                            try {
                                return JSON.parse(this.string);
                            } catch (error) {
                                return null;
                            }
                        },

                        status: response.status ?? 200,
                        statusText: response.statusText ?? "OK",
                        headers: response.headers ?? new Headers(),

                    } as Response;

                });
            },
            head(url, headers, noFollow) {
                return obj.head(url, headers, noFollow).then((response: any) => {

                    return {

                        get string() {
                            return response?.string ?? response?.data ?? response;
                        },

                        get body() {
                            return this.string;
                        },

                        get json() {
                            try {
                                return JSON.parse(this.string);
                            } catch (error) {
                                return null;
                            }
                        },

                        status: response.status ?? 200,
                        statusText: response.statusText ?? "OK",
                        headers: response.headers ?? new Headers(),

                    } as Response;

                });
            }
        } as Requester;

    }



    static default(): Requester {

        return Requester.from({
            async get(url: string, headers?: { [key: string]: string } | undefined, noFollow?: boolean): Promise<Response> {
                const response = await axios.get(url, {
                    headers,
                    maxRedirects: noFollow ? 0 : 5,
                })
                return {
                    status: response.status,
                    headers: response.headers as any,
                    length: response.data.length,
                    statusText: response.statusText,
                    body: response.data,
                    get string() {

                        if (typeof response.data === "object") {
                            return JSON.stringify(response.data);
                        }

                        return response.data;

                    },
                    get json() {
                        if (typeof response.data === "object") {
                            return response.data;
                        }

                        try {
                            return JSON.parse(response.data);
                        } catch (error) {
                            return null;
                        }
                    }
                }
            },
            async post(url: string, body?: any, headers?: { [key: string]: string } | undefined, noFollow?: boolean): Promise<Response> {
                
                
                const response = await axios.post(url, body, {
                    headers,
                    maxRedirects: noFollow ? 0 : 5,
                })
                return {
                    status: response.status,
                    headers: response.headers as any,
                    length: response.data.length,
                    statusText: response.statusText,
                    body: response.data,
                    get string() {

                        if (typeof response.data === "object") {
                            return JSON.stringify(response.data);
                        }

                        return response.data;

                    },
                    get json() {
                        if (typeof response.data === "object") {
                            return response.data;
                        }

                        try {
                            return JSON.parse(response.data);
                        } catch (error) {
                            return null;
                        }
                    }
                }

            },
            async head(url: string, headers?: { [key: string]: string } | undefined, noFollow?: boolean): Promise<Response> {
                
                const response = await axios.head(url, {
                    headers,
                    maxRedirects: noFollow ? 0 : 5,
                })
                return {
                    status: response.status,
                    headers: response.headers as any,
                    length: response.data.length,
                    statusText: response.statusText,
                    body: response.data,
                    get string() {

                        if (typeof response.data === "object") {
                            return JSON.stringify(response.data);
                        }

                        return response.data;

                    },
                    get json() {
                        if (typeof response.data === "object") {
                            return response.data;
                        }

                        try {
                            return JSON.parse(response.data);
                        } catch (error) {
                            return null;
                        }
                    }
                }
            }
    });

    }


}


export default Requester;