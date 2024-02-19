import React from 'react'; 
import ReactDOM from 'react-dom';
import { BurgerIcon, ListIcon, ProfileIcon, Logo  } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

const AppHeader = () => {
    return <div className={styles.header}>
            <span className='ml-8 mt-8 mb-8'><BurgerIcon type="primary"/></span>
            <span className='text text_type_main-default m-4'>Конструктор</span>
            <ListIcon type="primary" />
            <span className='text text_type_main-default ml-4 mt-4 mb-4'>Лента заказов</span>
            <span style={{flexGrow: 1, display: 'flex', justifyContent: 'center' }}><Logo /></span>
            <span className='ml-8'><ProfileIcon type="primary" /></span>
            <span className='text text_type_main-default mr-8 ml-4'>Личный кабинет</span>
    </div>
}

export default AppHeader;