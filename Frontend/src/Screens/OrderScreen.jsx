import React, { useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  ListGroupItem,
  Card,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader";


import Message from "../Components/Message";
import { getOrderDetails } from "../actions/orderActions";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  console.log(order)
  const a = useParams();
  console.log(a);
  useEffect(() => {
    dispatch(getOrderDetails(a.id));
  }, []);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order ID :{order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroupItem variant="flush">
              <h2><strong>Shipping Information</strong></h2>
              <p><strong>Name:{order.user.name}</strong></p>
              <p><strong>Email:</strong> <a href={`mail to:${order.user.email}`}>{order.user.email}</a></p>
              <p>

                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.postcode},{" "}
                {order.shippingAddress.country}
              </p>
            </ListGroupItem>
            <ListGroupItem variant="flush">
              <h2> Payment Method</h2>
              <strong>Method:</strong>
              {order.paymentMethod}
              {order.isPaid?(<Message variant='success'>Paid on {order.paidAt}</Message>):(<Message variant='danger'>Not Paid Yet</Message>)}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((x, id) => {
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
                            {x.qty}x${x.price}=${x.qty * x.price.toFixed(2)}
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
                  <Col>${order.itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type="button"
                  className="btn w-100"
                  disabled={order.orderItems.length === 0}
                 
                >
                  PLACE ORDER
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
