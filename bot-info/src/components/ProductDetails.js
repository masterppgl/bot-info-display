import React from "react";
import './ProductDetails.css'

const ProductDetails = () => {
  return (
    <div>
      <div className="product__details">
        <h1>Product Name</h1>
        <img
          src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"
          alt=""
          className="product__image"
        />
        <span className="details">
          <h5>SKU:</h5>
          <p>41235122353255</p>
          <h5>Time Interval</h5>
          <p>10 miutes</p>
          <h5>Price Interval</h5>
          <p>100$</p>
          <h5>Name:</h5>
          <p>Demo</p>
          <h5>Available</h5>
          <p>Yes</p>
          <h5>Visibility</h5>
          <p>Visible</p>
          <h5>Variation</h5>
          <p>23</p>
          <h5>Active</h5>
          <p>Yes</p>
          <h5>Url</h5>
          <p><a href="google.com">link</a></p>
        </span>

      </div>
    </div>
  );
};

export default ProductDetails;
