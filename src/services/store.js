import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import ingredientsSlice from './ingredients';
import burgerConstructorSlice, { drop } from './burger-constructor';
import orderSlice from './order';
import modalsSlice from './modals';
import { increment, decrement } from './ingredients';



export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        burgerConstructor: burgerConstructorSlice,
        order: orderSlice,
        modals: modalsSlice
    },
    devTools: process.env.NODE_ENV !== 'production',
});

