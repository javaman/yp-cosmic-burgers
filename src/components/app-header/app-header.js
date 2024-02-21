import React from 'react'; 
import ReactDOM from 'react-dom';
import { BurgerIcon, ListIcon, ProfileIcon, Logo  } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

const AppHeader = () => {
    return <div className={styles.header}>
            <a href="#" className='ml-8 mt-8 mb-8'><BurgerIcon type="primary"/></a>
            <a href="#" className='text text_type_main-default m-4'>Конструктор</a>
            <ListIcon type="primary" />
            <a href="#" className='text text_type_main-default ml-4 mt-4 mb-4'>Лента заказов</a>
            <a href="#" style={{flexGrow: 1, display: 'flex', justifyContent: 'center' }}><Logo /></a>
            <a href="#" className='ml-8'><ProfileIcon type="primary" /></a>
            <a href="#" className='text text_type_main-default mr-8 ml-4'>Личный кабинет</a>
    </div>
}

export default AppHeader;