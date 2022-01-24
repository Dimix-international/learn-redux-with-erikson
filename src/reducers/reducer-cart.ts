import {CartActionOperationType, CartActionType} from "../context/cart-context";
import {toast} from "react-toastify";

export type ItemType = {
    id: number,
    name: string,
    description: string,
    price: number,
    image: string,
}

export interface CartState {
    cartItems: Array<ItemType & { cartQuantity: number }>,
    cartTotalQuantity: number,
    cartTotalAmount: number
}

export type CartReducerReturnType = {
    [key in `${CartActionOperationType}`]: () => CartState
}

export const counterReducer = (state: CartState, action: CartActionType): CartState => {
    let copyState = {...state};

    const addToCart = () => {
        if (action.payload) {
            const itemIndex = copyState.cartItems.findIndex(cart => cart.id === action.payload?.id);

            copyState.cartTotalQuantity++;
            copyState.cartTotalAmount += action.payload.price

            if (itemIndex > -1) {
                toast.info(
                    `increased ${state.cartItems[itemIndex].name} quantity`,
                    {
                        position: "bottom-left"
                    });
                copyState.cartItems[itemIndex].cartQuantity++;
            } else {
                toast.success(`${action.payload.name} added to cart`, {
                    position: "bottom-left"
                });
                copyState = {
                    ...copyState,
                    cartItems: [...state.cartItems, {
                        ...action.payload,
                        cartQuantity: 1
                    }]
                }
            }
            localStorage.setItem('cartItems', JSON.stringify(copyState.cartItems));
            return {...copyState}
        }
    };
    const getTotals = () => {
        let {
            total,
            quantity
        } = copyState.cartItems.reduce((cartTotal, cartItem) => {
            const {price, cartQuantity} = cartItem;
            const itemTotal = price * cartQuantity;

            cartTotal.total += itemTotal;
            cartTotal.quantity += cartQuantity;

            return cartTotal
        }, {
            total: 0,
            quantity: 0,
        });

        copyState.cartTotalAmount = total;
        copyState.cartTotalQuantity = quantity;

        return {...copyState}
    };
    const clearCart = () => {
        copyState.cartItems = [];
        copyState.cartTotalQuantity = 0;
        copyState.cartTotalAmount = 0;
        toast.error(`Cart is cleared`, {
            position: "bottom-left"
        });
        localStorage.setItem('cartItems', JSON.stringify(copyState.cartItems));
        return {...copyState}
    };
    const removeFromCart = () => {
        if (action.payload) {
            copyState.cartItems = copyState.cartItems.filter(item => item.id !== action.payload?.id);
            copyState.cartTotalQuantity = copyState.cartItems.reduce((acc, cart) => {
                return acc += cart.cartQuantity
            }, 0)
            localStorage.setItem('cartItems', JSON.stringify(copyState.cartItems));
            toast.error(`${action.payload.name} removed from cart`, {
                position: "bottom-left"
            });

            return {...copyState}
        }
    };
    const decreaseCart = () => {
        if (action.payload) {
            const index = copyState.cartItems.findIndex(item => item.id === action.payload?.id);

            if (index > -1) {
                if (copyState.cartItems[index].cartQuantity > 1) {
                    copyState.cartItems[index].cartQuantity--;
                    toast.info(`Decreased ${action.payload.name} cart quantity`, {
                        position: "bottom-left"
                    });
                } else {
                    copyState.cartItems = copyState.cartItems.filter(item =>
                        item.id !== action.payload?.id
                    );
                    toast.error(`${action.payload.name} removed from cart`, {
                        position: "bottom-left"
                    });
                }
                copyState.cartTotalQuantity--;
                copyState.cartTotalAmount -= action.payload.price;
                localStorage.setItem('cartItems', JSON.stringify(copyState.cartItems));

                return {...copyState}
            }
        }
    };

    const actions = {
        'add-to-card': addToCart,
        'remove-from-cart': removeFromCart,
        'decrease-cart': decreaseCart,
        'clear-cart': clearCart,
        'get-totals': getTotals,
        'default': () => state,
    } as CartReducerReturnType;

    return (actions[action.type] || actions['default'])()
}