import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import {NavBar} from "./components/NavBar/NavBar";
import {ToastContainer} from "react-toastify";
import {MyRoutes} from "./components/MyRoutes/MyRoutes";
import {useEffect} from "react";
import {useCart} from "./hooks/hooks-cart";


function App() {

    const {dispatch} = useCart();

    useEffect(() => {
        dispatch({type:'get-totals'})
    }, [])

    return (
        <div>
            <ToastContainer/>
            <NavBar/>
            <MyRoutes/>
        </div>
    )
}

export default App
