import PropTypes from 'prop-types'
import burgerIngredientItemStyle from './burger-ingredient-item.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredientItem({popupOpen, ingredient}) {
    const {name, proteins, fat, carbohydrates, calories, price, image, image_large} = ingredient;
    return (
        <li className={burgerIngredientItemStyle.card} onClick={() => {
            popupOpen(ingredient)
        }}>
            <div className={burgerIngredientItemStyle.imagebox}>
                <Counter count={0} size="default" extraClass={burgerIngredientItemStyle.counter}/>
                <img src={image} alt={ingredient.name}/>
            </div>
            <div className={`${burgerIngredientItemStyle.titlebox} mt-2 mb-2`}><p
                className="text text_type_main-default mr-2">{ingredient.price}</p><CurrencyIcon type="primary"/></div>
            <p className="mb-6">{ingredient.name}</p>
        </li>
    )
}

BurgerIngredientItem.prototype = {
    image: PropTypes.string,
    price: PropTypes.string,
    name: PropTypes.string,
    count: PropTypes.number,
    ingredient: PropTypes.array
}
export default BurgerIngredientItem;