import React from 'react';
import ReactDOM from 'react-dom';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import Types from '../../prop-types';
import PropTypes from 'prop-types';



const BurgerConstructor = ({ items, submitOrder }) => {
    return (
        <div>
            <div className={styles.listScroll}>
                <ul className={styles.c}>
                    {items.map((i, idx) => (<li key={i._id}><ConstructorElement thumbnail={i.image_mobile} text={i.name} price={i.price} type={idx == 0 ? 'top' : idx == items.length - 1 ? 'bottom' : undefined} /></li>))}
                </ul>
            </div>
            <div className={styles.buttonFooter}>
                <span className='text text_type_digits-medium mr-2'>610</span>
                <CurrencyIcon type='primary' />
                <Button htmlType="button" type="primary" size="medium" extraClass='ml-4' onClick={submitOrder}>
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

BurgerConstructor.propTypes = {
    items: PropTypes.arrayOf(Types.Item),
    submitOrder: PropTypes.func
}

export default BurgerConstructor;