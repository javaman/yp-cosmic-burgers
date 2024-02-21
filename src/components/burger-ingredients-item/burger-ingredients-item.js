import React from 'react'; 
import ReactDOM from 'react-dom';
import {CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components'
import Types from '../../prop-types';
import PropTypes from 'prop-types';
import styles from './burger-ingredients-item.module.css'

const BurgerIngredientsItem = ({url, price, name}) => {
    return (
        <div>
            <div className={styles.imgWrap}>
                <img src={url} />
            </div>
            <div className={styles.priceWrap}>
                <span className='text text_type_digits-default'>{price}</span><CurrencyIcon type="primary" />
            </div>
            <div className={styles.nameWrap + ' text text_type_main-small'}>
                {name}
            </div>
        </div>);
}

BurgerIngredientsItem.propTypes = {
    url: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}

export default BurgerIngredientsItem;