import profileNavigationStyle from "./profile-navigation.module.css";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import React from "react";
import {logout} from "../../services/actions/user";
import {useDispatch} from "../../utils/types";

function ProfileNavigation() {
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login', {replace: true});
    }
    return (
        <nav className={profileNavigationStyle.nav}>
            <ul className={profileNavigationStyle.list}>
                <li className={profileNavigationStyle.listbox}><NavLink to={'/profile'} end
                                                                        className={({isActive}) => {
                                                                            const linkClasses = [`${profileNavigationStyle.link} text text_type_main-medium`];
                                                                            if (isActive) linkClasses.push(profileNavigationStyle.active);
                                                                            return linkClasses.join(" ");
                                                                        }}>Профиль</NavLink></li>
                <li className={profileNavigationStyle.listbox}><NavLink to={'/profile/orders'}
                                                                        className={({isActive}) => {
                                                                            const linkClasses = [`${profileNavigationStyle.link} text text_type_main-medium`];
                                                                            if (isActive) linkClasses.push(profileNavigationStyle.active);
                                                                            return linkClasses.join(" ");
                                                                        }}>История заказов</NavLink></li>
                <li className={profileNavigationStyle.listbox}>
                    <button
                        className={`${profileNavigationStyle.logout} text text_type_main-medium text_color_inactive`}
                        onClick={handleLogout}>Выход
                    </button>
                </li>
            </ul>
            {pathname === '/profile' ?
                <p className={`${profileNavigationStyle.info} text text_type_main-default text_color_inactive`}>В этом
                    разделе
                    вы можете
                    изменить свои персональные данные</p> : ''}
            {pathname === '/profile/orders' ?
                <p className={`${profileNavigationStyle.info} text text_type_main-default text_color_inactive`}>В этом
                    разделе
                    вы можете просмотреть свою историю заказов</p> : ''}
        </nav>
    )
}

export default ProfileNavigation