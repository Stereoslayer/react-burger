import {TWsActionsType} from "../actions/wsActions";
import {AnyAction, Middleware, MiddlewareAPI} from "redux";
import {AppDispatch, RootState} from "../../utils/types";

const wsUrl: string = 'wss://norma.nomoreparties.space/orders';
export const socketMiddleware = (wsActions: TWsActionsType): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: AnyAction) => {
            const {dispatch} = store;
            const {type, payload} = action;
            const {wsInit, wsSendMessage, onOpen, onClose, onError, onMessage} = wsActions;
            let wsCheckOpen: boolean | null = null;

            if (type === wsInit) {
                socket = new WebSocket(`${wsUrl}${payload}`)
                wsCheckOpen = true;
            }

            if (socket) {

                socket.onopen = event => {
                    dispatch({type: onOpen, payload: event});
                };

                socket.onerror = event => {
                    dispatch({type: onError, payload: event});
                };

                socket.onmessage = event => {
                    const {data} = event;
                    dispatch({type: onMessage, payload: JSON.parse(data)});
                };

                socket.onclose = event => {
                    wsCheckOpen ? socket = new WebSocket(`${wsUrl}${payload}`) :
                        dispatch({type: onClose, payload: event});
                };

                if (type === wsSendMessage) {
                    socket.send(JSON.stringify(payload));
                }

                if (type === onClose) {
                    socket.close();
                    wsCheckOpen = false;
                }
            }
            next(action);
        };
    });
};