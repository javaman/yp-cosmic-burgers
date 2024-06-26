import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import styles from './burger-ingredients-row.module.css';
import { showIngredient } from "../../services/modals";
import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TBurgerItem from "../../types/burger-types";
import { useAppDispatch } from "../../services/store";

export type TBurgerIngredientsRowParam = {
    firstItem: TBurgerItem;
    secondItem?: TBurgerItem;
};

const BurgerIngredientsRow = (props : TBurgerIngredientsRowParam) => {

    const dispatch =  useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const itemClicked = useCallback((item: TBurgerItem) => {
        dispatch(showIngredient(item));
        const state = {state: {background: location, id: item._id}};
        navigate("/ingredients/" + item._id, state);
    }, [props.firstItem, location, navigate, dispatch]);

    let secondItemElement = (<></>);
    const secondItem = props.secondItem;
    if (secondItem !== undefined) {
        secondItemElement = (
            <div className={styles.column} onClick={() => itemClicked(secondItem)}>
                <BurgerIngredientsItem item={secondItem} />
            </div>
        );
    }

    return (
        <div className={styles.row}>
            <div className={styles.column} onClick={() => itemClicked(props.firstItem)}>
                <BurgerIngredientsItem item={props.firstItem} />
            </div>
            {
                secondItemElement
            }
        </div>
    );
}

export default BurgerIngredientsRow;