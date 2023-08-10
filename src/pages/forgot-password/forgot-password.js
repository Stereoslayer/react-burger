import React from "react";
import modalStyle from "../page.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {resetPassword} from "../../services/actions/user";
import {useDispatch} from "react-redux";

function ForgotPassword() {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('')
    const onChange = e => {
        setEmail(e.target.value)
    }
    const navigate = useNavigate();
    const onClick = () => {
        dispatch(resetPassword(email))
            .then(() => {
                navigate('/reset_password')
            });
    }

    return (
        <main className={modalStyle.main}>
            <p className="text text_type_main-medium mb-6">
                Восстановление пароля
            </p>
            <EmailInput
                name={'email'}
                isIcon={false}
                onChange={onChange}
                value={email}
                extraClass="mb-6"
                placeholder={'Укажите e-mail'}
            />
            <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={onClick}>
                Восстановить
            </Button>
            <p className="text text_type_main-default text_color_inactive mb-4">
                Вспомнили пароль? <Link to='/login' className={`${modalStyle.link} text text_type_main-default`}>
                Войти</Link>
            </p>
        </main>
    )
}

export default ForgotPassword