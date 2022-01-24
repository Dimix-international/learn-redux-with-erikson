import {useCallback, useEffect} from "react";
import {useCart} from "./hooks-cart";
import {ItemType} from "../reducers/reducer-cart";


export const useGetCard = () => {

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

    return {
        cart,
        removeCartHandler,
        decreaseQuantityCartHandler,
        increaseQuantityCartHandler,
        clearCartHandler,
    }
}