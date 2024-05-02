import styles from './feed-statistics.module.css';
import { TOrder } from '../../services/types';


export const FeedStatistics = ({ orders, total, today }: { orders: TOrder[]; total: number; today: number }) => {
    let readyParts: TOrder[][] = [[]];
    let notReadyParts: TOrder[][] = [[]];
    let reversedOrders = [...orders].sort((a, b) => a.number - b.number).reverse();

    for (const order of reversedOrders) {
        if (order.status === "done") {
            if (readyParts[readyParts.length - 1].length === 5) {
                readyParts.push([]);
            }
            const destination = readyParts[readyParts.length - 1];
            destination.push({ ...order });
        } else {
            if (notReadyParts[notReadyParts.length - 1].length === 5) {
                notReadyParts.push([]);
            }
            const destination = notReadyParts[notReadyParts.length - 1];
            destination.push({ ...order });
        }
    }


    if (readyParts[readyParts.length - 1].length === 0) {
        readyParts.pop();
    }

    if (notReadyParts[notReadyParts.length - 1].length === 0) {
        notReadyParts.pop();
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.ready} mr-10`}>
                <div className='text text_type_main-medium'>Готовы:</div>
                <div className={styles.horScroll}>
                    {
                        readyParts.length > 0 && <ul className={styles.hlist}>{mapParts(readyParts)}</ul>
                    }
                </div>
            </div>
            <div className={styles.progress}>
                <div className='text text_type_main-medium'>В работе:</div>
                <div>
                    {
                        notReadyParts.length > 0 && <ul className={styles.hlist}>{mapParts(notReadyParts)}</ul>
                    }
                </div>
            </div>
            <div className={styles.total}>
                <div className='text text_type_main-medium mb-8'>Выполнено за все время:</div>
                <div className={`text text_type_digits-large ${styles.neon}`}>{total}</div>
            </div>

            <div className={styles.day}>
               <div className='text text_type_main-medium mb-8 mt-8'>Выполнено за сегодня:</div>
                <div className={`text text_type_digits-large ${styles.neon}`}>{today}</div>
            </div>
        </div>
    );
}

function mapParts(parts: TOrder[][]): any {
    return (
        parts.map(ps => <li key={ps[0].uid + "k"}><ul>
            {ps.map(p => <li className={`text text_type_digits-default`} key={p.uid}>{`${p.number}`}</li>)}
        </ul></li>));
};