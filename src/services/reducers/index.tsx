import {combineReducers} from "redux";
import {getIngredientsReducer} from "./ingredients";
import {ingDetailsReducer, orderDetailsReducer} from "./popup";
import {burgerConstructorReducer} from "./burger-constructor";
import {createOrderReducer} from "./order";
import {userReducer} from "./user";
import {wsReducer} from "./wsReducer";

export const rootReducer = combineReducers({
    ingredients: getIngredientsReducer,
    ingredientDetails: ingDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: createOrderReducer,
    orderDetails: orderDetailsReducer,
    user: userReducer,
    ws: wsReducer
});

