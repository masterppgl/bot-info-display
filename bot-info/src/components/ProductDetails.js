import React from "react";
import "./ProductDetails.css";
import { InputGroup,Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";

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
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="SKU">SKU</InputGroup.Text>
            <FormControl placeholder="143515151361" />
          </InputGroup>
          <br />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="time_interval">Time Interval</InputGroup.Text>
            <FormControl placeholder="20 minutes" />
          </InputGroup>
          <br />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="price_interval">
              Price Interval
            </InputGroup.Text>
            <FormControl placeholder="100$" />
          </InputGroup>
          <br />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="name">Name</InputGroup.Text>
            <FormControl placeholder="Demo Product" />
          </InputGroup>
          <br />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="available">Available</InputGroup.Text>
            <FormControl placeholder="Yes" />
          </InputGroup>
          <br />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="visibility">Visibilty</InputGroup.Text>
            <FormControl placeholder="Visible" />
          </InputGroup>
          <br />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="variation">Variation</InputGroup.Text>
            <FormControl placeholder="23" />
          </InputGroup>
          <br />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="active">Active</InputGroup.Text>
            <FormControl placeholder="Yes" />
          </InputGroup>
          <br />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="url">URL</InputGroup.Text>
            <FormControl placeholder="google.com" disabled />
          </InputGroup>
          <br />
        </span>
        <div className="update__save">
          <Button variant="success" className="update">Update</Button>
          <Button variant="danger" className="save">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
