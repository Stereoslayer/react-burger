import React from 'react';
import './index.css';
import App from './components/app/app';
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./services/reducers";
import {BrowserRouter} from "react-router-dom";
import {socketMiddleware} from "./services/middleware/socket-middleware";
import {wsActions} from "./services/actions/wsActions";
import {composeWithDevTools} from 'redux-devtools-extension';


const enhancer = composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsActions)));


export const store = createStore(rootReducer, enhancer);

const container = document.getElementById('root');

const root = createRoot(container!);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>

    </Provider>
);

