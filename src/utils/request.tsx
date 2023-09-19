import {checkResponse} from "./checkResponse";
import {baseUrl} from "./base-url";
import {TRequestOptionsType} from "./types";

export function request(endPoint: string, options?: TRequestOptionsType) {
    const url: string = baseUrl + endPoint;
    return fetch(url, options).then(checkResponse)
}
