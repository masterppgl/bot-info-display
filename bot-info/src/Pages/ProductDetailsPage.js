import React from "react";
import Header from "../components/Header";
import ProductDetails from "../components/ProductDetails";
import ErrorLog from "../components/ErrorLog";
import ProductDetailsHeader from "../components/ProductDetailsHeader";

const ProductDetailsPage = () => {
  return (
    <div>
      <ProductDetailsHeader/>
      <ProductDetails/>
      <ErrorLog/>
    </div>
  );
};

export default ProductDetailsPage;
