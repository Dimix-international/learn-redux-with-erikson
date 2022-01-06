import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";

export type ItemType = {
    id: number,
    name: string,
    description: string,
    price: number,
    image: string,
}
type StatusType = 'init' | 'loading' | 'successes' | 'failed'

interface ProductsState {
    items: ItemType [],
    status: StatusType,
    error:string | undefined,
}

const initialState: ProductsState = {
    items: [],
    status: 'init',
    error: undefined,
}

export const productsFetch = createAsyncThunk<ItemType [], void, {
    rejectValue: string
}>(
    'products/productsFetch',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get('http://localhost:5000/products');
            return response.data
        } catch (e) {
            return rejectWithValue('an error is occurred!')
            // const error = e as AxiosError;
            // return rejectWithValue({
            //     error: error.message
            // })
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(productsFetch.pending, (state, action) => {
            state.status = 'loading'
        });
        builder.addCase(productsFetch.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'successes'
        });
        builder.addCase(productsFetch.rejected, (state, action) => {
            state.error = action.payload
            state.status = 'failed'
        });
    }
})

export default productsSlice.reducer;