import React from "react";
import { Row, Col, ListGroup, ListGroupItem, Image,Card,Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import products from "../products";
import Rating from "../Components/Rating";

export default function ProductScreen() {
  const a = useParams();
  console.log(a); // 输出： {id:2}
  const product = products.find((e) => e._id === a.id);
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        back to homepage
      </Link>
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
                  <Col>Price:
                  </Col>
                  <Col>
                  <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
             <ListGroupItem>
              <Row>
                <Col>Status:</Col>
                <Col>{product.countInStock>0?"In Stock":"Out of Stock"}</Col>
              </Row>
             </ListGroupItem>
             <ListGroupItem>
              <Button className='btn-block' type='button' disabled={product.countInStock===0}> Add to Cart

              </Button>
             </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}
