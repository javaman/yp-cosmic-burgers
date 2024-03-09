import React, { useMemo } from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { drop } from '../../services/burger-constructor';
import { submitOrder } from '../../services/order';
import BurgerConstructorItem from './burger-constructor-item';


const BurgerConstructor = () => {
    const {bun, items} = useSelector((store) => store.burgerConstructor);
    const dispatch = useDispatch();

    const [{isHover}, dropTarget] = useDrop({
        accept: "item",
        drop(item) {
            dispatch(drop(item));
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const total = useMemo(() => {
        return (bun ? bun.price * 2 : 0) + items.map(i => i.price).reduce((a, b) => a + b, 0);
    }, [items, bun]);

    const extraClass = {};
    if (isHover) {
        extraClass.border = "solid";
    }

    return (
        <div ref={dropTarget} style={extraClass} >
            <div className={styles.listScroll}>
                <ul className={styles.c}>
                    {bun && <BurgerConstructorItem key={-1} index={-1} />}
                    {items.map((i, idx) => (<BurgerConstructorItem key={idx} index={idx} />))}
                    {bun && <BurgerConstructorItem key={Number.MAX_SAFE_INTEGER} index={Number.MAX_SAFE_INTEGER} />}
                </ul>
            </div>
            <div className={styles.buttonFooter}>
                <span className='text text_type_digits-medium mr-2'>{total}</span>
                <CurrencyIcon type='primary' />
                <Button htmlType="button" type="primary" size="medium" extraClass='ml-4' onClick={() => dispatch(submitOrder({bun, items}))}>
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

export default BurgerConstructor;