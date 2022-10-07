import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../Components/Message";
import Loader from "../Components/Loader";

const RegisterScreen = (location) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect]);
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));

  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter your user name"
            value={name}
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
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" onClick={submitHandler}>
          Register
        </Button>
        <Row className="py-3">
          <Col>
            Have an account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Regiser
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
