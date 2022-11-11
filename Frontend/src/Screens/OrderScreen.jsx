import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  ListGroupItem,
  Card,
} from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader";

import Message from "../Components/Message";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import axios from "axios";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

const OrderScreen = () => {
  const [sdkReady, setsdkReady] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;
  console.log(order);
  const a = useParams();
  const orderId = a.id;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      const addPayPalScript = async () => {
        const { data: ClientID } = await axios.get("/paypal");
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${ClientID}`;
        script.async = true;
        script.onload = () => {
          setsdkReady(true);
        };
        document.body.appendChild(script);
      };

      //  if there is no order, we need get order details first
      if (!order || successPay || successDeliver || order._id !== orderId) {
        dispatch({ type: ORDER_PAY_RESET });
        dispatch({ type: ORDER_DELIVER_RESET });
        dispatch(getOrderDetails(orderId));
        //  if order exists and not paid,
      } else if (!order.isPaid) {
        //  if paypal is not onloaded
        if (!window.paypal) {
          addPayPalScript();
        } else {
          console.log(sdkReady);
          setsdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, order, sdkReady, successPay, successDeliver]);

  //  callback handlers

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };
  const deliverOrderHandler = () => {
    dispatch(deliverOrder(orderId));
  };

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
              <h2>
                <strong>Shipping Information</strong>
              </h2>
              <p>
                <strong>Name:{order.user.name}</strong>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mail to:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.postcode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredDate.substring(0,10)}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered Yet</Message>
              )}
            </ListGroupItem>
            <ListGroupItem variant="flush">
              <h2> Payment Method</h2>
              <strong>Method:</strong>
              {order.paymentMethod}{" "}
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid Yet</Message>
              )}
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
                            <Link to={`/products/${x.product}`}>{x.name}</Link>
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
                <h2>
                  <strong>Order Summary</strong>
                </h2>
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
                  <Col>
                    <strong>Total</strong>
                  </Col>
                  <Col>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </Col>
                </Row>
              </ListGroupItem>

              {!order.isPaid && (
                <ListGroupItem>
                  {loadingPay && <Loader></Loader>}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice.toFixed(2)}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroupItem>
              )}

              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && !order.isDelivered && (
                <ListGroupItem>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverOrderHandler}
                  >
                    Deliver the Order
                  </Button>
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
