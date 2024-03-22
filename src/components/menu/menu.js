import { NavLink, useNavigate } from "react-router-dom";
import styles from './menu.module.css';
import { logout } from "../../services/auth";
import { useDispatch } from "react-redux";

const Menu = ({ hint, children }) => {

    const d = useDispatch();
    const navigate = useNavigate();

    function className(state) {
        if(state.isActive) {
            return "text text_type_main-medium";
        } else {
            return "text text_type_main-medium text_color_inactive";
        }
    }

    function logoutButtonClicked(e) {
        e.preventDefault();
        d(logout());
        navigate("/");
    }
    
    return (
        <section className={`content ${styles.container}`}>
            <section className={`${styles.menu} m-15`}>
                <ul className={styles.list}>
                    <li className="m-4"><NavLink to="/profile" className={className} end>Профиль</NavLink></li>
                    <li className="m-4"><NavLink to="/profile/orders" className={className}>История&nbsp;заказов</NavLink></li>
                    <li className="m-4"><NavLink to="/profile/exit" className={className} onClick={ logoutButtonClicked }>Выход</NavLink></li>
                </ul>
                <div className="ml-15 mt-15 pt-15 text text_type_main-small text_color_inactive">{hint}</div>
            </section>
            <section className={`${styles.profile} m-15`}>
                {children}                
            </section>
        </section>
    );


}

export { Menu }