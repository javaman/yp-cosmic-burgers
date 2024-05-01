import { MouseEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../services/store";
import { connectFeedAction, disconnectFeedAction } from "../services/feed";
import { FEED_URL } from "../constants";
import Cookies from 'js-cookie';
import { selectFeed } from "../services/store";
import { FeedListItem } from "../components/feed-list-item/feed-list-item";
import styles from "./orders.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { TOrder } from "../services/types";
import { showOrderInfo } from "../services/modals";

const Orders = ({extraClass} : {extraClass?: string}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch =  useDispatch.withTypes<AppDispatch>()();
    const feed = useSelector(selectFeed);

    useEffect(() => {
        dispatch(connectFeedAction(`${FEED_URL}?token=${Cookies.get('access-token')?.substring(7)}`));
        return () => {
            dispatch(disconnectFeedAction());
        };
    }, []);

    function showModal(e : MouseEvent, order: TOrder) {
        e.preventDefault();
        dispatch(showOrderInfo(order));
        const state = {state: {background: location, id: order.number}};
        navigate("/profile/orders/" + order.number, state);
    }

    return (<div className={extraClass}> 
        <ul className={styles.list}>
            {feed.orders.map(o => <li key={o.uid} onClick={e => showModal(e, o)}><FeedListItem order={o} /></li>)}
        </ul>
    </div>);
}

export default Orders;