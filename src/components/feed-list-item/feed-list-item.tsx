import { TOrder } from "../../services/types";
import { useAppSelector } from "../../services/store";
import styles from "./feed-list-item.module.css";
import moment from "moment/min/moment-with-locales";
import { ImageStack } from "../image-stack/image-stack";


export const FeedListItem = ({order} : {order : TOrder}) => {

    const { ingredients } = useAppSelector( store => store.ingredients );

    moment.locale("ru");

    let sum = 0;
    let count = 0;

    const urls = new Map<string, string>();

    order.ingredients.reduce((accumulator, item) => {
        const ingredient = ingredients.find(ing => ing._id === item);
        if (ingredient) {
            sum += ingredient.price;
            count += 1;
            accumulator.set(item, ingredient.image_mobile);
        }
        return accumulator;
    }, urls);

    return (
        <div className={`${styles.feedItem} m-4 p-4`}>
            <div className="mb-4"><span className={`text text_type_main-medium ${styles.oNum}`}>#{order.number}</span><span className={`${styles.oDate} text text_type_main-default`}>{moment(order.createdAt).calendar()}</span></div>
            <div className="text text_type_main-medium mt-8">{order.name}</div>
            <div>
                <ImageStack sum={sum} count={count} images={Array.from(urls.values())} />
            </div>
        </div>
    );
};