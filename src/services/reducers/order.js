import {POST_ORDER_ERROR, POST_ORDER_REQUEST, POST_ORDER_SUCCESS} from "../actions/order";

const createOrderInitialState = {
    orderRequest: false,
    orderFailed: false,
    success: false
};
export const createOrderReducer = (state = createOrderInitialState, action) => {
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
                order: action.data.order.number,
                orderRequest: false,
                success: true
            };
        }
        case POST_ORDER_ERROR: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
                order: ''
            };
        }
        default: {
            return state
        }
    }
};