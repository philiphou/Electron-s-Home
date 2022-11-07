import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrder } from "../actions/orderActions";

const ProfileScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let { loading, error, user } = userDetails;
  const updateProfie = useSelector((state) => state.userUpdateProfile);
  const { success } = updateProfie;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrder());
      } else {
        console.log("ccc");
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, dispatch, user, success]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password does not match");
    } else {
      dispatch(updateUserProfile({ name, email, password }));
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2> User Profile:</h2>
        {message && <Message variant="dangeer">{message}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter your user name"
                value={name}
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" onClick={submitHandler}>
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>
          <strong>My Orders List</strong>
        </h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Paid?</th>
                <th>Delivered?</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((e) => (
                <tr key={e._id}>
                  <td>{e._id}</td>
                  <td>{e.createdAt.substring(0, 10)}</td>
                  <td>{e.totalPrice.toFixed(2)}</td>

                  <td>
                    {e.isPaid ? (
                      e.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {e.isDelivered ? (
                      e.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${e._id}`}>
                      <Button className="btn-sm w-100" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
