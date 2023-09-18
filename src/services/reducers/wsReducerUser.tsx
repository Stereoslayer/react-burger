import {
    WS_CONNECTION_SUCCESS_USER,
    WS_CONNECTION_ERROR_USER,
    WS_CONNECTION_CLOSED_USER,
    WS_GET_MESSAGE_USER, TWsUserActions
} from '../actions/wsActionsUser';
import {TWsUserInitialStateType} from "../../utils/types";

const initialState: TWsUserInitialStateType = {
    wsConnected: false,
    data: null,
    error: undefined
};

export const wsReducerUser = (state = initialState, action: TWsUserActions) => {
    switch (action.type) {
        // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
        // Установим флаг wsConnected в состояние true
        case WS_CONNECTION_SUCCESS_USER:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };

        // Опишем обработку экшена с типом WS_CONNECTION_ERROR
        // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
        case WS_CONNECTION_ERROR_USER:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };

        // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
        // Установим флаг wsConnected в состояние false
        case WS_CONNECTION_CLOSED_USER:
            return {
                ...state,
                error: undefined,
                data: null,
                wsConnected: false
            };

        // Опишем обработку экшена с типом WS_GET_MESSAGE
        // Обработка происходит, когда с сервера возвращаются данные
        // В messages передадим данные, которые пришли с сервера
        case WS_GET_MESSAGE_USER:
            return {
                ...state,
                error: undefined,
                data: action.payload
            };
        default:
            return state;
    }
};