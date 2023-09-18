import appStyles from "../../components/app/app.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import React from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Modal from "../../components/modal/modal";

function Constructor() {
    const location = useLocation();
    const navigate = useNavigate();
    const popupClose = () => {
        navigate('/');
    };
    return (
        <main className={appStyles.main}>
            <DndProvider backend={HTML5Backend}>
                {location.pathname === '/' ?
                    <>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </>
                    : location.state?.modal ?
                        <>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                            <Modal onClose={popupClose}>
                                <Outlet/>
                            </Modal>
                        </>
                        : <Outlet/>}
            </DndProvider>
        </main>
    )
}

export default Constructor