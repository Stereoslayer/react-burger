import {
    HIDE_ING_DETAILS,
    HIDE_ORDER_DETAILS,
    SHOW_ING_DETAILS,
    SHOW_ORDER_DETAILS,
    TIngDetailsActions, TOrderDetailsActions
} from "../actions/popup";
import {TIngDetailsStateType} from "../../utils/types";

const ingDetailsInitialState: TIngDetailsStateType = {
    visible: false,
    currentItem: {}
}
export const ingDetailsReducer = (state = ingDetailsInitialState, action: TIngDetailsActions) => {
    switch (action.type) {
        case SHOW_ING_DETAILS: {
            return {
                ...state,
                visible: true,
                currentItem: action.payload,
            };
        }
        case HIDE_ING_DETAILS: {
            return {
                ...state,
                visible: false,
                currentItem: {},
            };
        }
        default: {
            return state;
        }
    }
};

const orderDetailsInitialState = {
    visible: false
}
export const orderDetailsReducer = (state = orderDetailsInitialState, action: TOrderDetailsActions) => {
    switch (action.type) {
        case SHOW_ORDER_DETAILS: {
            return {
                ...state,
                visible: true
            };
        }
        case HIDE_ORDER_DETAILS: {
            return {
                ...state,
                visible: false
            };
        }
        default: {
            return state;
        }
    }
};