import {
    POST_ORDER_CLEAR_STORE,
    POST_ORDER_ERROR,
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    TPostOrderActions
} from "../actions/order";
import {TCreateOrderInitialStateType} from "../../utils/types";

const createOrderInitialState: TCreateOrderInitialStateType = {
    orderRequest: false,
    orderFailed: false,
    success: false,
    number: 0
};
export const createOrderReducer = (state = createOrderInitialState, action: TPostOrderActions) => {
    switch (action.type) {
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            };
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                number: action.data.order.number,
                orderRequest: false,
                success: true
            };
        }
        case POST_ORDER_ERROR: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
                number: 0
            };
        }
        case POST_ORDER_CLEAR_STORE: {
            return {
                ...state,
                number: 0,
                orderRequest: false,
                orderFailed: false,
                success: false
            }
        }
        default: {
            return state
        }
    }
};