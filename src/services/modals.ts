import { createSlice } from '@reduxjs/toolkit';
import TBurgerItem from '../types/burger-types';
import { RootState } from './store';

interface IModalState {
    orderVisible: boolean;
    itemVisible: boolean;
    ingredient?: TBurgerItem
};

const initialState : IModalState = {
    orderVisible: false,
    itemVisible: false
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
        },
        showIngredient(state, {payload} : {payload: TBurgerItem}) {
            state.ingredient = payload;
            state.itemVisible = true;
        }
    }});

export const { showOrder, closeModal, showIngredient } = modalsSlice.actions;


export const selectModals = (state: RootState) => state.modals

export default modalsSlice.reducer;