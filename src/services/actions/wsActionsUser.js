export const WS_CONNECTION_START_USER = 'WS_CONNECTION_START_USER';
export const WS_CONNECTION_SUCCESS_USER = 'WS_CONNECTION_SUCCESS_USER';
export const WS_CONNECTION_ERROR_USER = 'WS_CONNECTION_ERROR_USER';
export const WS_CONNECTION_CLOSED_USER = 'WS_CONNECTION_CLOSED_USER';
export const WS_GET_MESSAGE_USER = 'WS_GET_MESSAGE_USER';
export const WS_SEND_MESSAGE_USER = 'WS_SEND_MESSAGE_USER';

export const wsActionsUser = {
    wsInit: WS_CONNECTION_START_USER,
    wsSendMessage: WS_SEND_MESSAGE_USER,
    onOpen: WS_CONNECTION_SUCCESS_USER,
    onClose: WS_CONNECTION_CLOSED_USER,
    onError: WS_CONNECTION_ERROR_USER,
    onMessage: WS_GET_MESSAGE_USER
}