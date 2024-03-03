import React from 'react';
import ReactDOM from 'react-dom';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import Types from '../../prop-types';
import PropTypes from 'prop-types';
import BurgerConstructorContext from '../../services/burger-constructor-context';

const BurgerConstructor = ({ submitOrder }) => {
    const {bun, items} = React.useContext(BurgerConstructorContext);

    function computeTotal() {
        return {total: bun.price * 2 + items.map(i => i.price).reduce((a, b) => a + b, 0)};
    }

    function computeTotalReducer(state, action) {
        return computeTotal();
    }

    const [total, dispatchTotal] = React.useReducer(computeTotalReducer, {total: 0}, computeTotal);

    // Простите! Я только учусь.
    React.useEffect(() => {
        dispatchTotal();
    }, [bun, items]);


    return (
        <div>
            <div className={styles.listScroll}>
                <ul className={styles.c}>
                    <li><ConstructorElement thumbnail={bun.image_mobile} text={bun.name} price={bun.price} type='top' /></li>
                    {items.map((i, idx) => (<li key={i._id}><ConstructorElement thumbnail={i.image_mobile} text={i.name} price={i.price} type={idx == 0 ? 'top' : idx == items.length - 1 ? 'bottom' : undefined} /></li>))}
                    <li><ConstructorElement thumbnail={bun.image_mobile} text={bun.name} price={bun.price} type='bottom' /></li>
                </ul>
            </div>
            <div className={styles.buttonFooter}>
                <span className='text text_type_digits-medium mr-2'>{total.total}</span>
                <CurrencyIcon type='primary' />
                <Button htmlType="button" type="primary" size="medium" extraClass='ml-4' onClick={submitOrder}>
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

BurgerConstructor.propTypes = {
    submitOrder: PropTypes.func
}

export default BurgerConstructor;