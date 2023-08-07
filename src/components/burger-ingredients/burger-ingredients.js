import React from 'react';

import burgerIngredientsStyles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientItem from "./burger-ingredient-item/burger-ingredient-item";
import {useDispatch, useSelector} from "react-redux";

const items = (state) => state.ingredients;

function BurgerIngredients() {
    const {ingredients} = useSelector(items);
    const [current, setCurrent] = React.useState('bun')
    const tabRefBun = React.useRef(null);
    const tabRefSauce = React.useRef(null);
    const tabRefMain = React.useRef(null);

    const handleScroll = (val) => {
        if (val.target.scrollTop < tabRefSauce.current.offsetTop) {
            setCurrent('bun')
        } else if (val.target.scrollTop < tabRefMain.current.offsetTop) {
            setCurrent('sauce')
        } else {
            setCurrent('main')
        }
    }
    const scrollTo = (val) => {
        setCurrent(val)
        switch (val) {
            case 'bun':
                tabRefBun.current?.scrollIntoView()
                break

            case 'sauce': {
                tabRefSauce.current?.scrollIntoView()
                break
            }
            case 'main': {
                tabRefMain.current?.scrollIntoView()
                break
            }
            default:
        }
    }

    return (
        <section className={burgerIngredientsStyles.section}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div style={{display: 'flex'}}>
                <Tab value="bun" active={current === 'bun'} onClick={(val) => scrollTo(val)}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={(val) => scrollTo(val)}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={(val) => scrollTo(val)}>
                    Начинки
                </Tab>
            </div>
            <div className={burgerIngredientsStyles.container} onScroll={handleScroll}>
                <h2 className="text text_type_main-medium mt-10" ref={tabRefBun}>Булки</h2>
                <ul className={`${burgerIngredientsStyles.list} pt-6 pr-4 pl-4`}>
                    {ingredients.map((item) => item.type === 'bun' &&
                        <BurgerIngredientItem key={item._id} ingredient={item}/>)}
                </ul>
                <h2 className="text text_type_main-medium mt-10" ref={tabRefSauce}>Соусы</h2>
                <ul className={`${burgerIngredientsStyles.list} pt-6 pr-4 pl-4`}>
                    {ingredients.map((item) => item.type === 'sauce' &&
                        <BurgerIngredientItem key={item._id} ingredient={item}/>)}
                </ul>
                <h2 className="text text_type_main-medium mt-10" ref={tabRefMain}>Начинки</h2>
                <ul className={`${burgerIngredientsStyles.list} pt-6 pr-4 pl-4`}>
                    {ingredients.map((item) => item.type === 'main' &&
                        <BurgerIngredientItem key={item._id} ingredient={item}/>)}
                </ul>
            </div>
        </section>
    )
}

export default BurgerIngredients;