import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../Components/FormContainer";

import { getUserDetails } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Message from "../Components/Message";
import Loader from "../Components/Loader";

const UserEditScreen = () => {
  const params = useParams();
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");
  const [isAdmin, setisAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let { loading, error, user } = userDetails;
  const userId = params.id;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserDetails(userId));
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Link to="/userlist" className="btn btn-light my-3 ms-5">
        <h2>Go Back </h2>
      </Link>

      <FormContainer>
        <h2> User Profile:</h2>
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
            <Form.Group controlId="isAdmin">
              <Form.Label>isAdmin</Form.Label>
              <Form.Control
                type="checkbox"
                checked={isAdmin}
                required
                onChange={(e) => {
                  setisAdmin(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" onClick={submitHandler}>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
