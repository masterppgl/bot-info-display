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

const ProductDetailsHeader = () => {
  const [show, setShow] = useState(false);
  const [addShop, setAddShop] = useState(false);
  const {contextStore, setContextStore} = useContext(ContextStore)
  const [notificationCount, setNotificationCount] = useState(0)
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setNotificationCount(0)
    let processNotifications = contextStore.processNotifications.filter(storeNotification => !storeNotification.viewStatus)
    contextStore.socket.emit("editStoreNotificationToViewed", {processNotifications})
  }
  useEffect(() => {
    setNotificationCount(0)
    const processNotifications = (processNotifications) => {
      console.log(processNotifications)
      if(!processNotifications.error){
        setContextStore(prev => ({
          ...prev,
          processNotifications
        }))
      }
    }
    const processErrors = (processErrors) => {
      console.log(processErrors)
      if(!processErrors.error){
        setContextStore(prev => ({
          ...prev,
          processErrors
        }))
      }
    }
    const getProcess = (storeProcess) => {
      console.log(storeProcess)
      if(!storeProcess.error){
        setContextStore(prev => ({
          ...prev,
          storeProcess
        }))
      }
    }
    if(contextStore.storeProcess._id){
      contextStore.socket.on(`processNotifications${contextStore.storeProcess._id}`, processNotifications)
      contextStore.socket.on(`processErrors${contextStore.storeProcess._id}`, processErrors)
      contextStore.socket.on(`storeProcess${contextStore.storeProcess._id}`, getProcess)

      contextStore.socket.emit("getProcessNotifications", {processId: contextStore.storeProcess._id})
      contextStore.socket.emit("getProcessErrors", {processId: contextStore.storeProcess._id})
      return () => {
        contextStore.socket.removeEventListener(`processNotifications${contextStore.storeProcess._id}`, processNotifications)
        contextStore.socket.removeEventListener(`processErrors${contextStore.storeProcess._id}`, processErrors)
        contextStore.socket.removeEventListener(`storeProcess${contextStore.storeProcess._id}`, getProcess)
      }

    }
  }, [])
  useEffect(() => {
    contextStore.processNotifications.sort(function(a,b){
      return new Date(b.time) -  new Date(a.time)
    })
    contextStore.processNotifications.map(processNotification => {
      if(!processNotification.viewStatus){
        setNotificationCount(past => past + 1)
      }
    })
  },[contextStore.processNotifications])
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
              <span className="badge">{notificationCount}</span>
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
                    {contextStore.processNotifications.map(processNotification => 
                      <tr>
                      <td>{processNotification.message}</td>
                      <td>{processNotification.time}</td>
                    </tr>
                    )}
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
