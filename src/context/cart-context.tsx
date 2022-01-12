import {ItemType} from "../features/producrs/products-api";
import React from "react";
import {CartState} from "../features/cart/cartSlice";


export enum CartActionOperationType {
    AddToCard = 'add-to-card',
    RemoveFromCart = 'remove-from-cart',
    DecreaseCart = 'decrease-cart',
    ClearCart = 'clear-cart',
    GetTotals = 'get-totals',
    Default = 'default'
}

export type CartActionType = {
    type: `${CartActionOperationType}`
    payload?: ItemType
}

export type CartDispatchType = (action: CartActionType) => void;
export type CartContextType = { state: CartState; dispatch: CartDispatchType };

export const CartContext = React.createContext<CartContextType | undefined>(undefined)