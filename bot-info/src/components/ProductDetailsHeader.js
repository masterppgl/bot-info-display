import React, { useCallback, useContext, useState } from "react";
import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Modal,
  Button,
  Table,
} from "react-bootstrap";
import "./Header.css";
import { Link } from "react-router-dom";
import { InputGroup, FormControl } from "react-bootstrap";
import ContextStore from "../Context/ContextStore";

const ProductDetailsHeader = () => {
  const [show, setShow] = useState(false);
  const [addShop, setAddShop] = useState(false);
  const {contextStore, setContextStore} = useContext(ContextStore)
  const {stores} = contextStore
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShopClose = () => setAddShop(false);
  const handleShopShow = () => setAddShop(true);
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
              <Nav.Link className="active__shop">{contextStore.store.name ? contextStore.store.name : "Active Store"}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <div className="notification">
            <i class="fa-solid fa-bell fa-xl" onClick={handleShow}>
              <span className="badge">3</span>
            </i>
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
};

export default ProductDetailsHeader;
