import "./App.css";
import { ReactDOM, useEffect, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useSearchParams,
} from "react-router-dom";
import Header from "./components/Header";
import Product from "./components/Product";
import BotTable from "./components/BotTable";
import ErrorLog from "./components/ErrorLog";
import BotInfo from "./Pages/BotInfo";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import ContextStore from "./Context/ContextStore";
import { io } from "socket.io-client";
import Spinkit from "./components/Spinkit/Spinkit";
import LoadingOverlay from "react-loading-overlay";
import { Modal } from "react-bootstrap";
import LoginModal from "./components/LoginModal";

function App() {
    const [showSpinner, setShowSpinner] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [password, setPassword] = useState("");

    const [contextStore, setContextStore] = useState({
        stores: [],
        store: {},
        storeNotifications: [],
        storeErrors: [],
        storeProcesses: [],
        storeProcess: [],
        processNotifications: [],
        processErrors: [],
        setShowSpinner,
    });
    return (
        <ContextStore.Provider value={{ contextStore, setContextStore }}>
            {!loggedIn && <LoginModal show={!loggedIn} setShow={(val) => setLoggedIn(!val)}/>}
            <LoadingOverlay active={showSpinner} spinner text={"Loading"}>
                <BrowserRouter>
                    <div className="App">
                        <Routes>
                            <Route exact path="/" element={<BotInfo />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </LoadingOverlay>
        </ContextStore.Provider>
    );
}

export default App;
