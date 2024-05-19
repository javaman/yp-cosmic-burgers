import { configureStore } from '@reduxjs/toolkit'
import ingredientsSlice from './ingredients';
import burgerConstructorSlice from './burger-constructor';
import orderSlice from './order';
import modalsSlice from './modals';
import auth from './auth';
import feed from './feed';
import { refreshTokenMiddleware } from './auth';
import { wsSockedMiddleware } from './feed';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


export const setupStore = () => configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        burgerConstructor: burgerConstructorSlice,
        order: orderSlice,
        modals: modalsSlice,
        auth: auth,
        feed: feed
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(refreshTokenMiddleware.middleware).prepend(wsSockedMiddleware.middleware)
});

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
