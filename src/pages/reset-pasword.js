import styles from "./reset-password.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendNewPassword, setNewPassword, setNewPasswordToken } from "../services/auth";
import { useEffect } from "react";

const ResetPassword = () => {

    const { newPassword, newPasswordToken } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    function restoreButtonClicked(e) {
        dispatch(sendNewPassword());  
    }

    useEffect(() => {
        return () => {
            dispatch(setNewPassword(''));
            dispatch(setNewPasswordToken(''));
        }
    }, []);

    

    return (
        <section className={`content ${styles.form}`}>
            <div>
                <div className={`${styles.center} text text_type_main-medium mb-8`}>Восстановление пароля</div>
                <div className="m-4"><Input type="password" icon="ShowIcon" placeholder={newPassword ? '' : 'Введите новый пароль'} onChange={e => dispatch(setNewPassword(e.target.value))} value={newPassword} /></div>
                <div className="m-4"><Input type="text" placeholder={ newPasswordToken ? "": "Введите код из письма"} value={newPasswordToken} onChange={e => dispatch(setNewPasswordToken(e.target.value))}/></div>
                <div className={`${styles.center} mt-8 mb-15`}><Button htmlType="button" type="primary" size="medium" onClick={restoreButtonClicked}>Восстановить</Button></div>
                <div className={`${styles.center} pt-15 text text_type_main-small`}><span>Вспомнили пароль?</span>&nbsp;<Link to="/login">Войти</Link> </div>
            </div>
        </section>
    );
}

export { ResetPassword }