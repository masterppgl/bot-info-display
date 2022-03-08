import React,{useState} from 'react'
import {Navbar,Container,NavDropdown,Nav,Modal,Button,Table }from 'react-bootstrap'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Link to="/">
            <Navbar.Brand>Bot-Info</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="active__shop">Active Shop</Nav.Link>
              <NavDropdown title="Available Shops" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Shop 0</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Shop 1</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Shop 2</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  <Button variant="primary">Add a shop</Button>
                  
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <div className="notification">
          <i class="fa-solid fa-bell fa-xl" onClick={handleShow}></i>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Notification Log</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Message</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>154</td>
                    <td>10.53</td>
                  </tr>
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="warning" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Navbar>
    </div>
  );
}

export default Header