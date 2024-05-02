import styles from "./register.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { register, setRegisterEmail, setRegisterLogin, setRegisterPassword } from "../services/auth";
import { useAppDispatch, useAppSelector } from "../services/store";


const Register = ( { extraClass } : { extraClass : string } ) => {
    const { registerEmail, registerLogin, registerPassword } = useAppSelector( store => store.auth );
    const navigate = useNavigate();
    const dispatch =  useAppDispatch();
    function registerButtonClicked() {
        dispatch(register());
        dispatch(setRegisterLogin(""));
        dispatch(setRegisterEmail(""));
        dispatch(setRegisterPassword(""));
        navigate("/login");
    }
    return (
        <section className={`${extraClass} ${styles.form}`}>
            <div>
                <div className={`${styles.center} text text_type_main-medium mb-8`}>Регистрация</div>
                <div className="m-4">
                    <Input type="text" placeholder={registerLogin ? "" : "Имя"} value={registerLogin} onChange={e => dispatch(setRegisterLogin(e.target.value))} />
                </div>
                <div className="m-4">
                    <Input type="email" placeholder={registerEmail ? "" : "E-mail"} value={registerEmail} onChange={e => dispatch(setRegisterEmail(e.target.value))} />
                </div>
                <div className="m-4">
                    <Input type="password" icon="ShowIcon" placeholder={registerPassword ? "" : "Пароль"} value={registerPassword} onChange={e => dispatch(setRegisterPassword(e.target.value))}  />
                </div>
                <div className={`${styles.center} mt-8 mb-15`}><Button htmlType="button" type="primary" size="medium" onClick={registerButtonClicked}>Зарегистрироваться</Button></div>
                <div className={`${styles.center} pt-15 text text_type_main-small`}><span>Уже зарегистрированы?</span>&nbsp;<Link to="/login">Войти</Link></div>                
            </div>
        </section>
    );
}

export { Register }