import styles from './ingredient-details.module.css';
import Types from '../../prop-types';
import NutritionFact from '../nutrition-fact/nutrition-fact';

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

IngredientDetails.propTypes = {
    ingredient: Types.Item
};

export default IngredientDetails;