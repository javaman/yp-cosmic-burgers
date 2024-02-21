import styles from './ingredient-details.module.css';

function formatNumber(number) {
    if (number % 10 == 0) {
        return number / 10;
    } else {
        return "" + Math.floor(number / 10) + "." + (number % 10);
    }
}

const NutritionFact = ({name, number}) => {
    return (<div className='m-4'>
        <div className={styles.row2 + ' text text_type_main-small mb-2'}>
            {name}
        </div>
        <div className={styles.row2 + ' text text_type_digits-default'}>
            {formatNumber(number)}
        </div>
    </div>);
}

const IngredientDetails = ({ingredient}) => {
    return (
        <div>
            <div className={styles.row + "m-4"}><img src={ingredient.image_large} className={styles.img}/></div>
            <div className={styles.row + " m-4 text text_type_main-medium"}>{ingredient.name}</div>
            <div className={styles.row}>
                <NutritionFact name="Калории, ккал" number={ingredient.calories} />
                <NutritionFact name="Белки, г" number={ingredient.proteins} />
                <NutritionFact name="Жиры, г" number={ingredient.fat} />
                <NutritionFact name="Углеводы, г" number={ingredient.carbohydrates} />
            </div>
        </div>
    );
};

export default IngredientDetails;