import {useGetAllProductsQuery} from "../../features/producrs/products-api";
import s from './Home.module.css'
import React from "react";
import {ItemType} from "../../features/producrs/products-slice";
import {useAppDispatch} from "../../app/hooks";
import {addToCart} from "../../features/cart/cartSlice";
import {useNavigate} from "react-router-dom";
import {Button} from "../common/Button/Button";


export const Home = React.memo(() => {

    const {data, error, isLoading} = useGetAllProductsQuery();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleAddCart = (product: ItemType) => {
        dispatch(addToCart(product));
        navigate('/cart')
    }

    return (
        <div className={s.container}>
            {
                isLoading
                    ? <div>Loading...</div>
                    : error
                    ? <div>{(error as any).data || 'some error'}</div>
                    : <>
                        <h2>New Arrivals</h2>
                        <div className={s.products}>
                            {
                                data?.map(product => (
                                    <div
                                        key={product.id}
                                        className={s.product}
                                    >
                                        <h3>{product.name}</h3>
                                        <img src={product.image}
                                             alt={product.name}/>
                                        <div className={s.details}>
                                            <span>{product.description}</span>
                                            <span
                                                className={s.price}>${product.price}</span>
                                        </div>
                                        <Button
                                            text={'Add to Cart'}
                                            callback={() => handleAddCart(product)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </>
            }
        </div>
    )
})