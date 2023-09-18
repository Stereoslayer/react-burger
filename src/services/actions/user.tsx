import {request} from "../../utils/request";
import {baseUrl} from "../../utils/base-url";
import {checkResponse} from "../../utils/checkResponse";
import {WS_CONNECTION_START} from "./wsActions";
import {AppDispatch, TRequestOptionsType, TUserDataType, TUserType} from "../../utils/types";


export const REGISTRATION_REQUEST: 'REGISTRATION_REQUEST' = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS' = 'REGISTRATION_SUCCESS';
export const REGISTRATION_ERROR: 'REGISTRATION_ERROR' = 'REGISTRATION_ERROR';
export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_ERROR: 'LOGIN_ERROR' = 'LOGIN_ERROR';
export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR: 'LOGOUT_ERROR' = 'LOGOUT_ERROR';
export const GETUSER_REQUEST: 'GETUSER_REQUEST' = 'GETUSER_REQUEST';
export const GETUSER_SUCCESS: 'GETUSER_SUCCESS' = 'GETUSER_SUCCESS';
export const GETUSER_ERROR: 'GETUSER_ERROR' = 'GETUSER_ERROR';
export const UPDATEUSER_REQUEST: 'UPDATEUSER_REQUEST' = 'UPDATEUSER_REQUEST';
export const UPDATEUSER_SUCCESS: 'UPDATEUSER_SUCCESS' = 'UPDATEUSER_SUCCESS';
export const UPDATEUSER_ERROR: 'UPDATEUSER_ERROR' = 'UPDATEUSER_ERROR';
export const RESETPASSWORD_REQUEST: 'RESETPASSWORD_REQUEST' = 'RESETPASSWORD_REQUEST';
export const RESETPASSWORD_SUCCESS: 'RESETPASSWORD_SUCCESS' = 'RESETPASSWORD_SUCCESS';
export const RESETPASSWORD_ERROR: 'RESETPASSWORD_ERROR' = 'RESETPASSWORD_ERROR';
export const CHANGEPASSWORD_REQUEST: 'CHANGEPASSWORD_REQUEST' = 'CHANGEPASSWORD_REQUEST';
export const CHANGEPASSWORD_SUCCESS: 'CHANGEPASSWORD_SUCCESS' = 'CHANGEPASSWORD_SUCCESS';
export const CHANGEPASSWORD_ERROR: 'CHANGEPASSWORD_ERROR' = 'CHANGEPASSWORD_ERROR';

export interface IRegistrationRequestActions {
    readonly type: typeof REGISTRATION_REQUEST;
}

export interface IRegistrationSuccessActions {
    readonly type: typeof REGISTRATION_SUCCESS;
    data: TUserDataType;
}

export interface IRegistrationErrorActions {
    readonly type: typeof REGISTRATION_ERROR;
    data: any;
}

export interface ILoginRequestActions {
    readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessActions {
    readonly type: typeof LOGIN_SUCCESS;
    data: any;
}

export interface ILoginErrorActions {
    readonly type: typeof LOGIN_ERROR;
}

export interface ILogoutRequestActions {
    readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessActions {
    readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutErrorActions {
    readonly type: typeof LOGOUT_ERROR;
}

export interface IGetUserRequestActions {
    readonly type: typeof GETUSER_REQUEST;
}

export interface IGetUserSuccessActions {
    readonly type: typeof GETUSER_SUCCESS;
    data: any;
}

export interface IGetUserErrorActions {
    readonly type: typeof GETUSER_ERROR;
    data: any;
}

export interface IUpdateUserRequestActions {
    readonly type: typeof UPDATEUSER_REQUEST;
}

export interface IUpdateUserSuccessActions {
    readonly type: typeof UPDATEUSER_SUCCESS;
    data: any;
}

export interface IUpdateUserErrorActions {
    readonly type: typeof UPDATEUSER_ERROR;
    data: any;
}

export interface IResetPasswordRequestActions {
    readonly type: typeof RESETPASSWORD_REQUEST;
}

export interface IResetPasswordSuccessActions {
    readonly type: typeof RESETPASSWORD_SUCCESS;
    data: any;
}

export interface IResetPasswordErrorActions {
    readonly type: typeof RESETPASSWORD_ERROR;
    data?: any;
}

export interface IChangePasswordRequestActions {
    readonly type: typeof CHANGEPASSWORD_REQUEST;
}

export interface IChangePasswordSuccessActions {
    readonly type: typeof CHANGEPASSWORD_SUCCESS;
}

export interface IChangePasswordErrorActions {
    readonly type: typeof CHANGEPASSWORD_ERROR;
    data?: any;
}

export type TUserActions =
    IRegistrationRequestActions
    | IRegistrationSuccessActions
    | IRegistrationErrorActions
    | ILoginRequestActions
    | ILoginSuccessActions
    | ILoginErrorActions
    | ILogoutRequestActions
    | ILogoutSuccessActions
    | ILogoutErrorActions
    | IGetUserRequestActions
    | IGetUserSuccessActions
    | IGetUserErrorActions
    | IUpdateUserRequestActions
    | IUpdateUserSuccessActions
    | IUpdateUserErrorActions
    | IResetPasswordRequestActions
    | IResetPasswordSuccessActions
    | IResetPasswordErrorActions
    | IChangePasswordRequestActions
    | IChangePasswordSuccessActions
    | IChangePasswordErrorActions;

let intervalId: any = null;

function clearTokens() {
    clearInterval(intervalId);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}

function setupRefreshInterval() {
    const delay = 20 * 60 * 1000; // 20 минут
    intervalId = setInterval(() => refreshToken(localStorage.getItem('refreshToken')), delay);
}

export function registration(requestOptions: TRequestOptionsType) {
    return function (dispatch: AppDispatch) {
        const endPoint = '/auth/register';
        dispatch({
            type: REGISTRATION_REQUEST
        })
        return new Promise<void>((resolve, reject) => {
            request(endPoint, requestOptions)
                .then(data => {
                    dispatch({
                        type: REGISTRATION_SUCCESS,
                        data: data
                    })
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    resolve();
                })
                .catch(err => {
                    dispatch({
                        type: REGISTRATION_ERROR,
                        data: err
                    })
                    reject();
                })
        })
    }
}

export function login(requestOptions: TRequestOptionsType) {
    return function (dispatch: AppDispatch) {
        const endPoint: string = '/auth/login';
        dispatch({
            type: LOGIN_REQUEST
        })
        return new Promise<void>((resolve, reject) => {
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
    return function (dispatch: AppDispatch) {
        const endPoint: string = '/auth/logout';
        const options: TRequestOptionsType = {
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

function refreshToken(token: any) {
    const endPoint: string = '/auth/token';
    const options: TRequestOptionsType = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            token
        })
    }
    return new Promise<void>((resolve, reject) => {
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

function fetchWithRefresh(endPoint: string, options: TRequestOptionsType) {
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
    return function (dispatch: AppDispatch) {
        const endPoint: string = '/auth/user';
        const options: TRequestOptionsType = {
            method: 'GET',
            headers: {'Authorization': localStorage.getItem('accessToken')}
        }
        dispatch({
            type: GETUSER_REQUEST
        })
        return new Promise<void>((resolve, reject) => {
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
                        });
                        dispatch({type: WS_CONNECTION_START});
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


export function updateUser(user: TUserType) {
    return function (dispatch: AppDispatch) {
        const endPoint: string = '/auth/user';
        const options: TRequestOptionsType = {
            method: 'PATCH',
            headers: {'Authorization': localStorage.getItem('accessToken')},
            body: JSON.stringify(user)
        }
        dispatch({
            type: UPDATEUSER_REQUEST
        })
        return new Promise<void>((resolve, reject) => {
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

export function resetPassword(email: string) {
    return function (dispatch: AppDispatch) {
        const endPoint: string = '/password-reset';
        const options: TRequestOptionsType = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email
            })
        }
        dispatch({
            type: RESETPASSWORD_REQUEST
        })
        return new Promise<void>((resolve, reject) => {
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

export function changePassword(password: string, token: string) {
    return function (dispatch: AppDispatch) {
        const endPoint: string = '/password-reset/reset';
        const options: TRequestOptionsType = {
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
        return new Promise<void>((resolve, reject) => {
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