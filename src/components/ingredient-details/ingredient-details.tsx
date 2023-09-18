import ingredientDetailsStyle from './ingredient-details.module.css';
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getIngredients} from "../../services/actions/ingredients";
import {RootState, useSelector, useDispatch} from "../../utils/types";


function IngredientDetails() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const {id} = useParams<{ id?: string }>();
    const {ingredients} = useSelector((state: RootState) => state.ingredients);
    const ingredient: any = ingredients.find(item => item._id === id);

    useEffect(() => {
        dispatch(getIngredients())
            .then(() => {
                setLoaded(true);
            })
    }, []);


    return loaded ? (
        <div className={ingredientDetailsStyle.box}>
            <div className={ingredientDetailsStyle.title}>
                <h2 className="text text_type_main-large mt-3">Детали ингредиента</h2></div>
            <img src={ingredient.image_large} alt={ingredient.name} className={ingredientDetailsStyle.image}/>
            <p className="text text_type_main-medium mt-4">{ingredient.name}</p>
            <ul className={`${ingredientDetailsStyle.list} mt-8`}>
                <li className={`${ingredientDetailsStyle.item} text text_type_main-default text_color_inactive`}>Калории,ккал<span
                    className="text text_type_digits-default text_color_inactive">{ingredient.calories}</span></li>
                <li className={`${ingredientDetailsStyle.item} text text_type_main-default text_color_inactive`}>Белки,
                    г<span className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</span>
                </li>
                <li className={`${ingredientDetailsStyle.item} text text_type_main-default text_color_inactive`}>Жиры, г<span
                    className="text text_type_digits-default text_color_inactive">{ingredient.fat}</span></li>
                <li className={`${ingredientDetailsStyle.item} text text_type_main-default text_color_inactive`}>Углеводы,
                    г<span
                        className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</span>
                </li>
            </ul>
        </div>
    ) : null
}


export default IngredientDetails;