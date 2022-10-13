import React, { useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import Loader from "../Components/Loader";
import CheckoutStep from "../Components/CheckoutStep";
import { saveShippingAddress } from "../actions/cartActions";
import Message from "../Components/Message";

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <>
      <CheckoutStep step1 step2 step3 step4></CheckoutStep>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroupItem variant="flush">
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city}, {cart.shippingAddress.postcode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroupItem>
            <ListGroupItem variant="flush">
              <h2> Payment Method</h2>
              <strong>Method:</strong>
              {cart.paymentMethod}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((x, id) => {
                    return (
                      <ListGroupItem key={id}>
                        <Row>
                          <Col md={1}>
                            <Image src={x.image} alt={x.name} fluid rounded />
                          </Col>
                          <Col>
                          <Link to={`/product/${x.product}`}>
                            {x.name}
                          </Link>
                          </Col>
                          <Col md={4}>
                            {x.qty}x${x.price}=${x.qty*x.price}
                          </Col>
                        </Row>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
