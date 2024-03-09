import React from 'react';
import styles from './order-details.module.css';
import bullet from '../../images/od.png';
import { useSelector } from 'react-redux';


const OrderDetails = () => {
    const {orderNumber} = useSelector( store => store.order );
    return (
        <div>
            <div className={styles.centered + ' text text_type_digits-large mt-8'}>{orderNumber}</div>
            <div className={styles.centered + ' text text_type_main-defalt  mt-8 mb-8'}>идентификатор заказа</div>
            <img src={bullet} className={styles.imgCentered} />
            <div className={styles.centered + ' text text_type_main-small mt-8'}>Ваш заказ начали готовить</div>
            <div className={styles.centered + ' text text_type_main-small text_color_inactive'}>Дождитесь гтовности на орбитальной станции</div>
        </div>
    );
};

export default OrderDetails;