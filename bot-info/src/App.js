import './App.css';
import { ReactDOM, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import Header from './components/Header';
import Product from './components/Product';
import BotTable from './components/BotTable';
import ErrorLog from './components/ErrorLog';
import BotInfo from './Pages/BotInfo';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import ContextStore from './Context/ContextStore';
import {io} from "socket.io-client"
function App() {
  useEffect(() => {
    const socket = io("http://localhost:8080", {
      autoConnect: false
    })
    socket.on("connect",() => {
      setContextStore({...contextStore, socket})
    })
    socket.on("disconnect", ()=> {
      setContextStore({...contextStore, socket: null})
    })
    socket.connect()
    
  }, [])
  const [contextStore, setContextStore] = useState({
    stores: [],
    store: {},
    storeNotifications: [],
    storeErrors: [],
    storeProcesses: [],
    socket: {connected:false}
  })
  return (
    <BrowserRouter>
      
        <ContextStore.Provider value={{contextStore, setContextStore}}>
        <div className="App">
        <Routes>
          <Route exact path="/" element={<BotInfo />}/>
          <Route exact path='product-details' element={<ProductDetailsPage/>}/>
        </Routes>
        </div>
        </ContextStore.Provider>
      
    </BrowserRouter>
  );
}

export default App;
