import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../constants';

const initialState = {
    ingredients: [],
    loading: false,
    loadingFailed: false
}


export const fetchIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async (thunkApi) => {
        const res = await fetch(API_URL).then(response => {
            return response.json().then(json => {
                return response.ok ? json : Promise.reject(json);
        })});
        return res;
    },
);


const ingredientsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
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