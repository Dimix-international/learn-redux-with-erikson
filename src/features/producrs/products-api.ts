import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ItemType} from "./products-slice";


export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/'
    }),
    endpoints:(builder) => ({
        getAllProducts: builder.query<ItemType [], void>({
            query:() => ({
                url: 'products'
            })
        })
    })
});

export const {useGetAllProductsQuery} = productsApi;

