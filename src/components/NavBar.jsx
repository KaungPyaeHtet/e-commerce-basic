import React, { useContext, useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Context from "./Context";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import "../assets/NavBar.css";

const NavBar = () => {
  const {
    dollarToKyat,
    kyatToDollar,
    currencyType,
    setCurrencyType,
    toggleIcon,
    theme,
    cartCount
  } = useContext(Context);

  return (
    <Navbar expand="lg" className={`navbar navbar-${theme} bg-${theme}`}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          Ozzy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav-dropdown" />
        <Navbar.Collapse id="navbar-nav-dropdown">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active>
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/prices">
              Prices
            </Nav.Link>
            <Nav.Link as={Link} to="/blogs">
              Blogs
            </Nav.Link>
            <NavDropdown title="Clothes" id="navbar-clothes">
              <NavDropdown.Item as={Link} to="/clothes">
                General
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/clothes/women">
                Women
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/clothes/men">
                Men
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/clothes/child">
                Child
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Perfumes" id="navbar-perfume">
              <NavDropdown.Item
                as={Link}
                to="/perfumes/women"
              >
                Women
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/perfumes/men"
              >
                Men
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/perfumes/child"
              >
                Child
              </NavDropdown.Item>
            </NavDropdown>
            {currencyType === "kyats" ? (
              <Button
                variant="outline-primary"
                onClick={() => {
                  kyatToDollar();
                }}
              >
                Convert to Dollars
              </Button>
            ) : (
              <Button
                variant="outline-secondary"
                onClick={() => {
                  dollarToKyat();
                }}
              >
                Convert to Kyat
              </Button>
            )}
            <Nav.Link as={Link} to="/cart">
              <FaCartShopping />
              {cartCount > 0 && (
                <span
                  className="badge badge-light border border-3 border-rounded"
                >
                  {cartCount}
                </span>
              )}
            </Nav.Link>
            <Button variant="outline-primary" onClick={() => toggleIcon()}>
              {theme === "dark" ? <FaSun size={24} /> : <FaMoon size={24} />}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
