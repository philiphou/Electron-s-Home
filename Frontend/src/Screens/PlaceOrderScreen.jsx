import React, { useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  ListGroupItem,
  Card
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CheckoutStep from "../Components/CheckoutStep";

import Message from "../Components/Message";

const PlaceOrder = () => {
  let cart = useSelector((state) => state.cart);
  // get total price before tax and shipping
  cart.itemsPrice= cart.cartItems.reduce((acc,cur)=>(acc+cur.price*cur.qty),0)
  //  get shipping costs
  cart.shippingPrice=cart.itemsPrice>50?0:15
  //  get tax expenses
  cart.taxPrice=cart.itemsPrice*0.10
  //  get total price
  cart.totalPrice = cart.itemsPrice+cart.shippingPrice+cart.taxPrice

  const dispatch = useDispatch()
  const placeOrderHandler=(e)=>{

  }
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
                            <Link to={`/product/${x.product}`}>{x.name}</Link>
                          </Col>
                          <Col md={4}>
                            {x.qty}x${x.price}=${x.qty * x.price}
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
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type="button"
                   className="btn w-100"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >PLACE ORDER</Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
