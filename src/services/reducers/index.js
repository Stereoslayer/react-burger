import {combineReducers} from "redux";

import {
    GET_ING_REQUEST,
    GET_ING_SUCCESS,
    GET_ING_ERROR,
    SHOW_ING_DETAILS,
    HIDE_ING_DETAILS,
    ADD_ITEM,
    DELETE_ITEM,
    DELETE_ALL_ITEMS,
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_ERROR,
    SHOW_ORDER_DETAILS, HIDE_ORDER_DETAILS, SORT_ITEMS
} from '../actions/index';

const getIngredientsInitialState = {
    ingRequest: false,
    ingFailed: false,
    ingredients: []
}

export const getIngredientsReducer = (state = getIngredientsInitialState, action) => {
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
                ingRequest: false
            };
        }
        default: {
            return state
        }
    }
}

const ingDetailsInitialState = {
    visible: false,
    currentItem: {}
}
export const ingDetailsReducer = (state = ingDetailsInitialState, action) => {
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

export const burgerConstructorReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ITEM:
            let bun = state.find((x, idx) => x.type === 'bun');
            if (action.payload.type === 'bun' && bun) {
                if (action.payload._id !== bun._id) {
                    return [...state.filter(x => x.type !== 'bun'), action.payload]
                }
                return state;
            }
            return [...state, action.payload];
        case DELETE_ITEM:
            return state.filter((_, idx) => idx !== action.payload);
        case DELETE_ALL_ITEMS:
            return [];
        case SORT_ITEMS:
            return action.payload;
        default: {
            return state;
        }
    }
};

const createOrderInitialState = {
    orderRequest: false,
    orderFailed: false
}
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
                orderRequest: false
            };
        }
        case POST_ORDER_ERROR: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            };
        }
        default: {
            return state
        }
    }
};

const orderDetailsInitialState = {
    visible: false
}
export const orderDetailsReducer = (state = orderDetailsInitialState, action) => {
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


export const rootReducer = combineReducers({
    ingredients: getIngredientsReducer,
    ingredientDetails: ingDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: createOrderReducer,
    orderDetails: orderDetailsReducer
});

