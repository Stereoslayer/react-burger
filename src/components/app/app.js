import React, {useEffect} from 'react';
import Header from '../header/header';
import appStyles from './app.module.css';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Route, Routes} from "react-router-dom";
import Login from "../../pages/login/login";
import Registration from "../../pages/registration/registration";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset_password/reset-password";
import Profile from "../../pages/profile/profile";
import OrderHistory from "../../pages/order-history/order-history";
import NotFound from "../../pages/not-found/not-found";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../services/actions/user";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(getUser());
        }
    }, []);

    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={
                    <main className={appStyles.main}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </DndProvider>
                    </main>
                }/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/forgot_password" element={<ForgotPassword/>}/>
                <Route path="/reset_password" element={<ResetPassword/>}/>
                <Route path="/profile" element={<ProtectedRouteElement element={<Profile/>}/>}>
                    <Route path="/profile/order_history" element={<OrderHistory/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    )
}

export default App;
