import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useNavigate } from "react-router-dom";

import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Card,
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  listProductDetail,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

import Rating from "../Components/Rating";
import Meta from "../Components/Meta";

export default function ProductScreen(history) {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;
  // get reviews data
  const productReviews = useSelector((state) => state.productReviews);
  const {
    loading: loadingCreateProductReview,
    error: errorCreateProductReview,
    success: successCreateProductReview,
  } = productReviews;

  //  create the review object to submit
  const [ratingNumber, setRatingNumber] = useState(0);
  const [comments, setComments] = useState("");

  const a = useParams();
  const user = useSelector((state) => state.userLogin);

  const { userInfo } = user;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(a.id, { ratingNumber, comments }));
  };
  useEffect(() => {
    if (successCreateProductReview) {
      setRatingNumber(0);
      setComments("");
    }
    if (!product._id || successCreateProductReview || product._id !== a.id) {
      dispatch(listProductDetail(a.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, successCreateProductReview]);
  const addToCartHandler = () => {
    const path = `/cart/${a.id}?qty=${qty}`;
    navigate(path);
  };
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        back to homepage
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message value="damger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name}></Meta>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price:${product.price}</ListGroupItem>
                <ListGroupItem>Description:{product.description}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      {" "}
                      Add to Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2> Reviews</h2>
              {product.reviews.length === 0 && (
                <Message>No reviews added</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((e) => (
                  <ListGroupItem key={e._id}>
                    <strong>{e.name}</strong>
                    <Rating value={e.rating} />
                    <p>{e.comment}</p>
                    <p>{e.createdAt.substring(0,10)}</p>
                  </ListGroupItem>
                ))}
                <ListGroupItem>
                  <h2>Write a review</h2>
                  {successCreateProductReview && (
                    <Message>review is submitted successfully</Message>
                  )}
                  {loadingCreateProductReview && <Loader />}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <FormGroup controlId="rating">
                        <FormLabel>Rating</FormLabel>
                        <FormControl
                          as="select"
                          value={ratingNumber}
                          onChange={(e) => {
                            setRatingNumber(e.target.value);
                          }}
                        >
                          <option value="">Select ...</option>
                          <option value="1">1-poor</option>
                          <option value="2">2-not so good</option>
                          <option value="3">3-average</option>
                          <option value="4">4-good</option>
                          <option value="5">5-very good</option>
                        </FormControl>
                      </FormGroup>
                      <FormGroup controlId="comments">
                        <FormLabel>Comments</FormLabel>
                        <FormControl
                          as="textarea"
                          value={comments}
                          onChange={(e) => {
                            setComments(e.target.value);
                          }}
                        ></FormControl>
                      </FormGroup>
                      <Button
                        diabled={loadingCreateProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit{" "}
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      please <Link to="/login"> Sign in </Link>to write your
                      review
                    </Message>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
