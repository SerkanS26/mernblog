import React from "react";

// react bootstrap
import { Navbar, Nav, Container } from "react-bootstrap";

// React- Router-Bootstrap
import { LinkContainer } from "react-router-bootstrap";

// React-Icons
import { FaUser } from "react-icons/fa";

// Logo
import SDLogo from "../assets/SerDev.png";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="">
              <img
                src={SDLogo}
                alt="mern blog"
                style={{ width: "50px", height: "50px" }}
                className="me-3 rounded-circle"
              />
              Ser-Dev Blog
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
