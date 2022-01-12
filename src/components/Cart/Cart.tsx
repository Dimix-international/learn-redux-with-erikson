import React, {useCallback, useEffect} from "react"
import s from './Cart.module.css'
import {EmptyCart} from "./EmptyCart";
import {CartWithGoods} from "./CartWithGoods";
import {ItemType} from "../../features/producrs/products-api";
import {useCart} from "../../hooks/hooks-cart";


export const Cart = React.memo(() => {
        const {state: cart, dispatch: dispatchContext} = useCart();

        const removeCartHandler = useCallback((product: ItemType) => {
            dispatchContext({type:'remove-from-cart', payload: product});
        }, []);

        const decreaseQuantityCartHandler = useCallback((product: ItemType) => {
            dispatchContext({type: 'decrease-cart', payload:product})
        }, []);

        const increaseQuantityCartHandler = useCallback((product: ItemType) => {
            dispatchContext({type:'add-to-card', payload:product})
        }, []);

        const clearCartHandler = useCallback(() => {
            dispatchContext({type: 'clear-cart'})
        }, []);

        useEffect(() => {
            dispatchContext({type: 'get-totals'});
        }, [cart.cartTotalQuantity])


        return (
            <div className={s.container}>
                <h2>Shopping Cart</h2>
                {
                    cart.cartItems.length === 0
                        ? <EmptyCart/>
                        : <CartWithGoods
                            cart={cart}
                            removeCart={removeCartHandler}
                            decreaseCart={decreaseQuantityCartHandler}
                            increaseCart={increaseQuantityCartHandler}
                            clearCart={clearCartHandler}
                        />
                }
            </div>
        )
    }
)