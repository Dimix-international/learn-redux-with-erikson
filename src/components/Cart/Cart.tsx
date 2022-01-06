import React, {useCallback} from "react"
import s from './Cart.module.css'
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {EmptyCart} from "./EmptyCart";
import {CartWithGoods} from "./CartWithGoods";
import {
    addToCart, clearCart,
    decreaseCart,
    removeFromCart
} from "../../features/cart/cartSlice";
import {ItemType} from "../../features/producrs/products-api";


export const Cart = React.memo(() => {

        const cart = useAppSelector(state => state.cart);
        const dispatch = useAppDispatch();

        const removeCartHandler = useCallback((product: ItemType) => {
            dispatch(removeFromCart(product))
        }, []);

        const decreaseQuantityCartHandler = useCallback((product: ItemType) => {
            dispatch(decreaseCart(product))
        }, []);

        const increaseQuantityCartHandler = useCallback((product: ItemType) => {
            dispatch(addToCart(product))
        }, []);

        const clearCartHandler = useCallback(() => {
            dispatch(clearCart())
        }, []);

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