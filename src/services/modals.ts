import { createSlice } from '@reduxjs/toolkit';
import TBurgerItem from '../types/burger-types';
import { RootState } from './store';
import { TOrder } from './types';

interface IModalState {
    orderVisible: boolean;
    itemVisible: boolean;
    orderInfoVisible: boolean;
    ingredient?: TBurgerItem
    order?: TOrder
};

const initialState : IModalState = {
    orderVisible: false,
    itemVisible: false,
    orderInfoVisible: false
};


const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        showOrder(state) {
            state.orderVisible = true;
        },
        closeModal(state) {
            state.orderVisible = false;
            state.itemVisible = false;
            state.orderInfoVisible = false;
        },
        showIngredient(state, {payload} : {payload: TBurgerItem}) {
            state.ingredient = payload;
            state.itemVisible = true;
        },
        showOrderInfo(state, {payload} : {payload: TOrder}) {
            state.order = {...payload};
            state.orderInfoVisible = true;
        }
    }});

export const { showOrder, closeModal, showIngredient, showOrderInfo } = modalsSlice.actions;
export default modalsSlice.reducer;