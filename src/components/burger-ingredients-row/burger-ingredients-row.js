import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import styles from './burger-ingredients-row.module.css';
import Types from '../../prop-types';
import PropTypes from 'prop-types';
import { showIngredient } from "../../services/modals";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const BurgerIngredientsRow = ({firstItem, secondItem}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const itemClicked = useCallback((item) => {
        dispatch(showIngredient(firstItem));
        navigate("/ingredients/" + item._id);
    }, [firstItem, secondItem]);

    return (
        <div className={styles.row}>
            <div className={styles.column} onClick={() => itemClicked(firstItem)}>
                <BurgerIngredientsItem item={firstItem} />
            </div>
            {secondItem && 
                <div className={styles.column} onClick={() => itemClicked(secondItem)}>
                    <BurgerIngredientsItem item={secondItem} />
                </div>
            }
        </div>
    );
}

BurgerIngredientsRow.propTypes = {
    firstItem: Types.Item.isRequired,
    secondItem: Types.Item
}

export default BurgerIngredientsRow;