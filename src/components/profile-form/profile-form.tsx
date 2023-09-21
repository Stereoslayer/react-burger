import profileFormStyle from "./profile-form.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {ChangeEvent, useEffect} from "react";
import {TUserFormType, useDispatch, useSelector} from '../../utils/types';
import {updateUser} from "../../services/actions/user";

function ProfileForm() {
    const currentName = useSelector((state) => state.user.userData.name);
    const currentEmail = useSelector((state) => state.user.userData.email);
    const [name, setName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [edited, setEdited] = React.useState<boolean>(false);
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
        const user: TUserFormType = {email, name};
        if (password) {
            user.password = password;
        }
        dispatch(updateUser(user))
            .then(setEdited(false)!);
    }

    return (
        <fieldset className={profileFormStyle.fieldset}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    setEdited(true);
                }}
                value={email}
                extraClass="mb-6"
                placeholder={'Логин'}
                isIcon={true}
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