import burgerIngredientItemStyle from './burger-ingredient-item.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../../utils/ingredient-type";
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import React from "react";
import {SHOW_ING_DETAILS} from "../../../services/actions/popup";

const ingredients = (state) => state.burgerConstructor;

function BurgerIngredientItem({ingredient}) {
    const dispatch = useDispatch();
    const ingredientItems = useSelector(ingredients);
    const showIngDetails = () => {
        dispatch({type: SHOW_ING_DETAILS, payload: ingredient})
    }

    const [, ref] = useDrag({
        type: 'items',
        item: ingredient
    })


    let ingredientCounter = 0;
    React.useMemo(() => ingredientItems.forEach(item => item._id === ingredient._id && (item.type === 'bun' ? (ingredientCounter += 2) : (ingredientCounter += 1))), [ingredientItems]);


    return (
        <li className={burgerIngredientItemStyle.card}
            onClick={showIngDetails} ref={ref}>
            <div className={burgerIngredientItemStyle.imagebox}>
                <Counter count={ingredientCounter} size="default" extraClass={burgerIngredientItemStyle.counter}/>
                <img src={ingredient.image} alt={ingredient.name}/>
            </div>
            <div className={`${burgerIngredientItemStyle.titlebox} mt-2 mb-2`}><p
                className="text text_type_main-default mr-2">{ingredient.price}</p><CurrencyIcon type="primary"/></div>
            <p className="mb-6">{ingredient.name}</p>
        </li>
    )
}

BurgerIngredientItem.propTypes = {
    ingredient: ingredientType.isRequired
}
export default BurgerIngredientItem;