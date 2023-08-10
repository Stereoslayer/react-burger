import {request} from "../../utils/request";
import {baseUrl} from "../../utils/base-url";
import {checkResponse} from "../../utils/checkResponse";


export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const GETUSER_REQUEST = 'GETUSER_REQUEST';
export const GETUSER_SUCCESS = 'GETUSER_SUCCESS';
export const GETUSER_ERROR = 'GETUSER_ERROR';
export const UPDATEUSER_REQUEST = 'UPDATEUSER_REQUEST';
export const UPDATEUSER_SUCCESS = 'UPDATEUSER_SUCCESS';
export const UPDATEUSER_ERROR = 'UPDATEUSER_ERROR';
export const RESETPASSWORD_REQUEST = 'RESETPASSWORD_REQUEST';
export const RESETPASSWORD_SUCCESS = 'RESETPASSWORD_SUCCESS';
export const RESETPASSWORD_ERROR = 'RESETPASSWORD_ERROR';
export const CHANGEPASSWORD_REQUEST = 'CHANGEPASSWORD_REQUEST';
export const CHANGEPASSWORD_SUCCESS = 'CHANGEPASSWORD_SUCCESS';
export const CHANGEPASSWORD_ERROR = 'CHANGEPASSWORD_ERROR';


let intervalId = null;

function clearTokens() {
    clearInterval(intervalId);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}

function setupRefreshInterval() {
    const delay = 20 * 60 * 1000; // 20 минут
    intervalId = setInterval(() => refreshToken(localStorage.getItem('refreshToken')), delay);
}

export function registration(requestOptions) {
    return function (dispatch) {
        const endPoint = '/auth/register';
        dispatch({
            type: REGISTRATION_REQUEST
        })
        request(endPoint, requestOptions)
            .then(data =>
                dispatch({
                    type: REGISTRATION_SUCCESS,
                    data: data
                }))
            .catch(err => {
                debugger;
                dispatch({
                    type: REGISTRATION_ERROR,
                    data: err
                })
            })
    }
}

export function login(requestOptions) {
    return function (dispatch) {
        const endPoint = '/auth/login';
        dispatch({
            type: LOGIN_REQUEST
        })
        return new Promise((resolve, reject) => {
            request(endPoint, requestOptions)
                .then(data => {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        data: data
                    })
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    setupRefreshInterval();
                    resolve();
                })
                .catch(err => {
                    dispatch({
                        type: LOGIN_ERROR
                    })
                    reject();
                })
        })
    }
}

export function logout() {
    return function (dispatch) {
        const endPoint = '/auth/logout';
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            })
        }
        dispatch({
            type: LOGOUT_REQUEST
        })
        request(endPoint, options)
            .then(data => {
                    dispatch({
                        type: LOGOUT_SUCCESS
                    })
                    clearTokens();
                }
            )
            .catch(err => {
                dispatch({
                    type: LOGOUT_ERROR
                })
            })
    }
}

function refreshToken(token) {
    const endPoint = '/auth/token';
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            token
        })
    }
    return new Promise((resolve, reject) => {
        request(endPoint, options).then((data) => {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                resolve();
            }
        )
            .catch(err => {
                clearTokens();
                reject();
            })
    })

}

function fetchWithRefresh(endPoint, options) {
    const url = baseUrl + endPoint;
    return new Promise((resolve, reject) => {
        refreshToken(localStorage.getItem('refreshToken')).then(() => {
            options.headers = Object.assign(options.headers || {}, {'Authorization': localStorage.getItem('accessToken')})
            resolve(fetch(url, options).then(checkResponse))
        })
    })
}

//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2ZjZjg2ODJlMjc3MDAxYmZhNzQyMyIsImlhdCI6MTY5MTUxODA1MywiZXhwIjoxNjkxNTE5MjUzfQ.ArZS0zLRPzOb6zxgZcMD_4puvAz_UuXVP9u3Y2Vr5iI
export function getUser() {
    return function (dispatch) {
        const endPoint = '/auth/user';
        const options = {
            method: 'GET',
            headers: {'Authorization': localStorage.getItem('accessToken')}
        }
        dispatch({
            type: GETUSER_REQUEST
        })
        return new Promise((resolve, reject) => {
            request(endPoint, options)
                .then(data => {
                        dispatch({
                            type: GETUSER_SUCCESS,
                            data: data
                        })
                        resolve();
                    }
                )
                .catch(err => {
                    fetchWithRefresh(endPoint, options).then(data => {
                        dispatch({
                            type: GETUSER_SUCCESS,
                            data: data
                        })
                        resolve();
                    })
                        .catch(err => {
                            dispatch({
                                type: GETUSER_ERROR,
                                data: err
                            })
                            reject();
                        })
                })
        })

    }
}


export function updateUser(user) {
    return function (dispatch) {
        const endPoint = '/auth/user';
        const options = {
            method: 'PATCH',
            headers: {'Authorization': localStorage.getItem('accessToken')},
            body: JSON.stringify(user)
        }
        dispatch({
            type: UPDATEUSER_REQUEST
        })
        return new Promise((resolve, reject) => {
            request(endPoint, options)
                .then(data => {
                        dispatch({
                            type: UPDATEUSER_SUCCESS,
                            data: data
                        })
                        resolve();
                    }
                )
                .catch(err => {
                    dispatch({
                        type: UPDATEUSER_ERROR,
                        data: err
                    })
                    reject();
                })
        })

    }
}

export function resetPassword(email) {
    return function (dispatch) {
        const endPoint = '/password-reset';
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email
            })
        }
        dispatch({
            type: RESETPASSWORD_REQUEST
        })
        return new Promise((resolve, reject) => {
            request(endPoint, options)
                .then(data => {
                        dispatch({
                            type: RESETPASSWORD_SUCCESS,
                            data: data.success
                        })
                        resolve();
                    }
                )
                .catch(err => {
                    dispatch({
                        type: RESETPASSWORD_ERROR
                    })
                    reject();
                })
        })

    }
}

export function changePassword(password, token) {
    return function (dispatch) {
        const endPoint = '/password-reset/reset';
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                password,
                token
            })
        }
        dispatch({
            type: CHANGEPASSWORD_REQUEST
        })
        return new Promise((resolve, reject) => {
            request(endPoint, options)
                .then(data => {
                        dispatch({
                            type: CHANGEPASSWORD_SUCCESS
                        })
                        resolve();
                    }
                )
                .catch(err => {
                    dispatch({
                        type: CHANGEPASSWORD_ERROR
                    })
                    reject();
                })
        })

    }
}