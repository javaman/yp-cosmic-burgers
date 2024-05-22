import { useMemo } from 'react'; 
import {CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients-item.module.css'
import { useDrag } from 'react-dnd';
import TBurgerItem from '../../types/burger-types';
import { useAppSelector } from '../../services/store';

export type TBurgerIngredientsItemParams = {
    item: TBurgerItem
};

const BurgerIngredientsItem = ({item} : TBurgerIngredientsItemParams) => {
    const [{isDrag}, dragRef] = useDrag({
        type: "item",
        item: item,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const { items, bun } = useAppSelector( store => store.burgerConstructor );

    const count = useMemo(() => {
        if (item.type === 'bun') {
            return bun ? item._id === bun._id ? 2 : 0 : 0; 
        } else {
            return items.filter(i => i._id === item._id).length;
        }
    }, [items, bun, item._id, item.type]);

    let result = (<></>);
    if (!isDrag) {
        result = (
            <div ref={dragRef} className={`${styles.relative} mb-8`} data-cy="item">
                <div className={styles.imgWrap}>
                    <img src={item.image} />
                </div>
                <div className={styles.priceWrap}>
                    <span className='text text_type_digits-default'>{item.price}</span><CurrencyIcon type="primary" />
                </div>
                <div className={styles.nameWrap + ' text text_type_main-small'}>
                    {item.name}
                </div>
                { count > 0 ?
                    <div className={`${styles.count}  text text_type_digits-default`}>
                        {count}
                    </div> : <></>}
        </div>
        )
    }
    return result;
}


export default BurgerIngredientsItem;