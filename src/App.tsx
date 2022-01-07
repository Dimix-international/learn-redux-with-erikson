import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import {NavBar} from "./components/NavBar/NavBar";
import {ToastContainer} from "react-toastify";
import {MyRoutes} from "./components/MyRoutes/MyRoutes";
import {useEffect} from "react";
import {getTotals} from "./features/cart/cartSlice";
import {useAppDispatch} from "./app/hooks";


function App() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTotals())
    },[])

    return (
        <div>
            <ToastContainer/>
            <NavBar/>
            <MyRoutes />
        </div>
    )
}

export default App
