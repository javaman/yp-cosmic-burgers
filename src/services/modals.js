import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderVisible: false,
    itemVisible: "",
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
            state.itemVisible = "";
        },
        showIngredient(state, { payload }) {
            state.itemVisible = "open";
            state.ingredient = {...payload}
        },
        hideIngredient(state, action) {
            state.itemVisible = "hidden";
        },
        closeIngredient(state, action) {
            state.itemVisible = "";
        }
    }});

export const { showOrder, closeModal, showIngredient, hideIngredient, closeIngredient } = modalsSlice.actions;
export default modalsSlice.reducer;