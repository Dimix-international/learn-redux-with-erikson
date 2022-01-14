import React from "react"
import s from './Cart.module.css'
import {EmptyCart} from "./EmptyCart";
import {CartWithGoods} from "./CartWithGoods";
import {useGetCard} from "../../hooks/useGetCard";


export const Cart = React.memo(() => {
    const {cart,
        clearCartHandler,
        decreaseQuantityCartHandler,
        removeCartHandler,
        increaseQuantityCartHandler
    } = useGetCard();

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