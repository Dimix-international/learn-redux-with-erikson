import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {BrowserRouter} from "react-router-dom";
import {CartProvider} from "./providers/CartProvider";
import {QueryClientProvider} from "react-query";
import {queryClient} from "./hooks/react-query/queryClient";
import {ReactQueryDevtools} from "react-query/devtools";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <App/>
                </CartProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
