import { useParams } from "react-router-dom";
import { OrderInfo } from "../components/order-info/order-info";
import { fetchOrder } from "../services/order";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../services/store";
import { selectOrder } from "../services/order";
import styles from "./order.module.css";
import { useEffect } from "react";


const Order = ({ extraClass } : { extraClass: string }) => {
    const { id } = useParams();
    return (
        <section className={`${extraClass} ${styles.center}`}>            
            <OrderInfo number={Number(id)}/>
        </section>
    );
}

export { Order };