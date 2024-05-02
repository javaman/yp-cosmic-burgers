import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchOrder } from '../../services/order';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import styles from './order-info.module.css';
import moment from "moment/min/moment-with-locales";

const OrderInfoIngredient = ({row} : {row: TIngredientInfo}) => {    
    return (
        <div><img alt="" src={row.icon} />{row.name}&nbsp;{row.count} x {row.price}<CurrencyIcon type="primary" /> </div>
    );
};


type TIngredientInfo = {
    id : string;
    icon : string;
    name : string;
    count : number;
    price : number;
}

export const OrderInfo = ({ number }: { number : number }) => {
    const { ingredients } = useAppSelector( store => store.ingredients );
    const { order } = useAppSelector( store=> store.order );
    const dispatch =  useAppDispatch();


    moment.locale("ru");

    useEffect(() => {
        dispatch(fetchOrder(number));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const myMap = new Map<string, TIngredientInfo>();

    if (order?.ingredients) {
        for (const ingredient of order?.ingredients) {
            const row = myMap.get(ingredient);
            if (row) {
                row.count = row.count + 1;
            } else {
                const j = ingredients.find(x => x._id === ingredient);
                if (j) {
                    myMap.set(ingredient, {
                        id: ingredient,
                        icon: j.image_mobile,
                        name: j.name,
                        count: 1,
                        price: j.price
                    });
                }
            }
        }
    }

    let sum = Array.from(myMap.values()).reduce((a, cv) => a + cv.count * cv.price, 0);
  
    return (
        <div>
            <div className={`${styles.orderNumber} text text_type_digits-default`}>
                #{order?.number}
            </div>
            <div className={` ${styles.orderName} text text_type_main-medium mt-8`}>
                {order?.name}
            </div>
            <div className={`text text_type_main mt-8`}>
                {order?.status === "done" ? "Выполнен" : order?.status === "pending" ? "Готовится" : "Отменён"}    
            </div>
            <div className={`text text_type_main-medium mt-8`}> 
                Состав:
            </div>
            <div className={styles.ingredients}>
                <ul className={styles.list}>
                    {Array.from(myMap.values()).map(i => <li key={i.id}><OrderInfoIngredient row={i} /></li>)}
                </ul>
            </div>
            <div className={styles.bottom}>
                <span className={`${styles.left} text text_type_main-default text_color_inactive`}>{moment(order?.createdAt).calendar()}</span><span className={styles.right}><span className='text text_type_digits-default'>{sum}</span>&nbsp;&nbsp;<CurrencyIcon type="primary" /></span>
            </div>
        </div>
    );
};


