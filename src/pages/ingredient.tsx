import styles from "./ingredient.module.css";
import { useParams } from "react-router-dom";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useAppSelector } from "../services/store";

const Ingredient = ({ extraClass } : { extraClass: string }) => {
    const { id } = useParams();
    const { ingredients } = useAppSelector( store => store.ingredients );
    const item = ingredients.find(element => element._id === id);
    return (
        <section className={`${extraClass} ${styles.form}`}>            
            <div>
                <div className={`${styles.center} text text_type_main-medium`}>Детали ингредиента</div>
                <div><IngredientDetails ingredient={item}/></div>
            </div>
        </section>
    );
}

export { Ingredient };