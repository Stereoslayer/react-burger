import React from 'react';
import './index.css';
import App from '../src/components/app/app';
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./services/reducers";
import {BrowserRouter} from "react-router-dom";


const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const initialState = {
    ingredients: [],
    // constructorIngredients: [],
    ingredientDetails: '',
    // order: ''
}

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

