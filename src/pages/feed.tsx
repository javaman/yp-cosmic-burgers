import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, selectFeed } from "../services/store";
import { connectFeedAction, disconnectFeedAction } from "../services/feed";
import { FEED_URL } from "../constants";
import  styles from './feed.module.css';
import { FeedList } from "../components/feed-list/feed-list";
import { FeedStatistics } from "../components/feed-statistics/feed-statistics";

const Feed = ({ extraClass } : { extraClass : string }) => {

    const dispatch =  useDispatch.withTypes<AppDispatch>()();        
    const feed = useSelector(selectFeed);

    useEffect(() => {
        dispatch(connectFeedAction(`${FEED_URL}/all`));
        return () => {
            dispatch(disconnectFeedAction());
        };
    }, []);

    return (<div className={`${extraClass} ${styles.container}`}>
                <div className={`${styles.feedHeader} text text_type_main-medium`}>
                    <h1>Лента заказов</h1>
                </div>
                <div className={styles.feedList}>
                    <FeedList orders={feed.orders}/>
                </div>
                <div className={styles.feedStatistics}>
                    <FeedStatistics orders={feed.orders} today={feed.totalToday} total={feed.total}/>
                </div>
    </div>);
}

export default Feed;