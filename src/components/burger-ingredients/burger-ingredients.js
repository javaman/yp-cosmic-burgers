import React, { useEffect, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import Types from '../../prop-types';
import PropTypes from 'prop-types';
import BurgerIngredientsRow from '../burger-ingredients-row/burger-ingredients-row';
import { useSelector } from 'react-redux';

const BurgerIngredients = () => {

    const { ingredients } = useSelector(store => store.ingredients);

    const anchors = {
        bun: React.createRef(),
        sauce: React.createRef(),
        main: React.createRef()
    }

    const bunGroup = ingredients.filter((item) => item.type === "bun");
    const sauceGroup = ingredients.filter((item) => item.type === "sauce");
    const mainGroup = ingredients.filter((item) => item.type === "main");

    const initialTabState = bunGroup.length > 0
        ? 'bun'
        : sauceGroup.length > 0
            ? 'sauce'
            : mainGroup.length > 0
                ? 'main'
                : 'does not matter';

    const [current, setCurrent] = React.useState(initialTabState);

    useEffect(() => {
        setCurrent(initialTabState);
    }, [initialTabState]);

    function tabClicked(value) {
        setCurrent(value);
        anchors[value].current.scrollIntoView({ behavior: 'smooth' });
    }

    const scroll = React.createRef();

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
            <div className={styles.scrollWrap} ref={scroll} onScroll={e =>{
                const offset1 = anchors.bun.current.offsetTop - scroll.current.scrollTop;
                const offset2 = anchors.sauce.current.offsetTop - scroll.current.scrollTop;
                const offset3 = anchors.main.current.offsetTop - scroll.current.scrollTop;
                setCurrent(offset3 < 10 ? 'main' : offset2 < 10 ? 'sauce' : 'bun');
            }}>
                <ul className={styles.list}>
                    {bunGroup.length > 0 && renderGroup(bunGroup, anchors.bun)}
                    {sauceGroup.length > 0 && renderGroup(sauceGroup, anchors.sauce)}
                    {mainGroup.length > 0 && renderGroup(mainGroup, anchors.main)}
                </ul>
            </div>
        </div>);
}

const renderGroup = (group, anchor) => {
    return group.reduce((result, value, index, array) => {
        if (index % 2 === 0) {
            result.push(array.slice(index, index + 2));
        }
        return result;
    }, []).map((pair, index) => {
        const attributes = { className: styles.row, key: pair[0]._id };
        const rowAttributes = {
            firstItem: pair[0]
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
    items: PropTypes.arrayOf(Types.Item)
}


export default BurgerIngredients;