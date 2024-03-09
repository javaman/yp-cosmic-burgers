import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import styles from './burger-ingredients-row.module.css';
import Types from '../../prop-types';
import PropTypes from 'prop-types';
import { showIngredient } from "../../services/modals";
import { useDispatch } from "react-redux";

const BurgerIngredientsRow = ({firstItem, secondItem}) => {

    const dispatch = useDispatch();

    return (
        <div className={styles.row}>
            <div className={styles.column} onClick={() => dispatch(showIngredient(firstItem))}>
                <BurgerIngredientsItem item={firstItem} />
            </div>
            {secondItem && 
                <div className={styles.column} onClick={() => dispatch(showIngredient(firstItem))}>
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