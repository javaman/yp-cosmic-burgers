import { BurgerIcon, ListIcon, ProfileIcon, Logo  } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import { NavLink } from 'react-router-dom';

const AppHeader = ({ extraClass } : {extraClass: string}) => {

    function class4Text({ isActive } : {isActive: boolean}) {
        if (isActive) {
            return "text text_type_main-default m-4";
        } else {
            return "text text_type_main-default m-4 text_color_inactive";
        }
    };

    function class4Icon({ isActive } : {isActive: boolean}) {
        if (isActive) {
            return `${styles.glow} ml-8 mt-8 mb-8`;
        } else {
            return "ml-8 mt-8 mb-8";
        }
    }

    return <header className={`${styles.header} ${extraClass}`}>
            <NavLink to="/" className={class4Icon}><BurgerIcon type="primary"/></NavLink>
            <NavLink to="/" className={class4Text}>Конструктор</NavLink>

            <NavLink to="/feed" className={class4Icon}><ListIcon type="primary" /></NavLink>
            <NavLink to="/feed" className={class4Text}>Лента заказов</NavLink>
        
            <NavLink to="/" className={styles.logo}><Logo /></NavLink>

            <NavLink to="/profile" className={class4Icon}><ProfileIcon type="primary" /></NavLink>
            <NavLink to="/profile" className={class4Text}>Личный кабинет</NavLink>
    </header>
}

export default AppHeader;