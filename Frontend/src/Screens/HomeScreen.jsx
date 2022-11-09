import React from "react";
import {useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { listProducts } from "../actions/productActions";

import Product from "../Components/Product";
import Message from "../Components/Message";
import Loader from "../Components/Loader";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => {
    return state.productList;
  });

  //console.log('products:'+productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]); // when array is empty, useEffect will be executed only first time when component rendered
  return (
    <>
      <h1>Latest Product</h1>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : error ? (
        <Message value="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product}></Product>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
