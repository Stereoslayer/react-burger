import ingredientDetailsStyle from './ingredient-details.module.css';

function IngredientDetails({ingredient}) {
    const {image_large, name, calories, proteins, fat, carbohydrates} = ingredient;
    return (
        <div className={ingredientDetailsStyle.box}>
            <div className={ingredientDetailsStyle.title}>
                <h2 className="text text_type_main-large mt-3">Детали ингредиента</h2></div>
            <img src={image_large} alt={name} className={ingredientDetailsStyle.image}/>
            <p className="text text_type_main-medium mt-4">{name}</p>
            <ul className={`${ingredientDetailsStyle.list} mt-8`}>
                <li className={`${ingredientDetailsStyle.item} text text_type_main-default text_color_inactive`}>Калории,ккал<span
                    className="text text_type_digits-default text_color_inactive">{calories}</span></li>
                <li className={`${ingredientDetailsStyle.item} text text_type_main-default text_color_inactive`}>Белки,
                    г<span className="text text_type_digits-default text_color_inactive">{proteins}</span></li>
                <li className={`${ingredientDetailsStyle.item} text text_type_main-default text_color_inactive`}>Жиры, г<span
                    className="text text_type_digits-default text_color_inactive">{fat}</span></li>
                <li className={`${ingredientDetailsStyle.item} text text_type_main-default text_color_inactive`}>Углеводы,
                    г<span className="text text_type_digits-default text_color_inactive">{carbohydrates}</span></li>
            </ul>
        </div>
    )
}

export default IngredientDetails;