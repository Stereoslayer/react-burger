import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import orderDetailsElementStyle from '../order-details-element/order-details-element.module.css';
import {v4 as uuidv4} from 'uuid';
import {useLocation, useNavigate} from "react-router-dom";
import {RootState, TOrderDetailsElementType, useSelector} from "../../utils/types";

function OrderDetailsElement({data}: TOrderDetailsElementType) {
    const {ingredients} = useSelector((state: RootState) => state.ingredients);
    const navigate = useNavigate();
    const location = useLocation();

    const formattedIngredients = data.ingredients.map((item: string) => item != null ? ingredients.find((el) => el._id === item) : null);

    const elementsStyles: any = {
        idx_0: orderDetailsElementStyle.ing_first,
        idx_1: orderDetailsElementStyle.ing_second,
        idx_2: orderDetailsElementStyle.ing_third,
        idx_3: orderDetailsElementStyle.ing_fourth,
        idx_4: orderDetailsElementStyle.ing_fifth
    };


    const getIngredientOverflow = () => {
        if (!formattedIngredients.includes(null)) {
            const ingOverflow = formattedIngredients[5]!;
            if (formattedIngredients.length > 6) {
                const ingOverflowCount = formattedIngredients.length - 5;
                return (
                    <li className={orderDetailsElementStyle.list_item + ' ' + orderDetailsElementStyle.last_image_list_item}
                        key={uuidv4()}>
                        <div className={orderDetailsElementStyle.last_image_box}>
                            <img className={orderDetailsElementStyle.image} alt={ingOverflow.name}
                                 src={ingOverflow.image}/>
                            <div className={orderDetailsElementStyle.dim}></div>
                            <span
                                className={`${orderDetailsElementStyle.counter} text text_type_main-default`}>{`+${ingOverflowCount}`}</span>
                        </div>
                    </li>)
            } else if (formattedIngredients.length === 6) {
                return (
                    <li className={orderDetailsElementStyle.list_item + ' ' + orderDetailsElementStyle.ing_sixth}><img
                        className={orderDetailsElementStyle.image} alt={ingOverflow.name} src={ingOverflow.image}/>
                    </li>)
            }
        }
    }

    const getStatus = () => {
        if (data.status === 'done') {
            return 'Выполнен'
        } else if (data.status === 'pending') {
            return 'Готовится'
        } else if (data.status === 'created') {
            return 'Создан'
        }
    }

    const calculateIngredientsPrice = () => {
        if (!formattedIngredients.includes(null)) {
            return formattedIngredients.reduce((accumulator, currentValue) => {
                return accumulator + currentValue?.price!
            }, 0)
        }
    }

    const showOrderDetails = () => {
        location.pathname === '/profile/orders' ?
            navigate(`/profile/orders/${data._id}`, {state: {modal: true}}) :
            navigate(`/feed/${data._id}`, {state: {modal: true}})
    }

    return !formattedIngredients.includes(null) ? (
        <div className={`${orderDetailsElementStyle.box} p-6`} onClick={showOrderDetails}>
            <div className={`${orderDetailsElementStyle.title_box} mb-4`}>
                <h2 className={'text text_type_digits-default'}>{`#${data.number}`}</h2>
                <FormattedDate date={new Date(data.createdAt)}
                               className={'text text_type_main-default text_color_inactive'}/>
            </div>
            <div className={`${orderDetailsElementStyle.name_status_box} mb-4`}>
                <h1 className={`${orderDetailsElementStyle.name} text text_type_main-medium`}>{data.name}</h1>
                {location.pathname === '/profile/orders' ? (<span
                    className={`text text_type_main-default ${data?.status === 'done' ? orderDetailsElementStyle.status_done : ''}`}>{getStatus()}</span>) : ''}
            </div>
            <div className={orderDetailsElementStyle.ing_price_box}>
                <ul className={orderDetailsElementStyle.image_box}>
                    {formattedIngredients.map((item, index) => {
                        if (index < 5) {
                            return (
                                <li className={orderDetailsElementStyle.list_item + ' ' + elementsStyles['idx_' + index]}
                                    key={uuidv4()}>
                                    <img className={orderDetailsElementStyle.image} alt={item?.name}
                                         src={item?.image}/></li>)
                        }
                    })}
                    {getIngredientOverflow()}
                </ul>
                <div className={orderDetailsElementStyle.price_box}><span
                    className={'text text_type_digits-default'}>{calculateIngredientsPrice()}</span><CurrencyIcon
                    type="primary"/></div>
            </div>
        </div>
    ) : null
}

export default OrderDetailsElement