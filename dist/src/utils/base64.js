"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = void 0;
const buffer_1 = require("buffer");
function encode(data) {
    return buffer_1.Buffer.from(data).toString('base64');
}
exports.encode = encode;
function decode(data) {
    return buffer_1.Buffer.from(data, 'base64').toString('ascii');
}
exports.decode = decode;
