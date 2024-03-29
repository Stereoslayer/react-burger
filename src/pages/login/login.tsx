import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyle from '../page.module.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {ChangeEvent, FormEvent} from "react";
import {useDispatch} from "../../utils/types";
import {login} from "../../services/actions/user";


function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState<string>('')

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const [password, setPassword] = React.useState<string>('')
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            password: password
        })
    };

    const postLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(login(requestOptions))
            .then(() => {
                if (location.state?.prevLocation) {
                    navigate(location.state.prevLocation)
                }
            })
    };

    return (
        <main className={modalStyle.main}>
            <p className="text text_type_main-medium mb-6">
                Вход
            </p>
            <form onSubmit={(e) => postLogin(e)} className={modalStyle.form}>
                <EmailInput
                    name={'email'}
                    isIcon={false}
                    onChange={onChangeEmail}
                    value={email}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={onChangePassword}
                    value={password}
                    name={'password'}
                    extraClass="mb-6"
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                    Войти
                </Button>
            </form>
            <p className="text text_type_main-default text_color_inactive mb-4">
                Вы — новый пользователь? <Link to='/registration'
                                               className={`${modalStyle.link} text text_type_main-default`}>
                Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Забыли пароль? <Link to='/forgot_password' className={`${modalStyle.link} text text_type_main-default`}>
                Восстановить пароль</Link>
            </p>

        </main>
    )
}

export default Login