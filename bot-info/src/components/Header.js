import React, { useCallback, useContext, useEffect, useState } from "react";
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

const Header = () => {
    const [show, setShow] = useState(false);
    const [addShop, setAddShop] = useState(false);
    const { contextStore, setContextStore } = useContext(ContextStore);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShopClose = () => setAddShop(false);
    const handleShopShow = () => setAddShop(true);
    const [formData, setFormData] = useState({
        name: "",
        userId: "",
        API_KEY: "",
    });
    const onSubmitForm = () => {
      if(contextStore.socket){
        const {name, userId, API_KEY} = formData
        contextStore.socket.emit("createStore", {name, userId, API_KEY})
        setFormData({
          name: "",
          userId: "",
          API_KEY: "",
      })
      handleShopClose()
      }
    }
    const onChangeFormData = (e) => {
      setFormData({...formData, [e.target.name]:e.target.value})
    }
    const onClickDeleteButton = (id) => {
        if (contextStore.socket) {
            contextStore.socket.emit("deleteStore", { id });
        }
    };
    useEffect(() => {
        if (contextStore.socket) {
            contextStore.socket.on("stores", (stores) => {
                console.log(stores);
                if (!stores.error) {
                    setContextStore({ ...contextStore, stores });
                }
            });
            contextStore.socket.emit("getStores");
        }
    }, [contextStore.socket]);
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
                  {contextStore.stores.map((store) => (
                    <NavDropdown.Item>
                      {store.name}
                      <Button
                        variant="danger"
                        size="sm"
                        className="delete__shop"
                        onClick={() => {
                          onClickDeleteButton(store._id);
                        }}
                      >
                        Delete
                      </Button>
                    </NavDropdown.Item>
                  ))}
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Button variant="primary" onClick={handleShopShow}>
                      Add a shop
                    </Button>
                    <Modal show={addShop} onHide={handleShopClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add a shop</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <InputGroup size="sm" className="mb-3">
                          <InputGroup.Text id="inputGroup-sizing-sm">
                            Name
                          </InputGroup.Text>

                          <FormControl
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            name="name"
                            value={formData.name}
                            onChange={onChangeFormData}
                          />
                        </InputGroup>{" "}
                        <br />
                        <InputGroup size="sm" className="mb-3">
                          <InputGroup.Text id="inputGroup-sizing-sm">
                            User ID
                          </InputGroup.Text>
                          <FormControl
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            name="userId"
                            value={formData.userId}
                            onChange={onChangeFormData}
                          />
                        </InputGroup>
                        <br />
                        <InputGroup size="sm" className="mb-3">
                          <InputGroup.Text id="inputGroup-sizing-sm">
                            API KEY
                          </InputGroup.Text>
                          <FormControl
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            name="API_KEY"
                            value={formData.API_KEY}
                            onChange={onChangeFormData}
                          />
                        </InputGroup>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="success" onClick={onSubmitForm}>
                          Add
                        </Button>
                        <Button variant="warning" onClick={handleShopClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </NavDropdown.Item>
                </NavDropdown>
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

export default Header;
