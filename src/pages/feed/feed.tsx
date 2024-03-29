import feedStyle from './feed.module.css';
import React, {useEffect} from "react";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/wsActions";
import {useDispatch} from "../../utils/types";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Modal from "../../components/modal/modal";
import FeedContent from "../../components/feed-content/feed-content";

function Feed() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch({type: WS_CONNECTION_START, payload: '/all'});

            return () => {
                dispatch({type: WS_CONNECTION_CLOSED});
            }
        }, [dispatch]);

    const popupClose = () => {
        navigate('/feed', {state: {modal: false}});
    };


    return (
        <main className={feedStyle.main}>
            {location.pathname === '/feed' ? <FeedContent/>
                : location.state?.modal ? <>
                        <FeedContent/>
                        <Modal onClose={popupClose}>
                            <Outlet/>
                        </Modal>
                    </> :
                    <Outlet/>}
        </main>
    )
}

export default Feed