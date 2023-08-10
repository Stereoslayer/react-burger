import {checkResponse} from "./checkResponse";
import {baseUrl} from "./base-url";

export function request(endPoint, options) {
    const url = baseUrl + endPoint;
    return fetch(url, options).then(checkResponse)
}