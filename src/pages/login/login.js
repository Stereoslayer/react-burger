import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyle from '../page.module.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../services/actions/user";

const userState = (state) => state.user;

function Login() {
    const user = useSelector(userState);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('')

    useEffect(() => {
        if (user.userData) {
            location.state?.prevLocation.pathname ? navigate(location.state.prevLocation.pathname) : navigate('/')
        }
    }, [user.userData, location])

    const onChangeEmail = e => {
        setEmail(e.target.value)
    }
    const [password, setPassword] = React.useState('')
    const onChangePassword = e => {
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

    const postLogin = () => {
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
            <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={postLogin}>
                Войти
            </Button>
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