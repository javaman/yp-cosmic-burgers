import React, { RefObject, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import BurgerIngredientsRow, { TBurgerIngredientsRowParam } from '../burger-ingredients-row/burger-ingredients-row';
import { useSelector } from 'react-redux';
import { selectIngredients } from '../../services/ingredients';
import TBurgerItem from '../../types/burger-types';

type TAnchors = {
    bun: RefObject<HTMLLIElement>;
    sauce: RefObject<HTMLLIElement>;
    main: RefObject<HTMLLIElement>;
}

type TAnchor = keyof TAnchors;

const BurgerIngredients = () => {

    const { ingredients } = useSelector(selectIngredients);

    const anchors: TAnchors = {
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

    function tabClicked(value: string) {
        const casted = value as TAnchor;
        setCurrent(value);
        anchors[casted]?.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const scroll = React.createRef<HTMLDivElement>();

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
                const offset2 = (anchors.sauce.current?.offsetTop ?? 0) - (scroll.current?.scrollTop ?? 0);
                const offset3 = (anchors.main.current?.offsetTop ?? 0) - (scroll.current?.scrollTop ?? 0);
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

const renderGroup = (group: TBurgerItem[], anchor: RefObject<HTMLLIElement>) => {
    return group.reduce((result, _, index, array) => {
        if (index % 2 === 0) {
            result.push(array.slice(index, index + 2));
        }
        return result;
    }, [] as TBurgerItem[][]).map((pair, index) => {
        type TLiAttributes = React.LiHTMLAttributes<HTMLLIElement> & {
            key: string;
            ref?: RefObject<HTMLLIElement>
        };
        const attributes: TLiAttributes = { 
            className: styles.row, 
            key: pair[0]._id };

        const rowAttributes: TBurgerIngredientsRowParam = {
            firstItem: pair[0]
        }
        if (pair.length > 1) {
            rowAttributes.secondItem = pair[1];
        }
        if (index === 0) {
            attributes.ref = anchor;
        }
        return <li {...attributes}><BurgerIngredientsRow {...rowAttributes}/></li>;
    });
}

export default BurgerIngredients;