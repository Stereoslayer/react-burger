import {request} from "../../utils/request";
import {SHOW_ORDER_DETAILS} from "./popup";
import {DELETE_ALL_ITEMS} from "./burger-constructor";

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_ERROR = 'POST_ORDER_ERROR';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_CLEAR_STORE = 'POST_ORDER_CLEAR_STORE';

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