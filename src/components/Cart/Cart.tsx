import React from "react"
import s from './Cart.module.css'
import {useAppSelector} from "../../app/hooks";
import {EmptyCart} from "./EmptyCart";
import {CartWithGoods} from "./CartWithGoods";

export const Cart = React.memo(() => {

        const cart = useAppSelector(state => state.cart);

        return (
            <div className={s.container}>
                <h2>Shopping Cart</h2>
                {
                    cart.cartItems.length === 0
                        ? <EmptyCart/>
                        : <CartWithGoods cart={cart}/>
                }
            </div>
        )
    }
)