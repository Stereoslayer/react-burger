import {useEffect, useState} from 'react';
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
import {getUser} from "../../services/actions/user";
import Constructor from "../../pages/Constructor/constructor";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ProfileForm from "../profile-form/profile-form";
import Feed from "../../pages/feed/feed";
import {getIngredients} from "../../services/actions/ingredients";
import OrderDetails from "../order-details/order-details";
import {useDispatch} from '../../utils/types'

function App() {
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('accessToken');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (accessToken) {
            setLoading(true);
            dispatch(getUser()).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [accessToken]);

    useEffect(() => {
        dispatch(getIngredients())
    }, [])

    return (
        !loading ? (<>
            <Header/>
            <Routes>
                <Route path="/" element={<Constructor/>}>
                    <Route path="/ingredients/:id" element={<IngredientDetails/>}/>
                </Route>
                <Route path="/login" element={<ProtectedRouteElement element={<Login/>} loggedIn/>}/>
                <Route path="/registration" element={<ProtectedRouteElement element={<Registration/>} loggedIn/>}/>
                <Route path="/forgot_password" element={<ProtectedRouteElement element={<ForgotPassword/>} loggedIn/>}/>
                <Route path="/reset_password" element={<ResetPassword/>}/>
                <Route path="/profile" element={<ProtectedRouteElement element={<Profile/>} loggedIn={false}/>}>
                    <Route path="/profile/" element={<ProfileForm/>}/>
                    <Route path="/profile/orders" element={<OrderHistory/>}>
                        <Route path="/profile/orders/:id" element={<OrderDetails/>}/>
                    </Route>
                </Route>
                <Route path="/feed" element={<Feed/>}>
                    <Route path="/feed/:id" element={<OrderDetails/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>) : null
    )
}

export default App;
