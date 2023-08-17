import React, {useCallback} from 'react';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from './burger-constructor.module.css';
import Modal from "../modal/modal";
import OrderAccepted from "../order-accepted/order-accepted";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import update from 'immutability-helper';
import SortableIngredients from "../sortable-ingredients/sortable-ingredients";
import {ADD_ITEM, SORT_ITEMS} from "../../services/actions/burger-constructor";
import {HIDE_ORDER_DETAILS} from "../../services/actions/popup";
import {createOrder, POST_ORDER_CLEAR_STORE} from "../../services/actions/order";
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from "react-router-dom";

const order = (state) => state.order.order;
const orderInfo = (state) => state.orderDetails;
const otherIngredients = (state) => state.burgerConstructor;
const success = (state) => state.order.success;
const userState = (state) => state.user;

function BurgerConstructor() {
    const dispatch = useDispatch();
    const ingredientItems = useSelector(otherIngredients);
    const orderNumber = useSelector(order);
    const orderDetails = useSelector(orderInfo);
    const orderSuccess = useSelector(success);
    const user = useSelector(userState);
    const navigate = useNavigate();

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
        });
        dispatch({
            type: POST_ORDER_CLEAR_STORE
        });
    };

    const prepareIngredients = () => {
        const bun = ingredientItems.find(item => item.type === 'bun');
        return [...ingredientItems.map(x => x._id), bun._id]
    }

    const postOrder = () => {
        if (!user.userData) {
            navigate('/login');
        } else {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('accessToken')
                },
                body: JSON.stringify({ingredients: prepareIngredients()})
            };
            dispatch(createOrder(requestOptions));
        }
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

    let hasBun = false;
    React.useMemo(() => ingredientItems.forEach(item => item.type === 'bun' && (item.type === 'bun' ? (hasBun = true) : (hasBun = false))), [ingredientItems]);

    return (
        <section className={`${burgerConstructorStyle.container} mt-15`} ref={dropTarget}>
            <div className="mb-4 mr-4">
                {ingredientItems.length > 0 && ingredientItems.map((item) => item.type === 'bun' ?
                    <ConstructorElement
                        key={uuidv4() + 'top'}
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
                    <SortableIngredients key={uuidv4()} ingredient={item} index={index} moveItem={moveItem}
                                         id={`${item._id}${index}`}/>
                    : '')
                }
            </div>
            <div className="mt-4 mr-4">
                {ingredientItems.length > 0 && ingredientItems.map((item) => item.type === 'bun' ?
                    <ConstructorElement
                        key={uuidv4() + 'bot'}
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
                <Button htmlType="button" type="primary" size="large" extraClass="ml-10" onClick={postOrder}
                        disabled={!hasBun}>Оформить
                    заказ</Button>
            </div>
            {orderDetails.visible && orderSuccess &&
                <Modal onClose={popupClose}>
                    <OrderAccepted orderNumber={orderNumber}/>
                </Modal>}
        </section>
    )
}

export default BurgerConstructor


