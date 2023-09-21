import {GET_ING_ERROR, GET_ING_REQUEST, GET_ING_SUCCESS, TGetIngActions} from "../actions/ingredients";
import {TGetIngredientsStateType} from "../../utils/types";


const getIngredientsInitialState: TGetIngredientsStateType = {
    ingRequest: false,
    ingFailed: false,
    ingredients: []
}

export const getIngredientsReducer = (state = getIngredientsInitialState, action: TGetIngActions) => {
    switch (action.type) {
        case GET_ING_REQUEST: {
            return {
                ...state,
                ingRequest: true,
                ingFailed: false,
            };
        }
        case GET_ING_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                ingRequest: false
            };
        }
        case GET_ING_ERROR: {
            return {
                ...state,
                ingFailed: true,
                ingRequest: false,
                ingredients: []
            };
        }
        default: {
            return state
        }
    }
}