import {ADD_ITEM, DELETE_ALL_ITEMS, DELETE_ITEM, SORT_ITEMS, TItemActions} from "../actions/burger-constructor";
import {TIngredientWithUniqueIdType} from "../../utils/types";

const burgerConstructorInitialState: Array<TIngredientWithUniqueIdType> = [];

export const burgerConstructorReducer = (state = burgerConstructorInitialState, action: TItemActions): Array<TIngredientWithUniqueIdType> => {
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

