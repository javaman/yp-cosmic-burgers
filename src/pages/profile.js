import { NavLink, useOutlet } from "react-router-dom";
import styles from './profile.module.css';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { getProfile } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { setName, setEmail } from "../services/auth";
import { updateProfile } from "../services/auth";

const Profile = () => {

    const dispatch = useDispatch();
    const { email, name } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getProfile());
    }, []);

    function submit(e) {
        e.preventDefault();
        dispatch(updateProfile());
    }

    return (
        <form onSubmit={submit}>
            <Input placeholder="Имя" type="text" extraClass="m-8" icon="EditIcon" value={name} onChange={e => dispatch(setName(e.target.value))} autoFocus />
            <Input placeholder="Логин" type="text" extraClass="m-8" icon="EditIcon" value={email} onChange={e => dispatch(setEmail(e.target.value))} />
            <Input placeholder="Пароль" type="password" extraClass="m-8" icon="EditIcon" readOnly value="cannotchangepasswordhere"/>
            <div style={{textAlign: "center"}}><Button htmlType="submit" type="primary" size="small">Сохранить</Button></div>
        </form>
    );


}

export { Profile }