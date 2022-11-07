import React, { useEffect } from "react";

import { Table, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import Loader from "../Components/Loader";
import Message from "../Components/Message";

import { listProducts } from "../actions/productActions";
const ProductListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo]);

  const deleteProductHandler = (id) => {
    if (window.confirm("do you confirm to delete this user?")) {
      console.log("deleted product ");
      // dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <h1> Product List</h1>
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
              <th>Price</th>
              <th>Category</th>
              <th>Edit?</th>
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>
            {products.map((e) => (
              <tr key={e._id}>
                <td>{e._id}</td>
                <td>{e.name}</td>
                <td>{e.price}</td>

                <td>{e.category}</td>

                <td>
                  <LinkContainer to={`/user/${e._id}/edit`}>
                    <Button className="btn-sm w-100" variant="light">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteProductHandler(e._id)}
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

export default ProductListScreen;
