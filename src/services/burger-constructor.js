import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bun: null,
    items: []
};


const burgerConstructorSlice = createSlice({
    name: 'order-constructor',
    initialState,
    reducers: {
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
    }
});

export const { drop, deleteItem, deleteBun, replace } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;