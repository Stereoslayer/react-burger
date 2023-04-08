import React from 'react';

import headerStyles from './header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function Header() {
    return (
        <header className={`${headerStyles.header} m-10 pt-4 pb-4`}>
            <nav className={headerStyles.nav}>
                <ul className={headerStyles.list}>
                    <li><a className={`${headerStyles.link} text text_type_main-default pt-4 pb-4 pl-5 pr-5`}>
                        <BurgerIcon type="primary"/><span className='ml-2'>Конструктор</span></a></li>
                    <li><a
                        className={`${headerStyles.link} text text_type_main-default text_color_inactive pt-4 pb-4 pl-5 pr-5`}>
                        <BurgerIcon type="secondary"/><span className='ml-2'>Лента заказов</span></a></li>
                    <li><Logo/></li>
                    <li><a
                        className={`${headerStyles.link} text text_type_main-default text_color_inactive pt-4 pb-4 pl-5 pr-5`}><ProfileIcon
                        type="secondary"/><span className='ml-2'>Личный кабинет</span></a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;