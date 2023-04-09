import React from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from './burger-constructor.module.css'
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import ingredientType from "../../utils/ingredient-type";

function BurgerConstructor({data}) {
    const [state, setState] = React.useState({visible: false});

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

    return (
        <section className={`${burgerConstructorStyle.container} mt-15`}>
            <div className="mb-4 mr-4">
                {data.length && data.map((item, index) => item.type === 'bun' ?
                    <ConstructorElement
                        key={index + 'top'}
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
                {data.length && data.map((item, index) => item.type !== 'bun' ?
                    <div className={burgerConstructorStyle.scrolled}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            key={index}
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                            extraClass={burgerConstructorStyle.element}
                        />
                    </div>
                    : '')
                }
            </div>
            <div className="mt-4 mr-4">
                {data.length && data.map((item, index) => item.type === 'bun' ?
                    <ConstructorElement
                        key={index + 'bot'}
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
                    <span className="text text_type_digits-medium mr-2">2056</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="large" extraClass="ml-10" onClick={popupOpen}>Оформить
                    заказ</Button>
            </div>
            {state.visible &&
                <Modal onClose={popupClose}>
                    <OrderDetails/>
                </Modal>}
        </section>
    )
}

BurgerConstructor.prototype = {
    data: ingredientType.isRequired
}
export default BurgerConstructor