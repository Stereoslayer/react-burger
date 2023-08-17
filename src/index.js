import React from 'react';
import './index.css';
import App from '../src/components/app/app';
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./services/reducers";
import {BrowserRouter} from "react-router-dom";
import {socketMiddleware} from "./services/middleware/socket-middleware";
import {wsActions} from "./services/actions/wsActions";
import {wsActionsUser} from "./services/actions/wsActionsUser";


const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const baseWsUrl = 'wss://norma.nomoreparties.space/orders';

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(baseWsUrl, wsActions, false), socketMiddleware(baseWsUrl, wsActionsUser, true)));


const store = createStore(rootReducer, enhancer);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>

    </Provider>
);

