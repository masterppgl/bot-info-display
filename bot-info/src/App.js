import './App.css';
import { ReactDOM } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Product from './components/Product';
import BotTable from './components/BotTable';
import ErrorLog from './components/ErrorLog';
import BotInfo from './components/BotInfo';
import ProductDetailsPage from './components/ProductDetailsPage';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<BotInfo />}/>
          <Route exact path='product-details' element={<ProductDetailsPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
