import React from "react";

// react bootstrap
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

// React- Router-Bootstrap
import { LinkContainer } from "react-router-bootstrap";

// components
import SearchBox from "./SearchBox";

// React-Icons
import { FaUser } from "react-icons/fa";

// React-Router-Dom
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Actions
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/ReduxApiCalls/usersApiSlice";

// Logo
import SDLogo from "../assets/SerDev.png";
const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header style={{ position: "sticky", top: "0", zIndex: "1000" }}>
      <Navbar
        style={{
          backgroundColor: "rgba(53, 88, 134, .7)",
          backdropFilter: "blur(10px)",
        }}
        className="shadow-5"
        variant="dark"
        expand="md"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex  justify-content-center">
              <img
                src={SDLogo}
                alt="mern blog"
                style={{ width: "50px", height: "50px" }}
                className="me-3 rounded-circle"
              />
              <h2>ser.dev</h2>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="userInfo">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile & My Posts</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/postlist">
                    <NavDropdown.Item>Posts</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
