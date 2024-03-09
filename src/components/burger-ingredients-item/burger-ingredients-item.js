import React from 'react'; 
import {CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients-item.module.css'
import { useDrag } from 'react-dnd';

const BurgerIngredientsItem = ({item}) => {
    const [{isDrag}, dragRef] = useDrag({
        type: "item",
        item: item,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        !isDrag && <div ref={dragRef}>
            <div className={styles.imgWrap}>
                <img src={item.image} />
            </div>
            <div className={styles.priceWrap}>
                <span className='text text_type_digits-default'>{item.price}</span><CurrencyIcon type="primary" />
            </div>
            <div className={styles.nameWrap + ' text text_type_main-small'}>
                {item.name}
            </div>
        </div>);
}


export default BurgerIngredientsItem;