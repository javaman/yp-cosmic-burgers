import styles from "./ingredient.module.css";
import { Input, Button, ShowIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useParams } from "react-router-dom";
import { setLoginEmail, setLoginPassword } from "../services/auth";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../services/auth";
import { setLoginState } from "../services/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

const Ingredient = () => {
    const { id } = useParams();
    const { ingredients } = useSelector(store => store.ingredients);
    const item = ingredients.find(element => element._id === id);
    return (
        <section className={`content ${styles.form}`}>            
            <div>
                <div className={`${styles.center} text text_type_main-medium`}>Детали ингредиента</div>
                <div><IngredientDetails ingredient={item}/></div>
            </div>
        </section>
    );
}

export { Ingredient };