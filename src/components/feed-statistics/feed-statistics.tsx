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
            <div className={styles.ready}>
                <div>Готовы:</div>
                <div className={styles.horScroll}>
                    {
                        readyParts.length > 0 && <ul className={styles.hlist}>{mapParts(readyParts)}</ul>
                    }
                </div>
            </div>
            <div className={styles.progress}>
                <div>В работе:</div>
                <div>
                    {
                        notReadyParts.length > 0 && <ul className={styles.hlist}>{mapParts(notReadyParts)}</ul>
                    }
                </div>
            </div>
            <div className={styles.total}>
                <div>Выполнено за все время:</div>
                <div>{total}</div>
            </div>

            <div className={styles.today}>
                <div>Выполнено за сегодня:</div>
                <div>{today}</div>
            </div>
        </div>
    );
}

function mapParts(parts: TOrder[][]): any {
    return (
        parts.map(ps => <li><ul>
            {ps.map(p => <li>{`${p.number}`}</li>)}
        </ul></li>));
};