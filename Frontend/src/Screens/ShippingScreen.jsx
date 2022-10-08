import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import CheckoutStep from "../Components/CheckoutStep";
import { saveShippingAddress } from "../actions/cartActions";

export default function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress?shippingAddress.address:"");
  const [city, setCity] = useState(shippingAddress?shippingAddress.city:"");
  const [postcode, setPostCode] = useState(shippingAddress?shippingAddress.postcode:"");
  const [country, setCountry] = useState(shippingAddress?shippingAddress.country:"");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postcode, country }));
    localStorage.setItem('shippingAddress',{ address, city, postcode, country })
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutStep step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="city"
            placeholder="Enter City"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postcode">
          <Form.Label>Post Code</Form.Label>
          <Form.Control
            type="postcode"
            placeholder="Enter Post Code"
            value={postcode}
            onChange={(e) => {
              setPostCode(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="country"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" onClick={submitHandler}>
          Continue
        </Button>
      </Form>

    </FormContainer>
  );
}
