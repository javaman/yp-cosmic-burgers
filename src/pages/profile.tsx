import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { getProfile, selectAuth } from "../services/auth";
import { useSelector } from "react-redux";
import { setName, setEmail } from "../services/auth";
import { updateProfile } from "../services/auth";
import { useAppDispatch } from "../services/store";

const Profile = () => {

    const dispatch = useAppDispatch();
    const { email, name } = useSelector(selectAuth);

    useEffect(() => {
        dispatch(getProfile());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function submit(e : React.FormEvent) {
        e.preventDefault();
        dispatch(updateProfile());
    }

    return (
        <form onSubmit={submit}>
            <Input placeholder="Имя" type="text" extraClass="m-8" icon="EditIcon" value={name} onChange={e => dispatch(setName(e.target.value))} autoFocus />
            <Input placeholder="Логин" type="text" extraClass="m-8" icon="EditIcon" value={email} onChange={e => dispatch(setEmail(e.target.value))} />
            <Input placeholder="Пароль" type="password" extraClass="m-8" icon="EditIcon" readOnly value="cannotchangepasswordhere" onChange={e => 0}/>
            <div style={{textAlign: "center"}}><Button htmlType="submit" type="primary" size="small">Сохранить</Button></div>
        </form>
    );


}

export { Profile }