import React, { useEffect } from "react";

import { Table, Row, Col, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { deleteUser, listUsers } from "../actions/userActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const UserListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const {success:successDelete}=userDelete
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo,successDelete]);

  const deleteUserHandler = (id) => {
    if (window.confirm("do you confirm to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <h1> User List</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin?</th>
              <th>Edit?</th>
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>
            {users.map((e) => (
              <tr key={e._id}>
                <td>{e._id}</td>
                <td>{e.name}</td>
                <td>
                  <a href={`mailto ${e.email}`}>{e.email}</a>
                </td>

                <td>
                  {e.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                
                  <LinkContainer to={`admin/user/${e._id}/edit`}>
                    <Button className="btn-sm w-100" variant="light">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                 
                </td>
                <td>
                <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteUserHandler(e._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
