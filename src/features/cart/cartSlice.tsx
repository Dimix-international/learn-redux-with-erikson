import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ItemType} from "../producrs/products-slice";
import {toast} from "react-toastify";

export interface CartState {
    cartItems: Array<ItemType & { cartQuantity: number }>,
    cartTotalQuantity: number,
    cartTotalAmount: number
}

const initialState: CartState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems') as string) || [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<ItemType>) {

            const itemIndex = state.cartItems.findIndex(cart =>
                cart.id === action.payload.id
            )
            if (itemIndex > -1) {
                state.cartItems[itemIndex].cartQuantity++;
                toast.info(
                    `increased ${state.cartItems[itemIndex].name} quantity`,
                    {
                        position: "bottom-left"
                    });
            } else {
                state.cartItems.push({...action.payload, cartQuantity: 1});
                toast.success(`${action.payload.name} added to cart`, {
                    position: "bottom-left"
                });
            }
            state.cartTotalQuantity++;
            state.cartTotalAmount += action.payload.price;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        }
    }
})

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer