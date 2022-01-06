import React from "react";
import {useAppSelector} from "../../app/hooks";


export const TotalAmount = React.memo(() => {

    const totalQuantity = useAppSelector(state => state.cart.cartTotalQuantity);
    return (
        <span>{totalQuantity}</span>
    )
})