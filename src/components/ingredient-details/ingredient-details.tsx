import styles from './ingredient-details.module.css';
import NutritionFact from '../nutrition-fact/nutrition-fact';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import TBurgerItem from '../../types/burger-types';
import { useAppSelector } from '../../services/store';

const IngredientDetails = ({ingredient, id} : {ingredient?: TBurgerItem, id?: string}) => {

    let i: TBurgerItem | undefined;
    const { ingredients } = useAppSelector( store => store.ingredients );
    const navigate = useNavigate();


    if (ingredient !== undefined) {
        i = ingredient;
    } else {
        i = ingredients.find(it => it._id === id)
    } 
    
    useEffect(() => {
        if (ingredient !== undefined) {
            navigate("/ingredients/" + ingredient._id, {replace: true});
        }
    }, []);

    if (i === undefined) {
        return (<></>);
    }

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