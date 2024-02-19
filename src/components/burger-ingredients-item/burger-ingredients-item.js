import React from 'react'; 
import ReactDOM from 'react-dom';
import {CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerIngredientsItem = ({url, price, name}) => {
    return (
        <div>
            <div style={{textAlign: 'center'}}>
                <img src={url} />
            </div>
            <div style={{textAlign: 'center', justifyContent: 'center', display: 'flex'}}>
                <span className='text text_type_digits-default'>{price}</span><CurrencyIcon type="primary" />
            </div>
            <div className='text text_type_main-small' style={{textAlign: 'center'}}>
                {name}
            </div>
        </div>);
}

export default BurgerIngredientsItem;