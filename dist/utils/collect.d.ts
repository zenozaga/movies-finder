export default class Collect {
    private data;
    constructor(data?: any);
    static from(data: any): Collect;
    asString(key: any, def?: string): string;
    asNumber(key: any, def?: number): number;
    asBoolean(key: any, def?: boolean): boolean;
    asArray(key: any, def?: any[]): any[];
    asObject(key: any, def?: any): any;
    each(key: any, callback: (value: any, key: string) => void): void;
}
