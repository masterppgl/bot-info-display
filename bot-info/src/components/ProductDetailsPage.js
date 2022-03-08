import React from "react";
import Header from "./Header";
import ProductDetails from "./ProductDetails";
import ErrorLog from "./ErrorLog";

const ProductDetailsPage = () => {
  return (
    <div>
      <Header />
      <ProductDetails/>
      <ErrorLog/>
    </div>
  );
};

export default ProductDetailsPage;
