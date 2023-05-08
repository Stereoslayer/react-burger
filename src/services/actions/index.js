import {request} from "../../utils/request";

export const GET_ING_REQUEST = 'GET_ING_REQUEST';
export const GET_ING_SUCCESS = 'GET_ING_SUCCESS';
export const GET_ING_ERROR = 'GET_ING_ERROR';
export const SHOW_ING_DETAILS = 'SHOW_ING_DETAILS';
export const HIDE_ING_DETAILS = 'HIDE_ING_DETAILS';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_ALL_ITEMS = 'DELETE_ALL_ITEMS';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_ERROR = 'POST_ORDER_ERROR';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const SHOW_ORDER_DETAILS = 'SHOW_ORDER_DETAILS';
export const HIDE_ORDER_DETAILS = 'HIDE_ORDER_DETAILS';
export const SORT_ITEMS = 'SORT_ITEMS';

export function getIngredients() {
    return function (dispatch) {
        const endPoint = '/ingredients';
        dispatch({
            type: GET_ING_REQUEST
        })
        request(endPoint)
            .then(res =>
                dispatch({
                    type: GET_ING_SUCCESS,
                    ingredients: res.data
                }))
            .catch(err => {
                dispatch({
                    type: GET_ING_ERROR
                })
            })
    }
}

export function createOrder(requestOptions) {
    return function (dispatch) {
        const endPoint = '/orders';
        dispatch({
            type: POST_ORDER_REQUEST
        })
        request(endPoint, requestOptions)
            .then(data =>
                dispatch({
                    type: POST_ORDER_SUCCESS,
                    data: data
                }))
            .then(dispatch({
                type: SHOW_ORDER_DETAILS
            }))
            .then(dispatch({
                type: DELETE_ALL_ITEMS
            }))
            .catch(err => {
                dispatch({
                    type: POST_ORDER_ERROR
                })
            })
    }
}