import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Form,
} from "react-bootstrap";
import Message from "../Components/Message";
import { Link } from "react-router-dom";

export default function CartScreen() {
  const a = useParams();
  const [search, setSearch] = useSearchParams();
  console.log(a);
  const qty = search.get("qty");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch(addToCart(a.id, qty), [dispatch, a.id, qty]);
  });
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            {" "}
            Your Cart is empty <Link to="/">Go Shopping</Link>
          </Message>
        ) : (
          <ListGroup variant="fluid">
            {cartItems.map((e) => (
              <ListGroupItem key={e.product}>
                <Row>
                  <Col md={2}>
                    <Image src={e.image} alt={e.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${e.product}`}>{e.name}</Link>
                  </Col>
                  <Col md={2}>
                    <strong>Price:{e.price}</strong>
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={e.qty}
                      onChange={(e) => {
                        dispatch(addToCart(e.product, Number(e.target.value)));
                      }}
                    >
                      {[...Array(e.countInStock).keys()].map((e) => (
                        <option key={e + 1}>{e + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}></Col>
    </Row>
  );
}
