import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import styles from './burger-ingredients-row.module.css';
import Types from '../../prop-types';
import PropTypes from 'prop-types';

const BurgerIngredientsRow = ({firstItem, secondItem, onItemClicked}) => {
    return (
        <div className={styles.row}>
            <div className={styles.column} onClick={() => onItemClicked(firstItem)}>
                <BurgerIngredientsItem url={firstItem.image} price={firstItem.price} name={firstItem.name} />
            </div>
            {secondItem && 
                <div className={styles.column} onClick={() => onItemClicked(secondItem)}>
                    <BurgerIngredientsItem url={secondItem.image} price={secondItem.price} name={secondItem.name} />
                </div>
            }
        </div>
    );
}

BurgerIngredientsRow.propTypes = {
    firstItem: Types.Item.isRequired,
    secondItem: Types.Item,
    onItemClicked: PropTypes.func.isRequired
}

export default BurgerIngredientsRow;