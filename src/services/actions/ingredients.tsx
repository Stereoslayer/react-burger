import {request} from "../../utils/request"
import {AppDispatch, TIngredientType} from "../../utils/types";

export const GET_ING_REQUEST: 'GET_ING_REQUEST' = 'GET_ING_REQUEST';
export const GET_ING_SUCCESS: 'GET_ING_SUCCESS' = 'GET_ING_SUCCESS';
export const GET_ING_ERROR: 'GET_ING_ERROR' = 'GET_ING_ERROR';

export interface IGetIngRequestAction {
    readonly type: typeof GET_ING_REQUEST;
}

export interface IGetIngSuccessAction {
    readonly type: typeof GET_ING_SUCCESS;
    ingredients: Array<TIngredientType>;
}

export interface IGetIngErrorAction {
    readonly type: typeof GET_ING_ERROR;
}

export type TGetIngActions = IGetIngRequestAction | IGetIngSuccessAction | IGetIngErrorAction;

export function getIngredients() {
    return function (dispatch: AppDispatch) {
        const endPoint: string = '/ingredients';
        dispatch({
            type: GET_ING_REQUEST
        })
        return new Promise<void>((resolve) => {
            request(endPoint)
                .then(res => {
                    dispatch({
                        type: GET_ING_SUCCESS,
                        ingredients: res.data
                    })
                    resolve();
                })
                .catch(err => {
                    dispatch({
                        type: GET_ING_ERROR
                    })

                })
        })

    }
}