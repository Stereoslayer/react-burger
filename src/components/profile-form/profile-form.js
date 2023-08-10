import profileFormStyle from "./profile-form.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../services/actions/user";

const userName = (state) => state.user.userData.name;
const userEmail = (state) => state.user.userData.email;

function ProfileForm() {
    const currentName = useSelector(userName);
    const currentEmail = useSelector(userEmail);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [edited, setEdited] = React.useState(false);
    const dispatch = useDispatch();

    const inputRef = React.useRef(null)
    useEffect(() => {
        setName(currentName);
        setEmail(currentEmail);
    }, [])

    const cancelChanges = () => {
        setName(currentName);
        setEmail(currentEmail);
        setPassword('');
        setEdited(false);
    };

    const saveChanges = () => {
        const user = {email, name};
        if (password) {
            user.password = password;
        }
        dispatch(updateUser(user))
            .then(setEdited(false));
    }

    return (
        <fieldset className={profileFormStyle.fieldset}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={(e) => {
                    setName(e.target.value);
                    setEdited(true);
                }}
                value={name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
                icon={'EditIcon'}
                ref={inputRef}
            />
            <EmailInput
                name={'email'}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setEdited(true);
                }}
                value={email}
                extraClass="mb-6"
                placeholder={'Логин'}
                icon={'EditIcon'}
            />
            <PasswordInput
                onChange={(e) => {
                    setPassword(e.target.value);
                    setEdited(true);
                }}
                value={password}
                name={'password'}
                placeholder={'Пароль'}
                icon={'EditIcon'}
            />
            {edited ?
                (<div className={profileFormStyle.buttons}>
                    <Button htmlType={"button"} type="secondary" size="medium"
                            extraClass={`${profileFormStyle.cancel} mt-6`} onClick={cancelChanges}>Отмена</Button>
                    <Button htmlType={"button"} type="primary" size="medium" extraClass="mt-6"
                            onClick={saveChanges}>Сохранить</Button>
                </div>) : ''}
        </fieldset>
    )
}

export default ProfileForm