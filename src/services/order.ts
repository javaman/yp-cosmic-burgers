import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SUBMIT_URL } from '../constants';
import { showOrder } from './modals';
import { checkResponse } from '../utils/networking';
import { TBurgerItemWithUuid } from './burger-constructor';
import { RootState } from './store';

interface IOrderState {
    orderNumber: number;
    loading: boolean;
    loadingFailed: boolean;
}

const initialState: IOrderState = {
    orderNumber: -1,
    loading: false,
    loadingFailed: false
}

export const submitOrder = createAsyncThunk(
    'order/postOrder',
    async (action : {bun: TBurgerItemWithUuid, items: TBurgerItemWithUuid[]}, tunkApi) => {
        const items = action.items.map(i => i._id);
        if (action.bun != null) {
            items.push(action.bun._id);
            items.push(action.bun._id);
        }
        const res = fetch(SUBMIT_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ingredients: items
            })
        }).then(checkResponse);
        tunkApi.dispatch(showOrder());
        return res;
    },
);

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(submitOrder.pending, (state) => {
            state.loading = true
        });

        builder.addCase(submitOrder.fulfilled, (state, action) => {
            state.orderNumber = action.payload.order.number
            state.loading = false;
            state.loadingFailed = false;
        });

        builder.addCase(submitOrder.rejected, (state) => {
            state.loading = false;
            state.loadingFailed = true;
        });
    }
});

export const selectOrder = (state: RootState) => state.order;

export default orderSlice.reducer;