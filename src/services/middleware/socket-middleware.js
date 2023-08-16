export const socketMiddleware = (wsUrl, wsActions, user) => {
    return store => {
        let socket = null;

        return next => action => {
            const {dispatch} = store;
            const {type, payload} = action;
            const {wsInit, wsSendMessage, onOpen, onClose, onError, onMessage} = wsActions;
            const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');
            let wsCheckOpen = null;

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
                    dispatch({type: onMessage, payload: data});
                };

                socket.onclose = event => {
                    wsCheckOpen ? socket.open() :
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
    };
};