import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../constants';
import { checkResponse } from '../utils/networking';
import { RootState } from './store';
import TBurgerItem from '../types/burger-types';

interface IIngredientsState {
    ingredients: TBurgerItem[];
    loading: boolean;
    loadingFailed: boolean;   
};

const initialState: IIngredientsState = {
    ingredients: [],
    loading: false,
    loadingFailed: false
}


export const fetchIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async () => {
        return await fetch(API_URL).then(checkResponse);
    },
);

const ingredientsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchIngredients.pending, (state) => {
            state.loading = true
        });
        builder.addCase(fetchIngredients.fulfilled, (state, action) => {;
            state.ingredients = action.payload.data;
            state.loading = false;
            state.loadingFailed = false;
        });

        builder.addCase(fetchIngredients.rejected, (state) => {
            state.loading = false;
            state.loadingFailed = true;
        });

    }
});

export default ingredientsSlice.reducer;