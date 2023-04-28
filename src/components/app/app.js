import React from 'react';
import Header from '../header/header';
import appStyles from './app.module.css';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {BurgerIngredientsContext} from "../../services/burger-ingredients-context";
import {BurgerConstructorContext} from "../../services/burger-constructor-context";
import {burgerConstructorReducer, ingInitialState} from "../../services/burger-constructor-reducer";
import {request} from "../../utils/request";

function App() {
    const [ingList, setIngList] = React.useState({
        isLoading: false,
        hasError: false,
        data: []
    });

    const [ingredientItems, ingredientItemDispatcher] = React.useReducer(burgerConstructorReducer, ingInitialState, undefined);

    React.useEffect(() => {
        const getIngredients = () => {
            const endPoint = '/ingredients';
            setIngList({...ingList, hasError: false, isLoading: true});
            request(endPoint)
                .then(data => setIngList({data: data.data, isLoading: false, hasError: false}))
                .catch(error => {
                    setIngList({data: [], isLoading: false, hasError: true});
                    console.error('Произошла ошибка. Код ошибки =>', error);
                });
        }

        getIngredients();
    }, [])
    return (
        <>
            <Header/>
            <main className={appStyles.main}>
                <BurgerIngredientsContext.Provider value={{ingList, setIngList}}>
                    <BurgerConstructorContext.Provider value={{ingredientItems, ingredientItemDispatcher}}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </BurgerConstructorContext.Provider>
                </BurgerIngredientsContext.Provider>

            </main>
        </>
    )
}

export default App;
