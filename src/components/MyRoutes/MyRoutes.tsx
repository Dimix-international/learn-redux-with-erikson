import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "../Layout";
import {Home} from "../Home/Home";
import {Cart} from "../Cart/Cart";
import {NotFound} from "../NotFound/NotFound";

export enum pathRoutes {
    HOME = 'home',
    CART = 'cart',
    NOTFOUND = 'not-found'
}

export const MyRoutes = React.memo(() => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route path={'/'}
                           element={<Navigate to={pathRoutes.HOME}/>}/>
                    <Route path={pathRoutes.HOME} element={<Home/>}/>
                    <Route path={pathRoutes.CART} element={<Cart/>}/>
                    <Route path={pathRoutes.NOTFOUND} element={<NotFound/>}/>
                    <Route path={'*'}
                           element={<Navigate to={pathRoutes.NOTFOUND}/>}/>
                </Route>
            </Routes>
        </>
    )
})