import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import FormContainer from "../Components/FormContainer";

import { getUserDetails, updateUserById } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = () => {
  const params = useParams();
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");
  const [isAdmin, setisAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const userLogin = useSelector((state) => state.userLogin);

  let { loading, error, user } = userDetails;
  const userId = params.id;
  const userUpdate = useSelector((state) => state.userUpdate);
  const navigate = useNavigate();
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      navigate("/userlist");
      dispatch({type:USER_UPDATE_RESET})
    }
    dispatch(getUserDetails(userId));
  }, [successUpdate]);
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(updateUserById({ _id: userId, name, email, isAdmin }, userId));
  };
  return (
    <>
      <Link to="/userlist" className="btn btn-light my-3 ms-5">
        <h2>Go Back </h2>
      </Link>

      <FormContainer>
        <h2> User Edit:</h2>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message danger="variant">{errorUpdate}</Message>}

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
              <Form.Check
                type="checkbox"
                label="isAdmin"
                checked={isAdmin}
                required
                onChange={(e) => {
                  console.log(e.target.checked)
                  setisAdmin(e.target.checked);
                }}
              ></Form.Check>
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
