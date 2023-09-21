import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import orderDetailsStyle from './order-details.module.css';
import {useSelector, TIngredientType} from "../../utils/types";

function OrderDetails() {
    const location = useLocation();
    const {ingredients} = useSelector((state) => state.ingredients);
    const {id} = useParams<{ id?: string }>();
    const orders = useSelector((state) => state.ws.data?.orders);
    const order = orders?.find((el) => el._id === id);
    const [formattedIngredients, setFormattedIngredients] = useState(Array<TIngredientType>);

    useEffect(() => {
        if (order) {
            const tempIngredients = order.ingredients;
            const uniqueIngredients = [...new Set(tempIngredients)];
            setFormattedIngredients(uniqueIngredients.map((item) => ingredients.find((el) => el._id === item)!));
            formattedIngredients.forEach((item) => {
                const repeatingElements = tempIngredients.filter(x => x === item._id);
                item.count = repeatingElements.length;
            });
        }
    }, [order, formattedIngredients.length]);


    const getStatus = () => {
        if (order?.status === 'done') {
            return 'Выполнен'
        } else if (order?.status === 'pending') {
            return 'Готовится'
        } else if (order?.status === 'created') {
            return 'Создан'
        }
    }

    const calculateIngredientsPrice = () => {
        return formattedIngredients?.reduce((accumulator, currentValue) => {
            if (currentValue) {
                return accumulator + currentValue.price * (currentValue.count || 1)
            } else {
                return 0
            }

        }, 0)
    }


    return order ? (
        <div className={orderDetailsStyle.main}>
            <h2 className={`${!location.state?.modal ? orderDetailsStyle.title_number : ''} text text_type_digits-default mb-5`}>{`#${order.number}`}</h2>
            <div className={'mb-15'}>
                <h1 className={`${orderDetailsStyle.title} text text_type_main-medium mb-2`}>{order.name}</h1>
                <span
                    className={`text text_type_main-default ${order.status === 'done' ? orderDetailsStyle.status_done : ''}`}>{getStatus()}</span>
            </div>
            <h2 className={'text text_type_main-medium mb-6'}>Состав:</h2>
            <ul className={`${orderDetailsStyle.list}`}>
                {formattedIngredients?.map((item) => {
                    return (
                        <li className={orderDetailsStyle.list_item} key={item._id}>
                            <div className={orderDetailsStyle.image_name_box}>
                                <div className={orderDetailsStyle.list_image}>
                                    <img className={orderDetailsStyle.image} src={item.image} alt={item.name}/>
                                </div>
                                <h3 className={'text text_type_main-default'}>{item.name}</h3>
                            </div>
                            <div className={`${orderDetailsStyle.ing_price_box} mr-6`}>
                                <span
                                    className={'text text_type_digits-default'}>{`${item.count} x ${item.price}`}</span>
                                <CurrencyIcon type="primary"/>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className={`${orderDetailsStyle.date_price_box} mb-12`}>
                <FormattedDate date={new Date(order.createdAt)}
                               className={'text text_type_main-default text_color_inactive'}/>
                <div className={orderDetailsStyle.total_price_box}>
                    <span className={'text text_type_digits-default'}>{calculateIngredientsPrice()}</span>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    ) : null
}


export default OrderDetails