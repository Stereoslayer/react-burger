import React, {ChangeEvent, useEffect} from "react";
import modalStyle from "../page.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {RootState, useDispatch, useSelector} from "../../utils/types";
import {changePassword} from "../../services/actions/user";

const userState = (state: RootState) => state.user;

function ResetPassword() {
    const dispatch = useDispatch();
    const [password, setPassword] = React.useState<string>('');
    const [token, setToken] = React.useState<string>('');
    const navigate = useNavigate();
    const {userData, isForgotPassword} = useSelector(userState);
    const location = useLocation();
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const onTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
        setToken(e.target.value)
    }

    const onClick = (e: any) => {
        dispatch(changePassword(password, token))
            .then(() => {
                navigate('/login')
            });
    }

    useEffect(() => {
        if (userData) {
            location.state?.prevLocation.pathname ? navigate(location.state.prevLocation.pathname) : navigate('/')
        } else {
            isForgotPassword ? navigate('/reset_password') : navigate('/')
        }
    }, [userData, isForgotPassword]);

    return (
        <main className={modalStyle.main}>
            <p className="text text_type_main-medium mb-6">
                Восстановление пароля
            </p>
            <PasswordInput
                onChange={onPasswordChange}
                value={password}
                name={'password'}
                extraClass="mb-6"
                placeholder={'Введите новый пароль'}
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
                value={token}
                onChange={onTokenChange}
            />
            <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={onClick}>
                Сохранить
            </Button>
            <p className="text text_type_main-default text_color_inactive mb-4">
                Вспомнили пароль? <Link to='/login' className={`${modalStyle.link} text text_type_main-default`}>
                Войти</Link>
            </p>
        </main>
    )
}

export default ResetPassword