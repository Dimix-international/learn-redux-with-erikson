import {configureStore} from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counter-slice'
import {apiSlice} from "../features/dogs/dogs-api";
import productsSlice, {productsFetch} from "../features/producrs/products-slice";
import {productsApi} from "../features/producrs/products-api";
import cartSlice from "../features/cart/cartSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        products: productsSlice,
        [productsApi.reducerPath]: productsApi.reducer,
        cart: cartSlice,
    },
    middleware: (getDefaultMiddleware ) => {
        return getDefaultMiddleware().concat(
            apiSlice.middleware,
            productsApi.middleware
        );
    }
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;