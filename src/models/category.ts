
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

class Category implements CategoryType {
    
    name: string;
    id: string;
    type: "category";
    link: string;
    poster: string;
    description: string;
    fetcher: string;

    tmdID?: string;
    imdbID?: string;

    constructor(name: string, id: string, type: "category", link: string, poster: string, description: string, fetcher: string, tmdID?: string, imdbID?: string) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.link = link;
        this.poster = poster;
        this.description = description;
        this.fetcher = fetcher;
    }
  


    static fromObject(obj: CategoryType) {
        return new Category(obj.name, obj.id, obj.type, obj.link, obj.poster, obj.description, obj.fetcher, obj.tmdID, obj.imdbID);
    }
    
    
    toObject() : Object {
        return {
            name: this.name,
            id: this.id,
            type: this.type,
            link: this.link,
            poster: this.poster,
            description: this.description,
            fetcher: this.fetcher,
            tmdID: this.tmdID,
            imdbID: this.imdbID
        }
    }
    

    toString() {
        return JSON.stringify(this.toObject());
    }

}

export default Category;