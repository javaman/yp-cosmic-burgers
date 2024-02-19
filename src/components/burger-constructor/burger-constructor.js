import React from 'react';
import ReactDOM from 'react-dom';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'


const BurgerConstructor = () => {
    const [current, setCurrent] = React.useState('one')
    return (
        <div>
            <ul className={styles.c}>
                <li><ConstructorElement /></li>
                <li><ConstructorElement /></li>
                <li><ConstructorElement /></li>
            </ul>
            <div style={{float: "right", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <span className='text text_type_digits-medium mr-2'>610</span>
                <CurrencyIcon type='primary' />
                <Button htmlType="button" type="primary" size="medium" extraClass='ml-4'>
                    Оформить заказ
                </Button>       
            </div>
        </div>
    );
}

export default BurgerConstructor;