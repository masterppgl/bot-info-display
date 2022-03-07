import React from 'react'
import {Navbar,Container,NavDropdown,Nav }from 'react-bootstrap'

const Header = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Bot-Info</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link >Active Shop</Nav.Link>
              <NavDropdown title="Available Shops" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Shop 0</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Shop 1
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Shop 2
                </NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item href="#action/3.4">
                  Shop 3
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header