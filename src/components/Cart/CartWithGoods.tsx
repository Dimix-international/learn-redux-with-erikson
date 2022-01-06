import React from "react";
import s from "./CartWithGoods.module.css";
import {CartState} from "../../features/cart/cartSlice";
import {Button} from "../common/Button/Button";
import {ArrowLeft} from "../common/ArrowLeft/ArrowLeft";

type CartWithGoodsType = {
    cart: CartState
}
export const CartWithGoods:React.FC<CartWithGoodsType> = React.memo( (props) => {

    const {cart} = props;

    return (
        <div>
            <div className={s.titles}>
                <h3 className={s.productTitle}>Product</h3>
                <h3 className={s.price}>Price</h3>
                <h3 className={s.quantity}>Quantity</h3>
                <h3 className={s.total}>Total</h3>
            </div>
            <div className={s.cartItems}>
                {
                    cart.cartItems.map(item => (
                        <div key={item.id} className={s.cartItem}>
                            <div className={s.cartProduct}>
                                <img src={item.image} alt={item.name}/>
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <button>Remove</button>
                                </div>
                            </div>
                            <div className={s.productPrice}>${item.price}</div>
                            <div className={s.productQuantity}>
                                <button>-</button>
                                <div className={s.count}>{item.cartQuantity}</div>
                                <button>+</button>
                            </div>
                            <div className={s.totalPrice}>
                                ${item.price * item.cartQuantity}
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className={s.cartSummary}>
                <button className={s.clearCart}>Clear Cart</button>
                <div className={s.cartCheckout}>
                    <div className={s.subtotal}>
                        <span>Subtotal</span>
                        <span className={s.amount}>
                        ${cart.cartTotalAmount}
                    </span>
                    </div>
                    <p>Taxes and shipping calculated at checkout</p>
                    <Button
                        text={'Check out'}
                        callback={() => {}}
                        addClass={s.btn}
                    />
                    <ArrowLeft to={'/'} text={'Continue shopping'} />
                </div>
            </div>
        </div>
    )
})