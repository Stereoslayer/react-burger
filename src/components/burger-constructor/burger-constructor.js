import React, {useCallback} from 'react';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from './burger-constructor.module.css';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {ADD_ITEM, createOrder, HIDE_ORDER_DETAILS, SORT_ITEMS} from "../../services/actions";
import update from 'immutability-helper';
import SortableIngredients from "../sortable-ingredients/sortable-ingredients";

function BurgerConstructor() {
    const dispatch = useDispatch();
    const ingredientItems = useSelector(state => state.burgerConstructor);
    const orderNumber = useSelector(state => state.order.order);
    const orderDetails = useSelector(state => state.orderDetails);

    const totalSum = React.useMemo(() =>
            ingredientItems.reduce((acc, cur) => cur.type === "bun" ? acc + cur.price * 2 : acc + cur.price, 0),
        [ingredientItems]
    );

    const [, dropTarget] = useDrop({
        accept: 'items',
        drop(item) {
            dispatch({
                type: ADD_ITEM,
                payload: item
            })
        }
    });


    const popupClose = () => {
        dispatch({
            type: HIDE_ORDER_DETAILS
        })
    };
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ingredients: ingredientItems.map(x => x._id)})
    };

    const postOrder = () => {
        dispatch(createOrder(requestOptions));
    };

    const moveItem = useCallback((dragIndex, hoverIndex) => {
        const bunsIngredients = ingredientItems.filter(item => item.type === 'bun')
        const otherIngredients = ingredientItems.filter(item => item.type !== 'bun')
        const sortedIngredients = update(otherIngredients, {
            $splice:
                [
                    [dragIndex, 1],
                    [hoverIndex, 0, otherIngredients[dragIndex]],
                ],
        }, [otherIngredients])
        const sortedItemsWithBuns = [...bunsIngredients, ...sortedIngredients]
        dispatch({
            type: SORT_ITEMS,
            payload: [...sortedItemsWithBuns]
        });

    }, [ingredientItems, dispatch]);

    return (
        <section className={`${burgerConstructorStyle.container} mt-15`} ref={dropTarget}>
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
                    <SortableIngredients key={index} ingredient={item} index={index} moveItem={moveItem}
                                         id={`${item._id}${index}`}/>
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
                <Button htmlType="button" type="primary" size="large" extraClass="ml-10" onClick={postOrder}>Оформить
                    заказ</Button>
            </div>
            {orderDetails.visible &&
                <Modal onClose={popupClose}>
                    <OrderDetails orderNumber={orderNumber}/>
                </Modal>}
        </section>
    )
}

export default BurgerConstructor


