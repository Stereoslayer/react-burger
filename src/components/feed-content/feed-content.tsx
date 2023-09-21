import React from "react";
import feedContentStyle from './feed-content.module.css'
import OrderDetailsElement from "../order-details-element/order-details-element";
import {TOrderDetailsType, useSelector} from "../../utils/types";

function FeedContent() {
    const orders = useSelector((state) => state.ws.data?.orders);
    const total = useSelector((state) => state.ws.data?.total);
    const totalToday = useSelector((state) => state.ws.data?.totalToday);


    return (
        <>
            <h1 className={`${feedContentStyle.title} text text_type_main-large`}>Лента заказов</h1>
            <div className={feedContentStyle.two_boxes}>
                <ul className={feedContentStyle.list}>
                    {orders?.map((item) => (
                        <li className={feedContentStyle.list_item} key={item._id}><OrderDetailsElement data={item}/>
                        </li>))}
                </ul>
                <div className={feedContentStyle.digits_box}>
                    <div className={`${feedContentStyle.status_box} mb-15`}>
                        <div className={feedContentStyle.done_box}>
                            <h2 className={'text text_type_main-medium mb-6'}>Готовы:</h2>
                            <ul className={feedContentStyle.status_list}>
                                {orders?.filter((el) => el.status === 'done').map((item) => (
                                    <li key={item._id}
                                        className={`${feedContentStyle.digit_list_item + ' ' + feedContentStyle.digit_list_item_done} text text_type_digits-default`}>{item.number}</li>))}
                            </ul>
                        </div>
                        <div>
                            <h2 className={'text text_type_main-medium mb-6'}>В работе:</h2>
                            <ul className={feedContentStyle.status_list}>
                                {orders?.filter((el) => el.status === 'pending').map((item: TOrderDetailsType) => (
                                    <li key={item._id}
                                        className={`${feedContentStyle.digit_list_item} text text_type_digits-default`}>{item.number}</li>))}
                            </ul>
                        </div>
                    </div>
                    <div className={feedContentStyle.total_box}>
                        <div>
                            <h2 className={'text text_type_main-medium'}>Выполнено за все время:</h2>
                            <span className={`${feedContentStyle.digits} text text_type_digits-large`}>{total}</span>
                        </div>
                        <div>
                            <h2 className={'text text_type_main-medium'}>Выполнено за сегодня:</h2>
                            <span
                                className={`${feedContentStyle.digits} text text_type_digits-large`}>{totalToday}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeedContent