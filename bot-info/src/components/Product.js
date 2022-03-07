import React from 'react'
import InputGroup from "react-bootstrap/InputGroup";
import { FormControl,Form } from 'react-bootstrap';
import './Product.css'
const Product = () => {
  return (
    <div className="product">
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">SKU</InputGroup.Text>
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          className="form__input"
        />

      </InputGroup>
    </div>
  );
}

export default Product