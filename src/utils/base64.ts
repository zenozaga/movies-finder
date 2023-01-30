import { Buffer } from 'buffer';

export function encode(data: string): string {  
    return Buffer.from(data).toString('base64');
}

export function decode(data: string): string {
    return Buffer.from(data, 'base64').toString('ascii');
}