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
  const [notificationCount, setNotificationCount] = useState(0)
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    setNotificationCount(0)
    contextStore.storeNotifications.map(storeNotification => {
      if(!storeNotification.viewStatus){
        contextStore.socket.emit("editStoreNotificationToViewed", {storeNotificationId: storeNotification._id})
      }
      
    })
  };
  const handleShopClose = () => setAddShop(false);
  const handleShopShow = () => setAddShop(true);
  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    API_KEY: "",
  });
  const onSubmitForm = () => {
    if (contextStore.socket) {
      const { name, userId, API_KEY } = formData;
      contextStore.socket.emit("createStore", { name, userId, API_KEY });
      setFormData({
        name: "",
        userId: "",
        API_KEY: "",
      });
      handleShopClose();
    }
  };
  const onChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onClickDeleteButton = (storeId) => {
    if (contextStore.socket) {
      if (storeId === contextStore.store._id) {
        setContextStore(prev => ({
          ...prev,
          store: {}
        }));
      }
      contextStore.socket.emit("deleteStore", { storeId });
    }
  };
  const onClickSelectStore = (store) => {
    console.log(contextStore)
    setContextStore(prev => ({
      ...prev,
      store
    }));
  };
  useEffect(() => {
    if (contextStore.socket.connected) {
      const stores =  (stores) => {
        console.log(stores);
        if (!stores.error) {
          setContextStore(prev => ({
            ...prev,
            stores
          }));
          
        }
      }
      contextStore.socket.on("stores",stores);
      
      
      contextStore.socket.emit("getStores");
      return () => {
        contextStore.socket.removeEventListener("stores", stores)
      }
    }
  }, [contextStore.socket.connected]);
  useEffect(() => {
    setNotificationCount(0)
    const storeNotifications = (storeNotifications) => {
      console.log(storeNotifications)
      if(!storeNotifications.error){
        // console.log(contextStore)
        setContextStore(prev=> ({
          ...prev,
          storeNotifications
        }))
      }
    }
    const storeErrors = (storeErrors) => {
      console.log(storeErrors)
      if(!storeErrors.error){
        setContextStore(prev =>({
          ...prev,
          storeErrors
        }))
      }
    }
    const storeProcesses = (storeProcesses) => {
      console.log(storeProcesses)
      if(!storeProcesses.error){
        setContextStore(prev => ({
          ...prev,
          storeProcesses
        })) 
      }
    } 
    if(contextStore.store._id){
      contextStore.socket.on(`storeProcesses${contextStore.store._id}`, storeProcesses)
      contextStore.socket.on(`storeNotifications${contextStore.store._id}`, storeNotifications)
      contextStore.socket.on(`storeErrors${contextStore.store._id}`, storeErrors)
      contextStore.socket.emit("getStoreNotifications", {storeId: contextStore.store._id})
      contextStore.socket.emit("getStoreErrors", {storeId: contextStore.store._id})
      contextStore.socket.emit("getStoreProcesses", {storeId: contextStore.store._id})
    }
    else {
      setContextStore(prev => ({
        ...prev,
        storeNotifications: []
      }))
      
    }
    return () => {
      if(contextStore.store._id){
        contextStore.socket.removeEventListener(`storeNotifications${contextStore.store._id}`, storeNotifications)
        contextStore.socket.removeEventListener(`storeErrors${contextStore.store._id}`, storeErrors)
        contextStore.socket.removeEventListener(`storeProcesses${contextStore.store._id}`,storeProcesses)
      }
    }
  }, [contextStore.store]);

  useEffect(() => {
    contextStore.storeNotifications.map(storeNotification => {
      if(!storeNotification.viewStatus){
        setNotificationCount(past => past + 1)
      }
    })
  },[contextStore.storeNotifications])
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
              <Nav.Link className="active__shop">
                {contextStore.store.name
                  ? contextStore.store.name
                  : "Active Shop"}
              </Nav.Link>
              <NavDropdown title="Available Shops" id="basic-nav-dropdown">
                {contextStore.stores.map((store) => (
                  <NavDropdown.Item>
                    {store.name}
                    <Button
                      variant="primary"
                      size="sm"
                      className="delete__shop"
                      onClick={() => {
                        onClickSelectStore(store);
                      }}
                    >
                      Select
                    </Button>
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
                    Add a Store
                  </Button>
                  <Modal show={addShop} onHide={handleShopClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add a Store</Modal.Title>
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
            <span className="badge">{notificationCount}</span>
          </i>
          <Modal
            className="notification__modal"
            scrollable
            show={show}
            onHide={handleClose}
          >
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
                  {contextStore.storeNotifications.map(storeNotification => (
                    <tr>
                    <td>{storeNotification.message}</td>
                    <td>{storeNotification.time}</td>
                  </tr>
                  ))}
                  {/* <tr>
                    <td>hello</td>
                    <td>10.54</td>
                  </tr>
                  <tr>
                    <td>hello</td>
                    <td>10.54</td>
                  </tr>
                  <tr>
                    <td>hello</td>
                    <td>10.54</td>
                  </tr>
                  <tr>
                    <td>hello</td>
                    <td>10.54</td>
                  </tr>
                  <tr>
                    <td>hello</td>
                    <td>10.54</td>
                  </tr> */}

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
