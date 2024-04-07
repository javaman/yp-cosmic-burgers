import styles from "./ingredient.module.css";
import { useParams } from "react-router-dom";
import { useSelector  } from "react-redux";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { selectIngredients } from "../services/ingredients";

const Ingredient = ({ extraClass } : { extraClass: string }) => {
    const { id } = useParams();
    const { ingredients } = useSelector(selectIngredients);
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