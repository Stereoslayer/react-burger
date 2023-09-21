import React, {ChangeEvent, FormEvent} from "react";
import modalStyle from "../page.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {resetPassword} from "../../services/actions/user";
import {useDispatch} from "../../utils/types";

function ForgotPassword() {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('')
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const navigate = useNavigate();
    const postResetPassword = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
            <form onSubmit={(e) => postResetPassword(e)} className={modalStyle.form}>
                <EmailInput
                    name={'email'}
                    isIcon={false}
                    onChange={onChange}
                    value={email}
                    extraClass="mb-6"
                    placeholder={'Укажите e-mail'}
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                    Восстановить
                </Button>
            </form>
            <p className="text text_type_main-default text_color_inactive mb-4">
                Вспомнили пароль? <Link to='/login' className={`${modalStyle.link} text text_type_main-default`}>
                Войти</Link>
            </p>
        </main>
    )
}

export default ForgotPassword