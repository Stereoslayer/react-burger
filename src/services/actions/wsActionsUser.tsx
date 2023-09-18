import {TWsDataType} from "../../utils/types";

export const WS_CONNECTION_START_USER: 'WS_CONNECTION_START_USER' = 'WS_CONNECTION_START_USER';
export const WS_CONNECTION_SUCCESS_USER: 'WS_CONNECTION_SUCCESS_USER' = 'WS_CONNECTION_SUCCESS_USER';
export const WS_CONNECTION_ERROR_USER: 'WS_CONNECTION_ERROR_USER' = 'WS_CONNECTION_ERROR_USER';
export const WS_CONNECTION_CLOSED_USER: 'WS_CONNECTION_CLOSED_USER' = 'WS_CONNECTION_CLOSED_USER';
export const WS_GET_MESSAGE_USER: 'WS_GET_MESSAGE_USER' = 'WS_GET_MESSAGE_USER';
export const WS_SEND_MESSAGE_USER: 'WS_SEND_MESSAGE_USER' = 'WS_SEND_MESSAGE_USER';

export interface IWsConnectionStartUserAction {
    readonly type: typeof WS_CONNECTION_START_USER;
}

export interface IWsConnectionSuccessUserAction {
    readonly type: typeof WS_CONNECTION_SUCCESS_USER;
}

export interface IWsConnectionErrorUserAction {
    readonly type: typeof WS_CONNECTION_ERROR_USER;
    payload: any;
}

export interface IWsConnectionClosedUserAction {
    readonly type: typeof WS_CONNECTION_CLOSED_USER;
}

export interface IWsGetMessageUserAction {
    readonly type: typeof WS_GET_MESSAGE_USER;
    payload: TWsDataType;
}

export interface IWsSendMessageUserAction {
    readonly type: typeof WS_SEND_MESSAGE_USER;
}

export type TWsUserActions =
    IWsConnectionStartUserAction
    | IWsConnectionSuccessUserAction
    | IWsConnectionErrorUserAction
    | IWsConnectionClosedUserAction
    | IWsGetMessageUserAction
    | IWsSendMessageUserAction;

export type TWsUserActionsType = {
    wsInit: typeof WS_CONNECTION_START_USER,
    wsSendMessage: typeof WS_SEND_MESSAGE_USER,
    onOpen: typeof WS_CONNECTION_SUCCESS_USER,
    onClose: typeof WS_CONNECTION_CLOSED_USER,
    onError: typeof WS_CONNECTION_ERROR_USER,
    onMessage: typeof WS_GET_MESSAGE_USER
}

export const wsActionsUser: TWsUserActionsType = {
    wsInit: WS_CONNECTION_START_USER,
    wsSendMessage: WS_SEND_MESSAGE_USER,
    onOpen: WS_CONNECTION_SUCCESS_USER,
    onClose: WS_CONNECTION_CLOSED_USER,
    onError: WS_CONNECTION_ERROR_USER,
    onMessage: WS_GET_MESSAGE_USER
}
