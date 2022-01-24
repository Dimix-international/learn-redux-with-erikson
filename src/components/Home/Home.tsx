import s from './Home.module.css'
import React from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "../common/Button/Button";
import {useCart} from "../../hooks/hooks-cart";
import {useFetchCards} from "../../hooks/react-query/useFetchCards";
import {AxiosError} from "axios";
import {ItemType} from "../../reducers/reducer-cart";


export const Home = React.memo(() => {

    const {data = [], isLoading, error} = useFetchCards();
    const navigate = useNavigate();

    const {dispatch} = useCart()

    const handleAddCart = (product: ItemType) => {
        dispatch({type: 'add-to-card', payload: product})
        navigate('/cart')
    }
    return (
        <div className={s.container}>
            {
                isLoading
                    ? <div>Loading...</div>
                    : error
                    ? <div>{(error as AxiosError).message || 'some error'}</div>
                    : <>
                        <h2>New Arrivals</h2>
                        <div className={s.products}>
                            {
                                data.map(product => (
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