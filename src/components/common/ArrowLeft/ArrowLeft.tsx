import React from "react";
import s from './ArrowLeft.module.css'
import {Link} from "react-router-dom";

type ButtonType = {
    to:string
    text:string
    addClass?:string
}
export const ArrowLeft:React.FC<ButtonType> = React.memo((props) => {

   const {to, text, addClass} = props;

   const finalClass = addClass ? `${s.continueShopping} ${addClass}` : s.continueShopping;

    return (
        <div className={finalClass}>
            <Link to={to}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className={s.arrowLeft}
                    viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                <span>{text}</span>
            </Link>
        </div>
    )
})