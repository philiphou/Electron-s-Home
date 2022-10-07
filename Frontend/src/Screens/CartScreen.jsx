import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteItem } from "../actions/cartActions";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../Components/Message";
import { Link } from "react-router-dom";

export default function CartScreen() {
  const navigate = useNavigate();
  const a = useParams();
  const [search, setSearch] = useSearchParams();
  const qty = search.get("qty");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const totalItems = cartItems.reduce((pre, current) => {
    return pre + Number(current.qty);
  }, 0);
  const totalPrice = cartItems.reduce((pre, current) => {
    return pre + Number(current.qty) * Number(current.price);
  }, 0);
  const removeFromCartHandler = (id) => {
    dispatch(deleteItem(id));
  };
  console.log(totalItems, typeof totalPrice);

  useEffect(() => {
    if (a.id) {
      dispatch(addToCart(a.id, qty));
    }
  }, [dispatch, a.id, qty]);
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty <Link to="/">Go Shopping</Link>
          </Message>
        ) : (
          <ListGroup variant="fluid">
            {cartItems.map((x) => (
              <ListGroupItem key={x.product}>
                <Row>
                  <Col md={2}>
                    <Image src={x.image} alt={x.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${x.product}`}>{x.name}</Link>
                  </Col>
                  <Col md={2}>
                    <strong>Price:{x.price}</strong>
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={x.qty}
                      onChange={(e) => {
                        const a = e.target.value;
                        console.log(a, typeof a);
                        dispatch(addToCart(x.product, Number(a)));
                      }}
                    >
                      {[...Array(x.countInStock).keys()].map((el) => (
                        <option key={el + 1}>{el + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(x.product)}
                    >
                      <i className="fa fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      {
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Total Items: {totalItems}</h2>
                <h3>
                  Subtotal:
                  <br />
                  <strong>${totalPrice.toFixed(2)}</strong>
                </h3>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                 style={{ margin: "20px" }}
                  type="button"
                  className="btn-block"
                  disabled={totalItems === 0}
                  onClick={() => {
                    navigate("/shipping");
                  }}
                >
                  Go to Checkout
                </Button>
                {""}
                <Button
                  style={{ margin: "20px" }}
                  type="button"
                  className="btn-block"
                  onClick={() => {

                    navigate("/login?redirect=shipping");
                  }}
                >
                  Continue Shopping
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      }
    </Row>
  );
}
