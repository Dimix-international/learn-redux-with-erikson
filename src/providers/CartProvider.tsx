import {ReactNode, useMemo, useReducer} from "react";
import {counterReducer} from "../reducers/reducer-cart";
import {CartContext} from "../context/cart-context";


export const CartProvider = ({children}: { children: ReactNode }) => {
    const [cartState, cartDispatch] = useReducer(counterReducer, {
        cartItems: JSON.parse(localStorage.getItem('cartItems') as string) || [],
        cartTotalQuantity: 0,
        cartTotalAmount: 0
    });

    const cartContextValue = useMemo(() => ({
        state: cartState,
        dispatch: cartDispatch,
    }), [cartState])

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    )
}