export interface CategoryType {
    name: string;
    id: string;
    type: "category";
    link: string;
    poster: string;
    description: string;
    fetcher: string;
    tmdID?: string;
    imdbID?: string;
}
declare class Category implements CategoryType {
    name: string;
    id: string;
    type: "category";
    link: string;
    poster: string;
    description: string;
    fetcher: string;
    tmdID?: string;
    imdbID?: string;
    constructor(name: string, id: string, type: "category", link: string, poster: string, description: string, fetcher: string, tmdID?: string, imdbID?: string);
    static fromObject(obj: CategoryType): Category;
    toObject(): Object;
    toString(): string;
}
export default Category;
