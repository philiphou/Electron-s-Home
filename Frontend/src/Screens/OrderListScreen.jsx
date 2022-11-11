import React, { useEffect } from "react";

import { Table, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { listAllOrders } from "../actions/orderActions";

const OrderListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderListAll);
  const { loading, error, orders } = orderList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <h1> Order List</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Paid</th>
              <th>Delevered</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((e) => (
              <tr key={e._id}>
                <td>{e._id}</td>
                <td>{e.user && e.user.name}</td>
                <td>{e.createdAt.substring(0, 10)}</td>
                <td>{e.totalPrice}</td>
                <td>
                  {e.isPaid ? (
                    e.paidAt.subString(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {e.isDelivered ? (
                    e.deliveredDate.substring(0, 10)
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
    </>
  );
};

export default OrderListScreen;
