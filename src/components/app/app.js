import React from 'react';
import Header from '../header/header';
import appStyles from './app.module.css';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {BurgerIngredientsContext} from "../../services/burger-ingredients-context";
import {BurgerConstructorContext} from "../../services/burger-constructor-context";
import {burgerConstructorReducer, ingInitialState} from "../../services/burger-constructor-reducer";

function App() {
    const apiLink = 'https://norma.nomoreparties.space/api/ingredients';
    const [ingList, setIngList] = React.useState({
        isLoading: false,
        hasError: false,
        data: []
    });

    const [ingredientItems, ingredientItemDispatcher] = React.useReducer(burgerConstructorReducer, ingInitialState, undefined);

    React.useEffect(() => {
        const getIngredients = async () => {
            setIngList({...ingList, hasError: false, isLoading: true});
            const res = await fetch(apiLink);
            if (res.ok) {
                const data = await res.json();
                setIngList({data: data.data, isLoading: false, hasError: false});
            } else {
                setIngList({data: [], isLoading: false, hasError: true});
            }
        }

        getIngredients();
    }, [])
    return (
        <>
            <Header/>
            <main className={appStyles.main}>
                <BurgerIngredientsContext.Provider value={{ingList}}>
                    <BurgerConstructorContext.Provider value={{ingredientItems, ingredientItemDispatcher}}>
                        <BurgerIngredients data={ingList.data}/>
                        <BurgerConstructor/>
                    </BurgerConstructorContext.Provider>
                </BurgerIngredientsContext.Provider>

            </main>
        </>
    )
}

export default App;
