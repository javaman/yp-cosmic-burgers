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

            <NavLink to="#" className="ml-8 mt-8 mb-8"><ListIcon type="primary" /></NavLink>
            <a href="#" className='text text_type_main-default ml-4 mt-4 mb-4 text_color_inactive'>Лента заказов</a>
        
            <NavLink to="/" className={styles.logo}><Logo /></NavLink>

            <NavLink to="/profile" className={class4Icon}><ProfileIcon type="primary" /></NavLink>
            <NavLink to="/profile" className={class4Text}>Личный кабинет</NavLink>
    </header>
}

export default AppHeader;