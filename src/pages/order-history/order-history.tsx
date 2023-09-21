import OrderDetailsElement from "../../components/order-details-element/order-details-element";
import orderHistoryStyle from "./order-history.module.css";
import React, {useEffect} from "react";
import {TOrderDetailsType, useDispatch, useSelector} from "../../utils/types";
import Modal from "../../components/modal/modal";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/wsActions";

function OrderHistory() {
    const navigate = useNavigate();
    const location = useLocation();
    const popupClose = () => {
        navigate('/profile/orders', {state: {modal: false}});
    };
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.ws.data?.orders);

    const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');

    useEffect(
        () => {
            dispatch({type: WS_CONNECTION_START, payload: `?token=${token}`});

            return () => {
                dispatch({type: WS_CONNECTION_CLOSED});
            }
        }, [dispatch]);

    return (
        <>
            {location.pathname === '/profile/orders' ?
                <div className={orderHistoryStyle.main}>
                    <ul className={orderHistoryStyle.list}>
                        {orders?.map((item: TOrderDetailsType) => (
                            <li className={orderHistoryStyle.list_item} key={item._id}><OrderDetailsElement
                                data={item}/></li>)).reverse()}
                    </ul>
                </div> :
                location.state?.modal ?
                    <>
                        <div className={orderHistoryStyle.main}>
                            <ul className={orderHistoryStyle.list}>
                                {orders?.map((item: TOrderDetailsType) => (
                                    <li className={orderHistoryStyle.list_item} key={item._id}><OrderDetailsElement
                                        data={item}/></li>)).reverse()}
                            </ul>
                        </div>
                        <Modal onClose={popupClose}>
                            <Outlet/>
                        </Modal>
                    </>
                    :
                    <Outlet/>}
        </>
    )
}

export default OrderHistory