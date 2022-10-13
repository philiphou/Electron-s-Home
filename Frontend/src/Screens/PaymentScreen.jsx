import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutStep from "../Components/CheckoutStep";
export default function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress,paymentMethod:payment } = cart;

  const navigate = useNavigate();
  if (Object.keys(shippingAddress).length===0) {
    navigate("/shipping");
  }
  const [paymentMethod, SetPaymentMethod] = useState(payment);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutStep step1 step2 step3 />
      <h1>Payment Methods</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label as="legend">Select Payment Methods</Form.Label>
          <Form.Check
            type="radio"
            label="Paypal or Credit Card"
            id="paypal"
            name="paymentMethod"
            value="PayPal"
            checked={paymentMethod==='Paypal'}
            onChange={(e) => {
              SetPaymentMethod(e.target.value);
            }}
          ></Form.Check>
          <Form.Check
            type="radio"
            label="Stripe"
            id="Stripe"
            name="paymentMethod"
            value="Stripe"
            checked={paymentMethod==='Stripe'}
            onChange={(e) => {
              SetPaymentMethod(e.target.value);
            }}
          ></Form.Check>
        </Form.Group>

        <Button type="submit" variant="primary" onClick={submitHandler}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}
