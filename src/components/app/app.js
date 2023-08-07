import React, {useEffect} from 'react';
import Header from '../header/header';
import {Route, Routes} from "react-router-dom";
import Login from "../../pages/login/login";
import Registration from "../../pages/registration/registration";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset_password/reset-password";
import Profile from "../../pages/profile/profile";
import OrderHistory from "../../pages/order-history/order-history";
import NotFound from "../../pages/not-found/not-found";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import {useDispatch} from "react-redux";
import {getUser} from "../../services/actions/user";
import Constructor from "../../pages/Constructor/constructor";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        if (accessToken) {
            dispatch(getUser());
        }
    }, [accessToken]);

    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Constructor/>}>
                    <Route path="/ingredients/:id" element={<IngredientDetails/>}/>
                </Route>
                {/*<Route path="/ingredients/:id" element={<IngredientDetails/>}/>*/}
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
