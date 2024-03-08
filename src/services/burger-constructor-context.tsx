import React from 'react';
import TBurgerItem from '../types/burger-types';

export type TBurgerConstructorContext = {
    bun?: TBurgerItem,
    items: TBurgerItem[],
    orderNumber: number

}

const BurgerConstructorContext = React.createContext<TBurgerConstructorContext | null>(null);

export default BurgerConstructorContext;