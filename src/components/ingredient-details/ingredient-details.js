import styles from './ingredient-details.module.css';
import NutritionFact from '../nutrition-fact/nutrition-fact';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const IngredientDetails = (params) => {

    let i;
    const { ingredients } = useSelector( store => store.ingredients);
    const navigate = useNavigate();


    if (params.ingredient) {
        i = params.ingredient;
    } else {
        if (!ingredients.length) {
            i = {};
        } else {
            i = ingredients.find(i => i._id === params.id)
        }
    } 
    
    useEffect(() => {
        if (!ingredients.length && !!params.id) {
            navigate("/ingredients/" + params.id, {replace: true});
        }
    }, []);


    return (
        <div>
            <div className={styles.row + "m-4"}><img src={i.image_large} className={styles.img}/></div>
            <div className={styles.row + " m-4 text text_type_main-medium"}>{i.name}</div>
            <div className={styles.row}>
                <NutritionFact name="Калории, ккал" number={i.calories} />
                <NutritionFact name="Белки, г" number={i.proteins} />
                <NutritionFact name="Жиры, г" number={i.fat} />
                <NutritionFact name="Углеводы, г" number={i.carbohydrates} />
            </div>
        </div>
    );
};

export default IngredientDetails;