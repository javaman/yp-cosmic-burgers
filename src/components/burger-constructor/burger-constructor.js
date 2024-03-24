import React, { useMemo } from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { drop } from '../../services/burger-constructor';
import { submitOrder } from '../../services/order';
import BurgerConstructorItem from './burger-constructor-item';
import { v4 as uuidv4 } from 'uuid';
import { isAuthenticated } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const BurgerConstructor = () => {
    const {bun, items} = useSelector((store) => store.burgerConstructor);
    const dispatch = useDispatch();

    const [{isHover}, dropTarget] = useDrop({
        accept: "item",
        drop(item) {
            dispatch(drop({...item, uuid: uuidv4()}));
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

    const navigate = useNavigate();

    function orderSubmited(e) {
        if (total > 0) {
            if (isAuthenticated()) {
                dispatch(submitOrder({bun, items}));
            } else {
                navigate("/login");
            }
        } 
    }

    return (
        <div ref={dropTarget} style={extraClass} >
            <div className={styles.listScroll}>
                <ul className={styles.c}>
                    {bun && <BurgerConstructorItem key={bun.uuid + "-top"} index={-1} />}
                    {items.map((i, idx) => (<BurgerConstructorItem key={i.uuid} index={idx} />))}
                    {bun && <BurgerConstructorItem key={bun.uuid + "-bottom"} index={Number.MAX_SAFE_INTEGER} />}
                </ul>
            </div>
            <div className={styles.buttonFooter}>
                <span className='text text_type_digits-medium mr-2'>{total}</span>
                <CurrencyIcon type='primary' />
                <Button htmlType="button" type="primary" size="medium" extraClass='ml-4'  onClick={orderSubmited}>
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

export default BurgerConstructor;