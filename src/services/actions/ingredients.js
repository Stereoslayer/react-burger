import {request} from "../../utils/request"

export const GET_ING_REQUEST = 'GET_ING_REQUEST';
export const GET_ING_SUCCESS = 'GET_ING_SUCCESS';
export const GET_ING_ERROR = 'GET_ING_ERROR';

export function getIngredients() {
    return function (dispatch) {
        const endPoint = '/ingredients';
        dispatch({
            type: GET_ING_REQUEST
        })
        return new Promise((resolve, reject) => {
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
                    reject();
                })
        })

    }
}