import React, { useContext, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { FormControl, Form, Button } from "react-bootstrap";
import "./Product.css";
import RangeSlider from "react-bootstrap-range-slider";
import ContextStore from "../Context/ContextStore";
const Product = () => {
  const {contextStore, setContextStore} = useContext(ContextStore)
  const [formData, setFormData] = useState({
    sku: "",
    timeInterval: 1,
    priceInterval: 0.01,
    lowerBound: ""
  })
  const onChangeFormData = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const onClickSubmitButton = () => {
    if(contextStore.store._id){
      contextStore.socket.emit("createStoreProcess", {sku: formData.sku, timeInterval: formData.timeInterval*60*1000, priceInterval: formData.priceInterval, lowerBound: formData.lowerBound, storeId: contextStore.store._id})
    }
  }
  return (
    <div className="product">
      <InputGroup className="input__style">
        <InputGroup.Text id="inputGroup-sizing-default">SKU</InputGroup.Text>
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          className="form__input"
          name="sku"
          placeholder="SKU of the Item"
          value={formData.sku}
          onChange={onChangeFormData}
        />
        <div className="form__range">
          <Form.Label>Time Interval</Form.Label>
          <RangeSlider
          min={1}
          max={120}
            name = "timeInterval"
            value={formData.timeInterval}
            onChange={onChangeFormData}
          />
        </div>
        <div className="form__range">
          <Form.Label>Price Change Interval</Form.Label>
          <RangeSlider
          min={0.01}
          max={20}
            name="priceInterval"
            step={0.01}
            value={formData.priceInterval}
            onChange={onChangeFormData}
          />
        </div>
        <InputGroup.Text id="inputGroup-sizing-default">
          Lower Bound
        </InputGroup.Text>
        <FormControl
          name="lowerBound"
          value={formData.lowerBound}
          placeholder="Lower Bound In Number"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          className="form__input"
          onChange={onChangeFormData}
        />
        <Button variant="primary" onClick={onClickSubmitButton}>Add Product</Button>
      </InputGroup>
    </div>
  );
};

export default Product;
