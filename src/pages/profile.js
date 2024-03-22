import { NavLink, useOutlet } from "react-router-dom";
import styles from './profile.module.css';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { getProfile } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { setName, setEmail } from "../services/auth";
import { updateProfile } from "../services/auth";

const Profile = () => {

    const d = useDispatch();
    const { email, name } = useSelector(state => state.auth);

    useEffect(() => {
        d(getProfile());
    }, []);

    return (
        <div>
            <Input placeholder="Имя" type="text" extraClass="m-8" icon="EditIcon" value={name} onChange={e => d(setName(e.target.value))} autoFocus />
            <Input placeholder="Логин" type="text" extraClass="m-8" icon="EditIcon" value={email} onChange={e => d(setEmail(e.target.value))} />
            <Input placeholder="Пароль" type="password" extraClass="m-8" icon="EditIcon" readOnly value="cannotchangepasswordhere"/>
            <div style={{textAlign: "center"}}><Button htmlType="button" type="primary" size="small" onClick={e => d(updateProfile())}>Сохранить</Button></div>
        </div>
    );


}

export { Profile }