import React from 'react';
import ReactDOM from 'react-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import styles from './burger-ingredients.module.css';


const BurgerIngredients = ({ items }) => {
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
            <div style={{ display: 'flex' }}>
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
            <div style={{minHeight: 600, maxHeight: 600, overflowY: "scroll"}}> 
                {
                    items.length > 0 ? mapItems(items, filterBy) : <></>
                }
            </div>
        </div>);
}

const mapItems = (items, filterBy) => {
    return items.filter(item => item.type == filterBy).reduce((result, value, index, array) => {
        if (index % 2 == 0) {
            result.push(array.slice(index, index + 2));
        }
        return result;
    }, []).map(pair => {
        return (
            <div className={styles.row}>
                {
                    pair.length == 2 ? <> {[mapOne(pair[0]), mapOne(pair[1])]} </> : <> {mapOne(pair[0])}</>
                }
            </div>)
    }
    )
}

const mapOne = (item) => {
    return (
        <div className={styles.column}>
            <BurgerIngredientsItem url={item.image} price={item.price} name={item.name} />
        </div>
    )
}


export default BurgerIngredients;