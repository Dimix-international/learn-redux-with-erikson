import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import {NavBar} from "./components/NavBar/NavBar";
import {ToastContainer} from "react-toastify";
import {MyRoutes} from "./components/MyRoutes/MyRoutes";


function App() {
    return (
        <div>
            <ToastContainer/>
            <NavBar/>
            <MyRoutes />
        </div>
    )
}

export default App
