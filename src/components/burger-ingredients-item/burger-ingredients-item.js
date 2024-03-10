import React, { useMemo } from 'react'; 
import {CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients-item.module.css'
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

const BurgerIngredientsItem = ({item}) => {
    const [{isDrag}, dragRef] = useDrag({
        type: "item",
        item: item,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const { items, bun } = useSelector((state) => state.burgerConstructor);

    const count = useMemo(() => {
        if (item.type === 'bun') {
            return bun ? item._id == bun._id ? 2 : 0 : 0; 
        } else {
            return items.filter(i => i._id === item._id).length;
        }
    }, [items, bun]);

    return (
        !isDrag && <div ref={dragRef} className={`${styles.relative} mb-8`}>
            <div className={styles.imgWrap}>
                <img src={item.image} />
            </div>
            <div className={styles.priceWrap}>
                <span className='text text_type_digits-default'>{item.price}</span><CurrencyIcon type="primary" />
            </div>
            <div className={styles.nameWrap + ' text text_type_main-small'}>
                {item.name}
            </div>
            { count > 0 &&
            <div className={`${styles.count}  text text_type_digits-default`}>
                {count}
            </div>}
        </div>);
}


export default BurgerIngredientsItem;