import modalStyle from "../page.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registration} from "../../services/actions/user";

const success = (state) => state.user.success;

function Registration() {
    const navigate = useNavigate();
    const registrationSuccess = useSelector(success);
    const dispatch = useDispatch();
    const [userName, setUserName] = React.useState('');

    const [userEmail, setUserEmail] = React.useState('');
    const onEmailChange = e => {
        setUserEmail(e.target.value)
    };

    const [userPassword, setUserPassword] = React.useState('');
    const onPasswordChange = e => {
        setUserPassword(e.target.value)
    };

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: userEmail,
            password: userPassword,
            name: userName
        })
    };

    const postRegistration = () => {
        dispatch(registration(requestOptions));
    };

    useEffect(() => {
        if (registrationSuccess) {
            navigate('/');
        }
    }, [registrationSuccess]);

    return (
        <main className={modalStyle.main}>
            <p className="text text_type_main-medium mb-6">
                Регистрация
            </p>
            <Input
                type='text'
                placeholder='Имя'
                onChange={e => setUserName(e.target.value)}
                value={userName}
                name='name'
                error={false}
                errorText='Ошибка'
                size='default'
                extraClass="mb-6"
            />
            <EmailInput
                name='email'
                isIcon={false}
                onChange={onEmailChange}
                value={userEmail}
                extraClass="mb-6"
            />
            <PasswordInput
                onChange={onPasswordChange}
                value={userPassword}
                name='password'
                extraClass="mb-6"
            />
            <Button
                htmlType="button"
                type="primary"
                size="medium"
                extraClass="mb-20"
                onClick={postRegistration}
            >
                Зарегистрироваться
            </Button>
            <p className="text text_type_main-default text_color_inactive mb-4">
                Уже зарегистрированы? <Link to='/login' className={`${modalStyle.link} text text_type_main-default`}>
                Войти</Link>
            </p>
        </main>
    )
}

export default Registration