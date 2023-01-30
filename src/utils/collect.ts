import _, { get, has, set, isArray, isString } from "lodash";


function toKeys(key:any): string[] {
    
    if(isArray(key)) {
        return key.map(k => `${k}`);
    }

    return [`${key}`];

}


function getMultiple(obj:any, key:any): any | null {

    var keys = toKeys(key);

    for(var i = 0; i < keys.length; i++) {
        if(has(obj, keys[i])) {
            return get(obj, keys[i]);
        }
    }
    
    return null
 
}


export default class Collect {
   
    private data:any = {};

    constructor(data:any = {}) {
        this.data = data;
    }

    static  from(data:any) : Collect{
        return new Collect(data);
    }


    asString(key:any, def?:string) : string {
        return `${getMultiple(this.data, key) ?? def ?? ""}`;
    }

    asNumber(key:any, def?:number) : number {
        return Number(getMultiple(this.data, key) ?? def ?? 0);
    }

    asBoolean(key:any, def?:boolean) : boolean {
        return Boolean(getMultiple(this.data, key) ?? def ?? false);
    }

    asArray(key:any, def?:any[]) : any[] {
        return getMultiple(this.data, key) ?? def ?? [];
    }

    asObject(key:any, def?:any) : any {
        return getMultiple(this.data, key) ?? def ?? {};
    }

    each(key:any, callback:(value:any, key:string) => void) {
       
        _.each(getMultiple(this.data, key), (value, key) => {
            callback(value, `${key}`);
        });
        
    }

    
    
}