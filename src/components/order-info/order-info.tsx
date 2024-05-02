import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { selectIngredients } from '../../services/ingredients';
import { selectOrder } from '../../services/order';
import { fetchOrder } from '../../services/order';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useAppDispatch } from '../../services/store';

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
    const { ingredients } = useSelector(selectIngredients);
    const { order } = useSelector(selectOrder);
    const dispatch =  useAppDispatch();

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
            <div>
                #{order?.number}
            </div>
            <div>
                {order?.name}
            </div>
            <div>
                {order?.status === "done" ? "Выполнен" : order?.status === "pending" ? "Готовится" : "Отменён"}    
            </div>
            <div>
                Состав:
            </div>
            <ul style={{listStyleType: "none"}}>
                {Array.from(myMap.values()).map(i => <li key={i.id}><OrderInfoIngredient row={i} /></li>)}
            </ul>
            <div>
                <span>{order?.createdAt.toLocaleString()}</span><CurrencyIcon type="primary" /><span>{sum}</span>
            </div>
        </div>
    );
};


