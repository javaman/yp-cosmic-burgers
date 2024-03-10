import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderVisible: false,
    itemVisible: false,
    ingredient: {}
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
        showIngredient(state, { payload }) {
            state.itemVisible = true;
            state.ingredient = {...payload}
        }
    }});

export const { showOrder, closeModal, showIngredient } = modalsSlice.actions;
export default modalsSlice.reducer;