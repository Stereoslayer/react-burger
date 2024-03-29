import burgerIngredientItemStyle from './burger-ingredient-item.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredientPropType, useSelector} from '../../../utils/types';
import {useDrag} from "react-dnd";
import React, {FC} from "react";
import {useNavigate} from "react-router-dom";


const BurgerIngredientItem: FC<TIngredientPropType> = ({ingredient}) => {
    const navigate = useNavigate();
    const ingredientItems = useSelector((state) => state.burgerConstructor);

    const showIngDetails = () => {
        navigate(`ingredients/${ingredient._id}`, {state: {modal: true}});
    }

    const [, ref] = useDrag({
        type: 'items',
        item: ingredient
    })


    let ingredientCounter = 0;
    React.useMemo(() => ingredientItems.forEach((item: { _id: any; type: string; }) => item._id === ingredient._id && (item.type === 'bun' ? (ingredientCounter += 2) : (ingredientCounter += 1))), [ingredientItems]);


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

export default BurgerIngredientItem;