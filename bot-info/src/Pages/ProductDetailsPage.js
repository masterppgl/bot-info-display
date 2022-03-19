import React, { useContext } from "react";
import Header from "../components/Header";
import ProductDetails from "../components/ProductDetails";
import ErrorLog from "../components/ErrorLog";
import ProductDetailsHeader from "../components/ProductDetailsHeader";
import ContextStore from "../Context/ContextStore";

const ProductDetailsPage = () => {
  const {contextStore, setContextStore} = useContext(ContextStore)
  return (
    <div>
      <ProductDetailsHeader/>
      <ProductDetails/>
      <ErrorLog data = {contextStore.processErrors}/>
    </div>
  );
};

export default ProductDetailsPage;
