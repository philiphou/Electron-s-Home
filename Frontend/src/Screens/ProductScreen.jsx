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
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { listProductDetail } from "../actions/productActions";

import Rating from "../Components/Rating";

export default function ProductScreen(history) {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;
  const a = useParams();

  useEffect(() => {
    dispatch(listProductDetail(a.id));
  }, [dispatch]);
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
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
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
      )}
    </>
  );
}
