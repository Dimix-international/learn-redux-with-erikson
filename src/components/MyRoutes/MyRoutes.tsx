import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "../Layout";
import {Home} from "../Home/Home";
import {Cart} from "../Cart/Cart";
import {NotFound} from "../NotFound/NotFound";

export enum PathRoutesType {
    Home = 'home',
    Cart = 'cart',
    NotFound = 'not-found'
}

export const MyRoutes = React.memo(() => {

    return (
        <>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route path={'/'}
                           element={<Navigate to={PathRoutesType.Home}/>}/>
                    <Route path={PathRoutesType.Home} element={<Home/>}/>
                    <Route path={PathRoutesType.Cart} element={<Cart/>}/>
                    <Route path={PathRoutesType.NotFound} element={<NotFound/>}/>
                    <Route path={'*'}
                           element={<Navigate to={PathRoutesType.NotFound}/>}/>
                </Route>
            </Routes>
        </>
    )
})