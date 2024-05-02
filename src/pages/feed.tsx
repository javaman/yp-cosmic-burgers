import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../services/store";
import { connectFeedAction, disconnectFeedAction } from "../services/feed";
import { FEED_URL } from "../constants";
import styles from './feed.module.css';
import { FeedList } from "../components/feed-list/feed-list";
import { FeedStatistics } from "../components/feed-statistics/feed-statistics";

const Feed = ({ extraClass }: { extraClass: string }) => {

    const dispatch = useAppDispatch();
    const feed = useAppSelector(store => store.feed);

    useEffect(() => {
        dispatch(connectFeedAction(`${FEED_URL}/all`));
        return () => {
            dispatch(disconnectFeedAction());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (<div className={`${extraClass} ${styles.container}`}>
        <div className={`${styles.feedHeader} text text_type_main-medium`}>
            <h1>Лента заказов</h1>
        </div>
        <div className={styles.feedList}>
            <div>
                <FeedList orders={feed.orders} />
            </div>
        </div>
        <div className={styles.feedStatistics}>
            <FeedStatistics orders={feed.orders} today={feed.totalToday} total={feed.total} />
        </div>
    </div>);
}

export default Feed;