import React from 'react';
import ReactDOM from 'react-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import styles from './burger-ingredients.module.css';
import Types from '../../prop-types';
import PropTypes from 'prop-types';


const BurgerIngredients = ({ items, onItemClicked }) => {
    const [current, setCurrent] = React.useState('one')
    var filterBy;
    if (current == 'one') {
        filterBy = 'bun';

    } else if (current == 'two') {
        filterBy = 'sauce'
    } else {
        filterBy = 'main'
    }

    return (
        <div>
            <div className={styles.tabWrap}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.scrollWrap}>
                {
                    items.length > 0 ? mapItems(items, filterBy, onItemClicked) : <></>
                }
            </div>
        </div>);
}

const mapItems = (items, filterBy, onItemClicked) => {
    return items.filter(item => item.type == filterBy).reduce((result, value, index, array) => {
        if (index % 2 == 0) {
            result.push(array.slice(index, index + 2));
        }
        return result;
    }, []).map(pair => {
        return (
            <div className={styles.row} key={pair[0]._id}>
                {
                    pair.length == 2 ? <> {[mapOne(pair[0], onItemClicked), mapOne(pair[1], onItemClicked)]} </> : <> {mapOne(pair[0], onItemClicked)}</>
                }
            </div>)
    }
    )
}

const mapOne = (item, onItemClicked) => {
    return (
        <div className={styles.column} onClick={() => onItemClicked(item)} key={item._id} >
            <BurgerIngredientsItem url={item.image} price={item.price} name={item.name} />
        </div>
    )
}

BurgerIngredients.propTypes = {
    items: PropTypes.arrayOf(Types.Item),
    onItemClicked: PropTypes.func.isRequired
}


export default BurgerIngredients;