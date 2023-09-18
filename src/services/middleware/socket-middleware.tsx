import {TWsActionsType} from "../actions/wsActions";
import {TWsUserActionsType} from "../actions/wsActionsUser";
import {AnyAction, Middleware, MiddlewareAPI} from "redux";
import {AppDispatch, RootState} from "../../utils/types";

export const socketMiddleware = (wsUrl: string, wsActions: TWsActionsType | TWsUserActionsType, user: boolean): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: AnyAction) => {
            const {dispatch} = store;
            const {type, payload} = action;
            const {wsInit, wsSendMessage, onOpen, onClose, onError, onMessage} = wsActions;
            const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');
            let wsCheckOpen: boolean | null = null;

            if (type === wsInit) {
                socket = user ? new WebSocket(`${wsUrl}?token=${token}`) :
                    socket = new WebSocket(`${wsUrl}/all`);
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
                    wsCheckOpen ? socket = user ? new WebSocket(`${wsUrl}?token=${token}`) :
                            socket = new WebSocket(`${wsUrl}/all`) :
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