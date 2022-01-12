import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {Provider} from "react-redux";
import {store} from './app/store'
import {BrowserRouter} from "react-router-dom";
import {CartProvider} from "./providers/CartProvider";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <CartProvider>
                <Provider store={store}>
                    <App/>
                </Provider>
            </CartProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
