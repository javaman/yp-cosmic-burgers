import styles from "./login.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { selectAuth, setLoginEmail, setLoginPassword } from "../services/auth";
import { useSelector } from "react-redux";
import { login } from "../services/auth";
import { setLoginState } from "../services/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../services/store";

const Login = ({extraClass} : {extraClass : string}) => {
    const { loginEmail, loginPassword, loginState, loginError } = useSelector(selectAuth);
    const navigate = useNavigate();
    const dispatch =  useAppDispatch();

    useEffect(() => {
        switch (loginState) {
            case "ok":
                dispatch(setLoginEmail(""));
                dispatch(setLoginPassword(""));
                navigate("/");
                break;
            case "error":
                alert(loginError);
                break;
            default:
        };
        dispatch(setLoginState(""));
    }, [loginState, dispatch, navigate, loginError]);

    function submit(e : React.FormEvent) {
        e.preventDefault();
        dispatch(login());
    }

    return (
        <section className={`${extraClass} ${styles.form}`}>
            <form onSubmit={submit}>
                <div className={`${styles.center} text text_type_main-medium mb-8`}>Вход</div>
                <div className="m-4">
                    <Input type="email" name="email" placeholder={loginEmail ? "" : "E-mail"} value={loginEmail} onChange={e => dispatch(setLoginEmail(e.target.value))} />
                </div>
                <div className="m-4">
                    <Input type="password"  name="password" icon="ShowIcon" placeholder={ loginPassword ? "" : "Пароль"} value={loginPassword} onChange={e => dispatch(setLoginPassword(e.target.value))} />
                </div>
                <div className={`${styles.center} mt-8 mb-15`}>
                    <Button htmlType="submit" type="primary" size="medium">Войти</Button>
                </div>
                <div className={`${styles.center} pt-15 text text_type_main-small`}><span>Вы - новый пользователь?</span>&nbsp;<Link to="/register">Зарегистрироваться</Link> </div>
                <div className={`${styles.center} m-2 text text_type_main-small`}><span>Забыли пароль?</span>&nbsp;<Link to="/forgot-password">Восстановить пароль</Link></div>
            </form>
        </section>
    );
}

export { Login }