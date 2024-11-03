import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { UserContext } from "./store/userContext";

function App() {
    const { user } = useContext(UserContext);

    return (
        <>
            {user && <Navbar />}
            <Outlet />
        </>
    );
}

export default App;
