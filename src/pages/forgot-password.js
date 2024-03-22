import styles from "./forgot-password.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { setResetEmail } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { requestResetToken } from "../services/auth";

const ForgotPassword = () => {

    const { resetEmail } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function restorePasswordBtnClicked(e) {
        dispatch(requestResetToken());
        navigate("/reset-password");
    };

    return (
        <section className={`content ${styles.form}`}>
            <div>
                <div className={`${styles.center} text text_type_main-medium mb-8`}>Восстановление пароля</div>
                <div className="m-4"><Input type="email" placeholder={resetEmail ? '' : "Укажите e-mail" }  onChange={e => dispatch(setResetEmail(e.target.value))} value={resetEmail} /></div>
                <div className={`${styles.center} mt-8 mb-15`}><Button htmlType="button" type="primary" size="medium" onClick={restorePasswordBtnClicked}>Восстановить</Button></div>
                <div className={`${styles.center} pt-15 text text_type_main-small`}><span>Вспомнили пароль?</span>&nbsp;<Link to="/login">Войти</Link> </div>
            </div>
        </section>
    );
}

export { ForgotPassword }