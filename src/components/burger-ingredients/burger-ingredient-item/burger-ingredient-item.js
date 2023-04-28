import PropTypes from 'prop-types'
import burgerIngredientItemStyle from './burger-ingredient-item.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../../utils/ingredient-type";

function BurgerIngredientItem({popupOpen, ingredient, handleAddItem}) {
    return (
        <li className={burgerIngredientItemStyle.card} /*onClick={() => {
            popupOpen(ingredient)
        }}*/
            onClick={() => {
                handleAddItem(ingredient)
            }}
        >
            <div className={burgerIngredientItemStyle.imagebox}>
                <Counter count={0} size="default" extraClass={burgerIngredientItemStyle.counter}/>
                <img src={ingredient.image} alt={ingredient.name}/>
            </div>
            <div className={`${burgerIngredientItemStyle.titlebox} mt-2 mb-2`}><p
                className="text text_type_main-default mr-2">{ingredient.price}</p><CurrencyIcon type="primary"/></div>
            <p className="mb-6">{ingredient.name}</p>
        </li>
    )
}

BurgerIngredientItem.prototype = {
    ingredient: ingredientType.isRequired,
    popupOpen: PropTypes.func.isRequired,
    handleAddItem: PropTypes.func.isRequired
}
export default BurgerIngredientItem;