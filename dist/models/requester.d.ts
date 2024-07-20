export interface Response {
    length: Response | undefined;
    status: number;
    statusText: string;
    headers: {
        [key: string]: string;
    };
    body: any;
    string: string;
    json: any;
    toString(): string;
}
export interface RequesterType {
    get(url: string, headers: {
        [key: string]: string;
    } | undefined, noFollow?: boolean): Promise<Response>;
    post(url: string, body: any, headers: {
        [key: string]: string;
    } | undefined, noFollow?: boolean): Promise<Response>;
    head(url: string, headers: {
        [key: string]: string;
    } | undefined, noFollow?: boolean): Promise<Response>;
}
declare abstract class Requester implements RequesterType {
    get(url: string, headers?: {
        [key: string]: string;
    } | undefined, noFollow?: boolean): Promise<Response>;
    post(url: string, body?: any, headers?: {
        [key: string]: string;
    } | undefined, noFollow?: boolean): Promise<Response>;
    head(url: string, headers?: {
        [key: string]: string;
    } | undefined, noFollow?: boolean): Promise<Response>;
    static from(obj: RequesterType): Requester;
    static default(): Requester;
}
export default Requester;
