import { NavLink, useNavigate } from "react-router-dom";
import styles from './menu.module.css';
import { logout } from "../../services/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../services/store";

export type TMenuProps = {
    hint? : string;
    extraClass? : string;
}

const Menu = ({ hint, children, extraClass } : React.PropsWithChildren<TMenuProps>) => {

    const dispatch = useDispatch.withTypes<AppDispatch>()();
    const navigate = useNavigate();

    function className({isActive} : {isActive: boolean}) {
        if (isActive) {
            return "text text_type_main-medium";
        } else {
            return "text text_type_main-medium text_color_inactive";
        }
    }

    function logoutButtonClicked(e : React.MouseEvent) {
        e.preventDefault();
        dispatch(logout());
        navigate("/");
    }
    
    return (
        <section className={`${extraClass} ${styles.container}`}>
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