import React from "react";
import s from "./EmptyCart.module.css";
import {ArrowLeft} from "../common/ArrowLeft/ArrowLeft";


export const EmptyCart = React.memo( () => {
    return (
        <div className={s.cartEmpty}>
            <p>Your cart is currently empty!</p>
            <ArrowLeft to={'/'} text={'Start shopping'} />
        </div>
    )
})