import { configureStore } from '@reduxjs/toolkit'
import ingredientsSlice from './ingredients';
import burgerConstructorSlice from './burger-constructor';
import orderSlice from './order';
import modalsSlice from './modals';

export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        burgerConstructor: burgerConstructorSlice,
        order: orderSlice,
        modals: modalsSlice
    },
    devTools: process.env.NODE_ENV !== 'production'
});