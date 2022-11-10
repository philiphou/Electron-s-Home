import React, { useEffect } from "react";

import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Loader from "../Components/Loader";
import Message from "../Components/Message";

import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
const ProductListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  // get the productCreate data from store
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: newProduct,
  } = productCreate;

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      navigate("/login");
    }else{
      dispatch(listProducts())
    }

  
  }, [dispatch, userInfo, successDelete, successCreate, newProduct]);

  const deleteProductHandler = (id) => {
    if (window.confirm("do you confirm to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };
  return (
    <>
      <Row>
        <Col className="align-items-center">
          <h1>
            {" "}
            <strong>Product List</strong>
          </h1>
        </Col>
        <Col className="text-right ">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fa fa-plus me-3"></i>Create Product Sample
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {loadingCreate && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {errorCreate && <Message variant="danger">{errorDelete}</Message>}
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
              <th>Brand</th>
              <th>Edit</th>
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>
            {products.map((e) => (
              <tr key={e._id}>
                <td>{e._id}</td>
                <td>{e.name}</td>
                <td>${e.price}</td>

                <td>{e.category}</td>

                <td>{e.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${e._id}/edit`}>
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
