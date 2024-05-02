import { useParams } from "react-router-dom";
import { OrderInfo } from "../components/order-info/order-info";
import styles from "./order.module.css";

const Order = ({ extraClass } : { extraClass: string }) => {
    const { id } = useParams();
    return (
        <section className={`${extraClass} ${styles.center}`}>            
            <OrderInfo number={Number(id)}/>
        </section>
    );
}

export { Order };