import React from 'react';

import headerStyles from './header.module.css';
import {Logo, BurgerIcon, ProfileIcon, ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, NavLink} from "react-router-dom";

function Header() {
    return (
        <header className={`${headerStyles.header} m-10 pt-4 pb-4`}>
            <nav className={headerStyles.nav}>
                <ul className={headerStyles.list}>
                    <li><NavLink to='/'
                                 className={({isActive}) => {
                                     const linkClasses = [`${headerStyles.link} text text_type_main-default pt-4 pb-4 pl-5 pr-5`];
                                     if (isActive) linkClasses.push(headerStyles.active);
                                     return linkClasses.join(" ");
                                 }}>
                        {({isActive, isPending}) => (
                            <>
                                <BurgerIcon type={isActive ? "primary" : "secondary"}/>
                                <span className='ml-2'>Конструктор</span>
                            </>
                        )}
                    </NavLink></li>
                    <li><NavLink
                        to="/order_feed"
                        className={({isActive}) => {
                            const linkClasses = [`${headerStyles.link} text text_type_main-default pt-4 pb-4 pl-5 pr-5`];
                            if (isActive) linkClasses.push(headerStyles.active);
                            return linkClasses.join(" ");
                        }}>
                        {({isActive}) => (
                            <>
                                <ListIcon type={isActive ? "primary" : "secondary"}/>
                                <span className='ml-2'>Лента заказов</span>
                            </>
                        )}</NavLink></li>
                    <li className={headerStyles.logo}><Link to={'/'}><Logo/></Link></li>
                    <li><NavLink to='/profile'
                                 className={({isActive}) => {
                                     const linkClasses = [`${headerStyles.link} text text_type_main-default pt-4 pb-4 pl-5 pr-5`];
                                     if (isActive) linkClasses.push(headerStyles.active);
                                     return linkClasses.join(" ");
                                 }}>
                        {({isActive}) => (
                            <>
                                <ProfileIcon type={isActive ? "primary" : "secondary"}/>
                                <span className='ml-2'>Личный кабинет</span>
                            </>
                        )}
                    </NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;