import React, { useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import styles from './burger-ingredients.module.css';
import Types from '../../prop-types';
import PropTypes from 'prop-types';
import BurgerIngredientsRow from '../burger-ingredients-row/burger-ingredients-row';


const BurgerIngredients = ({ items, onItemClicked }) => {

    const anchors = {
        bun: React.createRef(),
        sauce: React.createRef(),
        main: React.createRef()
    }

    const bunGroup = items.filter((item) => item.type === "bun");
    const sauceGroup = items.filter((item) => item.type === "sauce");
    const mainGroup = items.filter((item) => item.type === "main");

    const initialTabState = bunGroup.length > 0
        ? 'bun'
        : sauceGroup.length > 0
            ? 'sauce'
            : mainGroup.length > 0
                ? 'main'
                : 'does not matter'

    const [current, setCurrent] = React.useState(initialTabState);

    useEffect(() => {
        setCurrent(initialTabState);
    }, [initialTabState]);

    function tabClicked(value) {
        setCurrent(value);
        anchors[value].current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div>
            <div className={styles.tabWrap}>
                {bunGroup.length > 0 && <Tab value="bun" active={current === 'bun'} onClick={tabClicked}>
                    Булки
                </Tab>}
                {sauceGroup.length > 0 && <Tab value="sauce" active={current === 'sauce'} onClick={tabClicked}>
                    Соусы
                </Tab>}
                {mainGroup.length > 0 && <Tab value="main" active={current === 'main'} onClick={tabClicked}>
                    Начинки
                </Tab>}
            </div>
            <div className={styles.scrollWrap}>
                <ul className={styles.list}>
                    {bunGroup.length > 0 && renderGroup(bunGroup, onItemClicked, anchors.bun)}
                    {sauceGroup.length > 0 && renderGroup(sauceGroup, onItemClicked, anchors.sauce)}
                    {mainGroup.length > 0 && renderGroup(mainGroup, onItemClicked, anchors.main)}
                </ul>
            </div>
        </div>);
}

const renderGroup = (group, onItemClicked, anchor) => {
    return group.reduce((result, value, index, array) => {
        if (index % 2 === 0) {
            result.push(array.slice(index, index + 2));
        }
        return result;
    }, []).map((pair, index) => {
        const attributes = { className: styles.row, key: pair[0]._id };
        const rowAttributes = {
            firstItem: pair[0],
            onItemClicked: onItemClicked
        }
        if (pair.length > 1) {
            rowAttributes.secondItem = pair[1];
        }
        if (index == 0) {
            attributes.ref = anchor;
        }
        return <li {...attributes}><BurgerIngredientsRow {...rowAttributes}/></li>;
    });
}

BurgerIngredients.propTypes = {
    items: PropTypes.arrayOf(Types.Item),
    onItemClicked: PropTypes.func.isRequired
}


export default BurgerIngredients;