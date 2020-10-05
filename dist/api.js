"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var clientId = 'afernandesalmeida';
var secureId = '633a4d2b3aed3713f34f370129c166a8e8081e34';
var api = axios_1.default.create({
    baseURL: clientId + ":" + secureId + "@https://api.github.com/",
});
exports.default = api;
