import OrderDetailsElement from "../../components/order-details-element/order-details-element";
import orderHistoryStyle from "./order-history.module.css";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../../components/modal/modal";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {WS_CONNECTION_CLOSED_USER, WS_CONNECTION_START_USER} from "../../services/actions/wsActionsUser";

function OrderHistory() {
    const navigate = useNavigate();
    const location = useLocation();
    const popupClose = () => {
        navigate('/profile/orders', {state: {modal: false}});
    };
    const dispatch = useDispatch();
    const {orders} = useSelector((state) => state.wsUser.data);

    useEffect(
        () => {
            dispatch({type: WS_CONNECTION_START_USER});

            return () => {
                dispatch({type: WS_CONNECTION_CLOSED_USER});
            }
        }, [dispatch]);

    return (
        <>
            {location.pathname === '/profile/orders' ?
                <div className={orderHistoryStyle.main}>
                    <ul className={orderHistoryStyle.list}>
                        {orders?.map((item) => (
                            <li className={orderHistoryStyle.list_item} key={item._id}><OrderDetailsElement
                                data={item}/></li>)).reverse()}
                    </ul>
                </div> :
                location.state?.modal ?
                    <>
                        <div className={orderHistoryStyle.main}>
                            <ul className={orderHistoryStyle.list}>
                                {orders?.map((item) => (
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