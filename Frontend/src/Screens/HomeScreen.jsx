import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { listProducts } from "../actions/productActions";

import Product from "../Components/Product";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import Meta from "../Components/Meta";
import Page from "../Components/Page";
import { useParams } from "react-router-dom";

export default function HomeScreen() {
  const params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber||1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => {
    return state.productList;
  });

  //console.log('products:'+productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword,pageNumber));
  }, [dispatch, keyword,pageNumber]); // when array is empty, useEffect will be executed only first time when component rendered
  return (
    <>
      <Meta></Meta>
      {keyword && (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Product</h1>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : error ? (
        <Message value="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
          <Page pages={pages} page={page} />
        </>
      )}
    </>
  );
}
