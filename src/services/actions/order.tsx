import {request} from "../../utils/request";
import {SHOW_ORDER_DETAILS} from "./popup";
import {DELETE_ALL_ITEMS} from "./burger-constructor";
import {AppDispatch, TOrderResponseType, TRequestOptionsType} from "../../utils/types";

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_ERROR: 'POST_ORDER_ERROR' = 'POST_ORDER_ERROR';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_CLEAR_STORE: 'POST_ORDER_CLEAR_STORE' = 'POST_ORDER_CLEAR_STORE';

export interface IPostOrderRequestAction {
    readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderErrorAction {
    readonly type: typeof POST_ORDER_ERROR;
}

export interface IPostOrderSuccessAction {
    readonly type: typeof POST_ORDER_SUCCESS;
    data: TOrderResponseType;
}

export interface IPostOrderClearStoreAction {
    readonly type: typeof POST_ORDER_CLEAR_STORE;
}

export type TPostOrderActions =
    IPostOrderRequestAction
    | IPostOrderErrorAction
    | IPostOrderSuccessAction
    | IPostOrderClearStoreAction;

export function createOrder(requestOptions: TRequestOptionsType) {
    return function (dispatch: AppDispatch) {
        const endPoint: string = '/orders';
        dispatch({
            type: POST_ORDER_REQUEST
        })
        return new Promise((resolve) => {
            request(endPoint, requestOptions)
                .then(data =>
                    dispatch({
                        type: POST_ORDER_SUCCESS,
                        data: data
                    }))
                .catch(err => {
                    dispatch({
                        type: POST_ORDER_ERROR
                    })
                })
        })
    }
}

export function showOrderDetails() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: SHOW_ORDER_DETAILS
        })
    }
}

export function clearConstructor() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: DELETE_ALL_ITEMS
        })
    }
}