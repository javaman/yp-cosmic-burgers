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
/*
        drop(state, {payload}) {
            if (payload.type === 'bun') {
                state.bun = {...payload};
            } else {
                state.items.push({...payload});
            }
        },
        deleteBun(state) {
            state.bun = null;
        },
        deleteItem(state, {payload}) {
            state.items = state.items.filter((e, i) => i != payload);
        },
        replace(state, {payload}) {
            const {index2, index} = payload;
            const item = state.items[index2];
            state.items = state.items.filter((itm, idx) => idx != index2);
            state.items.splice(index, 0, item); 
        }
    } */

export const { showOrder, closeModal, showIngredient } = modalsSlice.actions;
export default modalsSlice.reducer;