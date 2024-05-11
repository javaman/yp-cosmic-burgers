import styles from './nutrition-fact-styles.module.css';

function formatNumber(number: number) {
    if (number % 10 === 0) {
        return number / 10;
    } else {
        return "" + Math.floor(number / 10) + "." + (number % 10);
    }
}

const NutritionFact = ({name, number} : {name: string; number: number}) => {
    return (<div className='m-4'>
        <div className={styles.row2 + ' text text_type_main-small mb-2'}>
            {name}
        </div>
        <div className={styles.row2 + ' text text_type_digits-default'}>
            {formatNumber(number)}
        </div>
    </div>);
}

export default NutritionFact;