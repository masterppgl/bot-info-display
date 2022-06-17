import React, { useContext, useEffect, useState } from "react";
import "./ProductDetails.css";
import { InputGroup,Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import ContextStore from "../Context/ContextStore";
import RangeSlider from "react-bootstrap-range-slider";
import { Link, Navigate, useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const navigate = useNavigate()
  const {contextStore, setContextStore} = useContext(ContextStore)

  const onChangeSlider = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const [formData, setFormData] = useState({
    ...contextStore.storeProcess, timeInterval: parseInt(contextStore.storeProcess.timeInterval/60000 )
  })
  const onClickCancel = () => {
    navigate("/")
  }
  const onClickUpdate = () => {
    console.log(formData)
    contextStore.socket.emit(`deleteProcess${formData._id}`)
    contextStore.socket.emit("createStoreProcess", {...formData})
    navigate("/")
  }
  useEffect(() => {
      if(!contextStore.storeProcess._id){
        navigate("/")
      }
  },[])
  
  return (
    <div>
      <div className="product__details">
        <h1>Product Name</h1>
        <img
          src={formData.image}
          alt=""
          className="product__image"
        />
        <div className="details">
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="SKU">SKU</InputGroup.Text>
            <FormControl placeholder="143515151361" value={formData.sku} />
          </InputGroup>
          <br />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="time_interval">Time Interval</InputGroup.Text>
            <RangeSlider
          min={1}
          max={120}
            name = "timeInterval"
            value={formData.timeInterval}
            onChange = {onChangeSlider}
          />
          </InputGroup>
          <br />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="price_interval">
              Price Interval
            </InputGroup.Text>
            <RangeSlider
          min={0.01}
          max={50}
            name="priceInterval"
            step={0.01}
            value={formData.priceInterval}
            onChange = {onChangeSlider}
          />
          </InputGroup>
          <br />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="name" >Name</InputGroup.Text>
            <FormControl placeholder="Name" value = {formData.name}/>
          </InputGroup>
          <br />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="available">Available</InputGroup.Text>
            <FormControl placeholder="Yes" value = {formData.available}/>
          </InputGroup>
          <br />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="variation">Variation</InputGroup.Text>
            <FormControl placeholder="23" value = {formData.variation}/>
          </InputGroup>
          <br />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="active">Active</InputGroup.Text>
            <FormControl placeholder="Yes" value = {formData.active}/>
          </InputGroup>
          <br />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="active">Current Price</InputGroup.Text>
            <FormControl placeholder="Yes" value = {formData.currentPrice}/>
          </InputGroup>
          <br />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="active">Lower Bound</InputGroup.Text>
            <FormControl placeholder="Please Put in an Integer" value = {formData.lowerBound} name = "lowerBound" onChange = {onChangeSlider}/>
          </InputGroup>
          <br />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="active">String Column</InputGroup.Text>
            <FormControl placeholder="Yes" name = "stringColumn" value = {formData.stringColumn} onChange = {onChangeSlider}/>
          </InputGroup>
          <br />
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="active">Number Column(Must Be a Number)</InputGroup.Text>
            <FormControl placeholder="Yes" name = "numberColumn" value = {formData.numberColumn} onChange = {onChangeSlider}/>
          </InputGroup>
          <br />
          
          <InputGroup size="sm" className="mb-3">
           <a href={formData.url}><InputGroup.Text id="url">URL</InputGroup.Text></a>
            <FormControl placeholder="google.com" disabled value = {formData.url}/>
          </InputGroup>
          <br />
        </div>
        <div className="update__save">
          <Button variant="success" className="update" onClick={onClickUpdate}>Update</Button>
          <Button variant="danger" className="save" onClick={onClickCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
