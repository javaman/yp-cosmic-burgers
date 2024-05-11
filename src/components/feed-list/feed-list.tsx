import { FeedListItem } from "../feed-list-item/feed-list-item";
import { TOrder } from "../../services/types";
import { MouseEvent } from "react";
import { showOrderInfo } from "../../services/modals";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../services/store";
import styles from "./feed-list.module.css";


export const FeedList = ({orders} : {orders : TOrder[]}) => {

    const dispatch =  useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    function handleClick(e : MouseEvent, o : TOrder) {
        e.preventDefault();
        dispatch(showOrderInfo(o));
        const state = {state: {background: location, id: o.number}};
        navigate("/feed/" + o.number, state);
    }

    return (
        <ul className={styles.feedList}>
            {
                orders.map(o => <li key={o.uid} onClick={e => handleClick(e, o)}><FeedListItem order={o} /></li>)
            }               
        </ul>
    );
};