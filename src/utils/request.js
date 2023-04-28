import {checkResponse} from "./checkResponse";
import {baseUrl} from "./base-url";

export function request(endPoint, options) {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    const url = baseUrl + endPoint;
    return fetch(url, options).then(checkResponse)
}