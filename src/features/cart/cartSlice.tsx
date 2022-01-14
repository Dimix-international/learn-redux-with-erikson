import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {toast} from "react-toastify";
import {ItemType} from "../producrs/products-api";

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
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart(state, action: PayloadAction<ItemType>) {
            state.cartItems = state.cartItems.filter(item =>
                item.id !== action.payload.id
            );

            state.cartTotalQuantity = state.cartItems.reduce((acc, cart) => {
                return acc += cart.cartQuantity
            }, 0)

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

            toast.error(`${action.payload.name} removed from cart`, {
                position: "bottom-left"
            });
        },
        decreaseCart(state, action: PayloadAction<ItemType>) {
            const index = state.cartItems.findIndex(cart =>
                cart.id === action.payload.id
            );
            if (index > -1) {
                if (state.cartItems[index].cartQuantity > 1) {
                    state.cartItems[index].cartQuantity--;
                    toast.info(`Decreased ${action.payload.name} cart quantity`, {
                        position: "bottom-left"
                    });
                } else if (state.cartItems[index].cartQuantity === 1) {
                    state.cartItems = state.cartItems.filter(item =>
                        item.id !== action.payload.id
                    );
                    toast.error(`${action.payload.name} removed from cart`, {
                        position: "bottom-left"
                    });
                }
                state.cartTotalQuantity--;
                state.cartTotalAmount -= action.payload.price;
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
        },
        clearCart(state, action: PayloadAction<void>) {
            state.cartItems = [];
            toast.error(`Cart is cleared`, {
                position: "bottom-left"
            });
            state.cartTotalQuantity = 0;
            state.cartTotalAmount = 0;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        getTotals(state, action: PayloadAction<void>) {
            let {
                total,
                quantity
            } = state.cartItems.reduce((cartTotal, cartItem) => {
                const {price, cartQuantity} = cartItem;
                const itemTotal = price * cartQuantity;

                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;

                return cartTotal;
            }, {
                total: 0,
                quantity: 0,
            });

            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        }
    }
})

export const {
    addToCart,
    removeFromCart,
    decreaseCart,
    clearCart,
    getTotals,
} = cartSlice.actions;
export default cartSlice.reducer