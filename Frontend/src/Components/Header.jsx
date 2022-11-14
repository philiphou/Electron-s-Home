import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions.js";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox.jsx";

export default function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  const { userInfo } = user;
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>ElectronHome</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox/>
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart "></i>&nbsp;Cart
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  log out
                </NavDropdown.Item>
                {userInfo && userInfo.isAdmin && (
                  <>
                    <LinkContainer to="/userlist" className="ms-0">
                      <NavDropdown.Item>All Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/productlist" className="ms-0">
                      <NavDropdown.Item>All Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist" className="ms-0">
                      <NavDropdown.Item>All Orders</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i>&nbsp;Login
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
