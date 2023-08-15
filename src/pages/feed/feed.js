import feedStyle from './feed.module.css';
import OrderDetailsElement from "../../components/order-details-element/order-details-element";
import {useEffect} from "react";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START_ORDERS_ALL} from "../../services/actions/wsActions";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";

function Feed() {
    const dispatch = useDispatch();
    const {orders} = useSelector((state) => state.ws.data);
    const {total, totalToday} = useSelector((state) => state.ws.data)

    useEffect(
        () => {
            dispatch({type: WS_CONNECTION_START_ORDERS_ALL});

            return () => {
                dispatch({type: WS_CONNECTION_CLOSED});
            }
        }, []);


    return (
        <main className={feedStyle.main}>
            <h1 className={`${feedStyle.title} text text_type_main-large`}>Лента заказов</h1>
            <div className={feedStyle.two_boxes}>
                <ul className={feedStyle.list}>
                    {orders?.map((item) => (
                        <li className={feedStyle.list_item} key={uuidv4()}><OrderDetailsElement data={item}/></li>))}
                </ul>
                <div className={feedStyle.digits_box}>
                    <div className={`${feedStyle.status_box} mb-15`}>
                        <div className={feedStyle.done_box}>
                            <h2 className={'text text_type_main-medium mb-6'}>Готовы:</h2>
                            <ul className={feedStyle.status_list}>
                                {orders?.filter((el) => el.status === 'done').map((item) => (
                                    <li key={uuidv4()}
                                        className={`${feedStyle.digit_list_item + ' ' + feedStyle.digit_list_item_done} text text_type_digits-default`}>{item.number}</li>))}
                            </ul>
                        </div>
                        <div>
                            <h2 className={'text text_type_main-medium mb-6'}>В работе:</h2>
                            <ul className={feedStyle.status_list}>
                                {orders?.filter((el) => el.status === 'pending').map((item) => (
                                    <li key={uuidv4()}
                                        className={`${feedStyle.digit_list_item} text text_type_digits-default`}>{item.number}</li>))}
                            </ul>
                        </div>
                    </div>
                    <div className={feedStyle.total_box}>
                        <div>
                            <h2 className={'text text_type_main-medium'}>Выполнено за все время:</h2>
                            <span className={`${feedStyle.digits} text text_type_digits-large`}>{total}</span>
                        </div>
                        <div>
                            <h2 className={'text text_type_main-medium'}>Выполнено за сегодня:</h2>
                            <span className={`${feedStyle.digits} text text_type_digits-large`}>{totalToday}</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Feed