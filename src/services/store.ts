import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import ingredientsSlice from './ingredients';
import burgerConstructorSlice, { drop } from './burger-constructor';
import orderSlice from './order';
import modalsSlice from './modals';
import auth from './auth';
import { refreshTokenMiddleware } from './auth';



export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        burgerConstructor: burgerConstructorSlice,
        order: orderSlice,
        modals: modalsSlice,
        auth: auth
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(refreshTokenMiddleware.middleware)
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
