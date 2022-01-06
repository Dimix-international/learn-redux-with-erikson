import React from "react";
import s from './Button.module.css'

type ButtonType = {
    text:string
    callback:() => void
    addClass?:string
}
export const Button:React.FC<ButtonType> = React.memo((props) => {

   const {text, callback, addClass} = props;

   const onClickHandler = () => {
       callback();
   }

   const finalClass = addClass ? `${s.btn} ${addClass}` : s.btn;

    return (
        <button
            className={finalClass}
            onClick={onClickHandler}
        >{text}</button>
    )
})