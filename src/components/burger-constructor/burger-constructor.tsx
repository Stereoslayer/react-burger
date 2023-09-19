import React, {useCallback} from 'react';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from './burger-constructor.module.css';
import Modal from "../modal/modal";
import OrderAccepted from "../order-accepted/order-accepted";
import {useDrop} from "react-dnd";
import {TIngredientType, useDispatch, useSelector} from '../../utils/types';
import update from 'immutability-helper';
import SortableIngredients from "../sortable-ingredients/sortable-ingredients";
import {ADD_ITEM, SORT_ITEMS} from "../../services/actions/burger-constructor";
import {HIDE_ORDER_DETAILS} from "../../services/actions/popup";
import {clearConstructor, createOrder, POST_ORDER_CLEAR_STORE, showOrderDetails} from "../../services/actions/order";
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from "react-router-dom";

function BurgerConstructor() {
    const dispatch = useDispatch();
    const ingredientItems = useSelector((state) => state.burgerConstructor);
    const orderNumber = useSelector((state) => state.order.number);
    const orderDetails = useSelector((state) => state.orderDetails);
    const orderSuccess = useSelector((state) => state.order.success);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const totalSum = React.useMemo(() =>
            ingredientItems.reduce((acc, cur) => cur.type === "bun" ? acc + cur.price * 2 : acc + cur.price, 0),
        [ingredientItems]
    );

    const [, dropTarget] = useDrop({
        accept: 'items',
        drop(item: TIngredientType) {
            dispatch({
                type: ADD_ITEM,
                payload: {
                    ...item,
                    uniqueId: uuidv4()
                }
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
        return [...ingredientItems.map(x => x._id), bun?._id]
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
            dispatch(showOrderDetails());
            dispatch(clearConstructor());
        }
    };

    const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
        const bunsIngredients = ingredientItems.filter(item => item.type === 'bun')
        const otherIngredients = ingredientItems.filter(item => item.type !== 'bun')
        const sortedIngredients = update(otherIngredients, {
            $splice:
                [
                    [dragIndex, 1],
                    [hoverIndex, 0, otherIngredients[dragIndex]],
                ],
        })
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
                        key={item.uniqueId}
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
                    <SortableIngredients key={item.uniqueId} ingredient={item} index={index} moveItem={moveItem}
                                         id={`${item._id}${index}`}/>
                    : '')
                }
            </div>
            <div className="mt-4 mr-4">
                {ingredientItems.length > 0 && ingredientItems.map((item) => item.type === 'bun' ?
                    <ConstructorElement
                        key={item.uniqueId}
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
            {orderDetails.visible &&
                <Modal onClose={popupClose}>
                    <OrderAccepted orderNumber={orderNumber}/>
                </Modal>}
        </section>
    )
}

export default BurgerConstructor


