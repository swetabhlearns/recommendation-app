import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <div className="navBar">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">RECOMMENDATION APP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/books">Books</Nav.Link>
            <Nav.Link href="/movies">Movies</Nav.Link>
            <Nav.Link href="/music">Music</Nav.Link>
            <Nav.Link href="/series">Series</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
