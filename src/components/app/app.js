import React from 'react';
import Header from '../header/header'
import {apiLink, mocData} from '../../utils/api'
import appStyles from './app.module.css';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        data: []
    });
    const [selected, setSelected] = React.useState(mocData);

    React.useEffect(() => {
        const getIngredients = async () => {
            setState({...state, hasError: false, isLoading: true});
            const res = await fetch(apiLink);
            if (res.ok) {
                const data = await res.json();
                setState({data: data.data, isLoading: false, hasError: false});
            } else {
                setState({data: [], isLoading: false, hasError: true});
            }
        }

        getIngredients();
    }, [])
    return (
        <>
            <Header/>
            <main className={appStyles.main}>
                <BurgerIngredients data={state.data}/>
                <BurgerConstructor data={selected}/>
            </main>
        </>
    )
}

export default App;
