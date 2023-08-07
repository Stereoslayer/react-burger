import React from "react";
import profileStyle from "./profile.module.css";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import ProfileForm from "../../components/profile-form/profile-form";
import OrderHistory from "../order-history/order-history";
import {logout} from "../../services/actions/user";
import {useDispatch} from "react-redux";

function Profile() {
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/', {replace: true});
    }

    return (
        <main className={profileStyle.main}>
            <nav className={profileStyle.nav}>
                <ul className={profileStyle.list}>
                    <li className={profileStyle.listbox}><NavLink to={'/profile'} end
                                                                  className={({isActive}) => {
                                                                      const linkClasses = [`${profileStyle.link} text text_type_main-medium`];
                                                                      if (isActive) linkClasses.push(profileStyle.active);
                                                                      return linkClasses.join(" ");
                                                                  }}>Профиль</NavLink></li>
                    <li className={profileStyle.listbox}><NavLink to={'/profile/order_history'}
                                                                  className={({isActive}) => {
                                                                      const linkClasses = [`${profileStyle.link} text text_type_main-medium`];
                                                                      if (isActive) linkClasses.push(profileStyle.active);
                                                                      return linkClasses.join(" ");
                                                                  }}>История заказов</NavLink></li>
                    <li className={profileStyle.listbox}>
                        <button className={`${profileStyle.logout} text text_type_main-medium text_color_inactive`}
                                onClick={handleLogout}>Выход
                        </button>
                    </li>
                </ul>
                {pathname === '/profile' ?
                    <p className={`${profileStyle.info} text text_type_main-default text_color_inactive`}>В этом разделе
                        вы можете
                        изменить свои персональные данные</p> : ''}
                {pathname === '/profile/order_history' ?
                    <p className={`${profileStyle.info} text text_type_main-default text_color_inactive`}>В этом разделе
                        вы можете просмотреть свою историю заказов</p> : ''}
            </nav>
            {pathname === '/profile' ? <ProfileForm/> : ''}
            {pathname === '/profile/order_history' ? <OrderHistory/> : ''}
        </main>
    )
}

export default Profile