export interface CastType {

    id: string;
    name: string;
    character?: string;
    type: "cast";
    avatar: string;
    link: string;
    fetcher: string;

    imdbID?: string;
    tmdbID?: string;
 

}

class Cast implements CastType {
    
    id: string;
    name: string;
    character?: string;
    type: "cast";
    avatar: string;
    link: string;
    fetcher: string;

    imdbID?: string;
    tmdbID?: string;
 
    constructor(name: string, character:string, id: string, type: "cast", avatar: string, link: string, fetcher: string, imdbID?: string, tmdbID?: string) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.avatar = avatar;
        this.link = link;
        this.fetcher = fetcher;
        this.imdbID = imdbID;
        this.tmdbID = tmdbID;
        this.character = character;
    }
    

 
    static fromObject(obj: CastType) {
        return new Cast(obj.name, obj.character ?? "", obj.id, obj.type, obj.avatar, obj.link, obj.fetcher, obj.imdbID, obj.tmdbID);
    }


    toObject() {
        return {
            name: this.name,
            character: this.character,
            id: this.id,
            type: this.type,
            avatar: this.avatar,
            link: this.link,
            fetcher: this.fetcher,
            imdbID: this.imdbID,
            tmdbID: this.tmdbID
        }
    }


    toString() {
        return JSON.stringify(this.toObject());
    }

}

export default Cast;