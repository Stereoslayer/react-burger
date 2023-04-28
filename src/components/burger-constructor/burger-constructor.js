import React from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from './burger-constructor.module.css';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import ingredientType from "../../utils/ingredient-type";
import {BurgerConstructorContext} from "../../services/burger-constructor-context";

function BurgerConstructor() {
    const [state, setState] = React.useState({visible: false});
    const [order, setOrder] = React.useState({
        data: [],
        isLoading: false,
        hasError: false
    });
    const {ingredientItems, ingredientItemDispatcher} = React.useContext(BurgerConstructorContext);
    const orderLink = 'https://norma.nomoreparties.space/api/orders';

    const totalSum = React.useMemo(() =>
            ingredientItems.reduce((acc, cur) => cur.type === "bun" ? acc + cur.price * 2 : acc + cur.price, 0),
        [ingredientItems]
    );

    const handleDeleteItem = (index) => {
        ingredientItemDispatcher({type: 'delete', payload: index})
    }
    const popupOpen = () => {
        setState(prevState => (
            {
                ...prevState,
                visible: true
            }))
    };
    const popupClose = () => {
        setState(prevState => (
            {
                ...prevState,
                visible: false
            }))
    };

    const createOrder = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ingredients: ingredientItems.map(x => x._id)})
        };
        setOrder({...order, hasError: false, isLoading: true});
        const res = await fetch(orderLink, requestOptions);
        if (res.ok) {
            const data = await res.json();
            setOrder({data: data, isLoading: false, hasError: false});
            popupOpen();
            ingredientItemDispatcher({type: 'deleteAll'})
        } else {
            setOrder({data: [], isLoading: false, hasError: true});
        }
    }

    return (
        <section className={`${burgerConstructorStyle.container} mt-15`}>
            <div className="mb-4 mr-4">
                {ingredientItems.length > 0 && ingredientItems.map((item) => item.type === 'bun' ?
                    <ConstructorElement
                        key={item._id + 'top'}
                        type="top"
                        isLocked={true}
                        text={item.name + ' (верх)'}
                        price={item.price}
                        thumbnail={item.image}
                        extraClass={burgerConstructorStyle.element}
                    /> : '')
                }
            </div>
            <div className={`${burgerConstructorStyle.inner} pr-2`}>
                {ingredientItems.length > 0 && ingredientItems.map((item, index) => item.type !== 'bun' ?
                    <div
                        key={index + item._id + 'icon'}
                        className={burgerConstructorStyle.scrolled}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                            extraClass={burgerConstructorStyle.element}
                            handleClose={() => handleDeleteItem(index)}
                        />
                    </div>
                    : '')
                }
            </div>
            <div className="mt-4 mr-4">
                {ingredientItems.length > 0 && ingredientItems.map((item) => item.type === 'bun' ?
                    <ConstructorElement
                        key={item._id + 'bot'}
                        type="bottom"
                        isLocked={true}
                        text={item.name + ' (низ)'}
                        price={item.price}
                        thumbnail={item.image}
                        extraClass={burgerConstructorStyle.element}
                    /> : '')
                }
            </div>
            <div className={`${burgerConstructorStyle.confirmbox} mt-10 mr-4`}>
                <div className={burgerConstructorStyle.total}>
                    <span className="text text_type_digits-medium mr-2">{totalSum}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="large" extraClass="ml-10" onClick={createOrder}>Оформить
                    заказ</Button>
            </div>
            {state.visible &&
                <Modal onClose={popupClose}>
                    <OrderDetails orderNumber={order.data.order.number}/>
                </Modal>}
        </section>
    )
}

BurgerConstructor.prototype = {
    ingredientItems: ingredientType.isRequired
}
export default BurgerConstructor


