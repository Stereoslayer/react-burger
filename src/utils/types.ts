import {store} from '../index';
import {TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook} from 'react-redux';
import {TItemActions} from "../services/actions/burger-constructor";
import {TGetIngActions} from "../services/actions/ingredients";
import {TPostOrderActions} from "../services/actions/order";
import {TIngDetailsActions, TOrderDetailsActions} from "../services/actions/popup";
import {TUserActions} from "../services/actions/user";
import {TWsActions} from "../services/actions/wsActions";
import {ThunkDispatch} from "redux-thunk";


export type TApplicationActions =
    TItemActions
    | TGetIngActions
    | TPostOrderActions
    | TIngDetailsActions
    | TOrderDetailsActions
    | TUserActions
    | TWsActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch>();

export type TIngredientType = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    count?: number;
};

export type TIngredientWithUniqueIdType = TIngredientType & {
    uniqueId: string;
}


export type TIngredientWithIndexType = TIngredientType & {
    index: number;
}

export type TIngredientPropType = {
    ingredient: TIngredientType
};

export type TRequestOptionsType = {
    method: string,
    headers: any,
    body?: string
}

export type TOwnerType = {
    createdAt: string,
    email: string,
    name: string,
    updatedAt: string
}

export type TOrderType = {
    createdAt: string,
    ingredients: Array<TIngredientType>,
    name: string,
    number: number,
    owner: TOwnerType,
    price: number,
    status: string,
    updatedAt: string,
    _id: string
}

export type TOrderDetailsType = Omit<TOrderType, 'owner' | 'price' | 'ingredients'> & {
    ingredients: Array<string>
};

export type TOrderResponseType = {
    name: string,
    order: TOrderType,
    success: boolean
}

export type TGetIngredientsStateType = {
    ingRequest: boolean,
    ingFailed: boolean,
    ingredients: Array<TIngredientType>
}

export type TIngDetailsStateType = {
    visible: boolean,
    currentItem: {}
}

export type TUserType = {
    name: string,
    email: string
}

export type TUserDataType = {
    user: { email: string, name: string },
    success: boolean
}

export type TUserInitialStateType = {
    registrationRequest: boolean,
    registrationRequestFailed: boolean,
    registrationSuccess: boolean,
    resetPasswordRequest: boolean,
    resetPasswordRequestFailed: boolean,
    resetPasswordSuccess: boolean,
    changePasswordRequest: boolean,
    changePasswordRequestFailed: boolean,
    changePasswordSuccess: boolean,
    getUserRequest: boolean,
    getUserRequestFailed: boolean,
    getUserSuccess: boolean,
    updateUserRequest: boolean,
    updateUserRequestFailed: boolean,
    updateUserSuccess: boolean,
    loginRequest: boolean,
    loginRequestFailed: boolean,
    logoutRequest: boolean,
    logoutRequestFailed: boolean,
    loginSuccess: boolean,
    isForgotPassword: boolean,
    userData: TUserDataType | null,
    success: boolean,
    errorMessage: string | null
}

export type TWsDataType = {
    success: boolean,
    orders: TOrderDetailsType[],
    total: number,
    totalToday: number
}

export type TWsInitialStateType = {
    wsConnected: boolean,
    data: TWsDataType | null,
    error: any
}

export type TCreateOrderInitialStateType = {
    orderRequest: boolean,
    orderFailed: boolean,
    success: boolean,
    number: number
}

export type TModal = {
    onClose: () => void,
    children: React.ReactNode
}

export type TModalOverlay = {
    onClose: () => void
}

export type TOrderNumber = {
    orderNumber: number
}

export type TOrderDetailsElementType = {
    data: TOrderDetailsType;
};

export type TUserFormType = {
    name: string,
    email: string,
    password?: string
}

export type TSortableIngredientsPropType = {
    ingredient: TIngredientType,
    index: number,
    moveItem: (dragIndex: number, hoverIndex: number) => void,
    id: string
}