import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { FormControl, Form, Button } from "react-bootstrap";
import "./Product.css";
import RangeSlider from "react-bootstrap-range-slider";
const Product = () => {
  const [timeInterval, setTimeinterval] = useState(0);
  const [price, setPrice] = useState(0);
  return (
    <div className="product">
      <InputGroup className="input__style">
        <InputGroup.Text id="inputGroup-sizing-default">SKU</InputGroup.Text>
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          className="form__input"
        />
        <div className="form__range">
          <Form.Label>Time Interval</Form.Label>
          <RangeSlider
            value={timeInterval}
            onChange={(changeEvent) =>
              setTimeinterval(changeEvent.target.value)
            }
          />
        </div>
        <div className="form__range">
          <Form.Label>Price Change Interval</Form.Label>
          <RangeSlider
            step={10}
            value={price}
            onChange={(changeEvent) => setPrice(changeEvent.target.value)}
          />
        </div>
        <InputGroup.Text id="inputGroup-sizing-default">
          Lower Bound
        </InputGroup.Text>
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          className="form__input"
        />
        <Button variant="primary">Add Product</Button>
      </InputGroup>
    </div>
  );
};

export default Product;
