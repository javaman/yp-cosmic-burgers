import { FeedListItem } from "../feed-list-item/feed-list-item";
import { TOrder } from "../../services/types";
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../services/store";
import { showOrderInfo } from "../../services/modals";
import { useNavigate, useLocation } from "react-router-dom";


export const FeedList = ({orders} : {orders : TOrder[]}) => {

    const dispatch =  useDispatch.withTypes<AppDispatch>()();
    const navigate = useNavigate();
    const location = useLocation();

    function handleClick(e : MouseEvent, o : TOrder) {
        e.preventDefault();
        dispatch(showOrderInfo(o));
        const state = {state: {background: location, id: o.number}};
        navigate("/feed/" + o.number, state);
    }

    return (
        <ul>
            {
                [...orders].reverse().map(o => <li key={o.uid} onClick={e => handleClick(e, o)}><FeedListItem order={o} /></li>)
            }               
        </ul>
    );
};