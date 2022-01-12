import React from "react";
import {useCart} from "../../hooks/hooks-cart";


export const TotalAmount = React.memo(() => {
    const {state} = useCart();

    return (
        <span>{state.cartTotalQuantity}</span>
    )
})