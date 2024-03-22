import styles from "./login.module.css";
import { Input, Button, ShowIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { setLoginEmail, setLoginPassword } from "../services/auth";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../services/auth";
import { setLoginState } from "../services/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { loginEmail, loginPassword, loginState, loginError } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const d = useDispatch();

    useEffect(() => {
        switch (loginState) {
            case "ok":
                d(setLoginEmail(""));
                d(setLoginPassword(""));
                navigate("/");
                break;
            case "error":
                alert(loginError);
                break;
        };
        d(setLoginState(""));
    }, [loginState]);

    return (
        <section className={`content ${styles.form}`}>
            <div>
                <div className={`${styles.center} text text_type_main-medium mb-8`}>Вход</div>
                <div className="m-4">
                    <Input type="email" placeholder={loginEmail ? "" : "E-mail"} value={loginEmail} onChange={e => d(setLoginEmail(e.target.value))} />
                </div>
                <div className="m-4">
                    <Input type="password"  icon="ShowIcon" placeholder={ loginPassword ? "" : "Пароль"} value={loginPassword} onChange={e => d(setLoginPassword(e.target.value))} />
                </div>
                <div className={`${styles.center} mt-8 mb-15`}>
                    <Button htmlType="button" type="primary" size="medium" onClick={e => d(login())}>Войти</Button>
                </div>
                <div className={`${styles.center} pt-15 text text_type_main-small`}><span>Вы - новый пользователь?</span>&nbsp;<Link to="/register">Зарегистрироваться</Link> </div>
                <div className={`${styles.center} m-2 text text_type_main-small`}><span>Забыли пароль?</span>&nbsp;<Link to="/forgot-password">Восстановить пароль</Link></div>
            </div>
        </section>
    );
}

export { Login }