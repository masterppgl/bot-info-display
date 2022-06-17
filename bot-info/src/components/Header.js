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
import dispatch from "../dispatch/dispatch";
import actions from "../dispatch/actions";
import amqp from "../amqp/amqp";
import getDate from "../getDate";


const Header = () => {
    const [show, setShow] = useState(false);
    const [addShop, setAddShop] = useState(false);
    const { contextStore, setContextStore } = useContext(ContextStore);
    const vStoreProcesses = [...contextStore.storeProcesses];
    console.log(vStoreProcesses);
    const [notificationCount, setNotificationCount] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = async () => {
        if (contextStore.store._id) {
            contextStore.setShowSpinner(true)
            let response = await dispatch(
                actions.batchUpdateStoreNotifications,
                {},
                { store: contextStore.store, update: { viewStatus: true } }
            );
            response = await dispatch(actions.getStoreNotifications, {
                storeId: contextStore.store._id,
            });
            
            setContextStore((prev) => ({
                ...prev,
                storeNotifications: response,
            }));
            contextStore.setShowSpinner(false)
        }

        setShow(true);
    };
    const handleShopClose = () => setAddShop(false);
    const handleShopShow = () => setAddShop(true);
    const [formData, setFormData] = useState({
        name: "",
        userId: "",
        API_KEY: "",
    });
    const onClickClearNotification = async () => {
        contextStore.setShowSpinner(true)
        const response = await dispatch(actions.clearNotification, {storeId: contextStore.store._id})
        console.log(response)
        contextStore.setShowSpinner(false)
    }
    const onSubmitForm = async () => {
        const { name, userId, API_KEY } = formData;
        contextStore.setShowSpinner(true)
        const store = await dispatch(
            actions.createStore,
            {},
            { name, userId, API_KEY }
        );
        console.log(store);
        if (!store.error) {
            setContextStore({
                ...contextStore,
                stores: [...contextStore.stores, { ...store }],
            });
        }
        setFormData({
            name: "",
            userId: "",
            API_KEY: "",
        });
        handleShopClose();
        contextStore.setShowSpinner(false)
    };
    const onChangeFormData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onClickDeleteButton = async (storeId) => {
        contextStore.setShowSpinner(true)
        console.log(storeId);
        let response = await dispatch(actions.deleteStores, { id: storeId });
        console.log(response);
        if (response.error) {
            contextStore.setShowSpinner(false)
            return;
        }
        const stores = await dispatch(actions.getStores);
        console.log(stores);
        if (stores.error) {
            contextStore.setShowSpinner(false)
            return;
        }
        if(contextStore.store._id){
            if(contextStore.store._id.toString() === storeId.toString()){
                contextStore.setShowSpinner(false)
              return setContextStore({...contextStore, stores, store: {}})
            }
        }
        setContextStore({ ...contextStore, stores });
        contextStore.setShowSpinner(false)
    };
    const onClickSelectStore = async (store) => {
        contextStore.setShowSpinner(true)
        if (contextStore.connection) {
            await contextStore.connection.close();
        }
        const { connection, channel } = await amqp();
        // channel.basicConsume(`notifications${store._id}`, (msg) => {
        //   channel.ack(msg)
        // setContextStore(prev => ({
        //   ...prev,
        //   storeNotifications: [...contextStore.storeNotifications, {...JSON.parse(msg)}]
        // }))
        // })
        channel.basicConsume(
            `notifications${store._id}`,
            { noAck: false },
            async (msg) => {
                contextStore.setShowSpinner(true)
                const storeNotifications = await dispatch(
                    actions.getStoreNotifications,
                    { storeId: store._id }
                );
                console.log(storeNotifications);
                setContextStore((prev) => ({
                    ...prev,
                    storeNotifications,
                }));
                msg.ack();
                contextStore.setShowSpinner(false)
            }
        );
        channel.basicConsume(
            `errors${store._id}`,
            { noAck: false },
            async (msg) => {
                contextStore.setShowSpinner(true)
                const storeErrors = await dispatch(actions.getStoreErrors, {
                    storeId: store._id,
                });
                console.log(storeErrors);
                setContextStore((prev) => ({
                    ...prev,
                    storeErrors,
                }));
                msg.ack();
                contextStore.setShowSpinner(false)
            }
        );
        channel.basicConsume(
            `processes${store._id}`,
            { noAck: false },
            async (msg) => {
                contextStore.setShowSpinner(true)
                const storeProcesses = await dispatch(
                    actions.getStoreProcesses,
                    { storeId: store._id }
                );
                setContextStore((prev) => ({
                    ...prev,
                    storeProcesses,
                }));
                msg.ack();
                contextStore.setShowSpinner(false)
            }
        );
        const { storeProcesses, storeErrors, storeNotifications } =
            await onSelectStoreDataFetch(store);
        setContextStore((prev) => ({
            ...prev,
            store,
            channel,
            connection,
            storeProcesses,
            storeErrors,
            storeNotifications,
        }));
        contextStore.setShowSpinner(false)
    };
    const onSelectStoreDataFetch = async (store) => {
        const storeProcesses = await dispatch(actions.getStoreProcesses, {
            storeId: store._id,
        });
        const storeErrors = await dispatch(actions.getStoreErrors, {
            storeId: store._id,
        });
        const storeNotifications = await dispatch(
            actions.getStoreNotifications,
            { storeId: store._id }
        );
        return { storeProcesses, storeErrors, storeNotifications };
    };
    useEffect(() => {
        (async () => {
            const stores = await dispatch(actions.getStores);
            console.log(stores);
            if (stores.error) {
                return;
            }
            setContextStore({ ...contextStore, stores });
        })();
    }, []);
    useEffect(() => {
        console.log("hi");
        let count = 0;
        contextStore.storeNotifications.map((storeNotification) => {
            if (!storeNotification.viewStatus) {
                count = count + 1;
            }
            setNotificationCount(count);
        });
    }, [contextStore.storeNotifications]);
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
                            <NavDropdown
                                title="Available Shops"
                                id="basic-nav-dropdown"
                            >
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
                                    <Button
                                        variant="primary"
                                        onClick={handleShopShow}
                                    >
                                        Add a Store
                                    </Button>
                                    <Modal
                                        show={addShop}
                                        onHide={handleShopClose}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>
                                                Add a Store
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <InputGroup
                                                size="sm"
                                                className="mb-3"
                                            >
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
                                            <InputGroup
                                                size="sm"
                                                className="mb-3"
                                            >
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
                                            <InputGroup
                                                size="sm"
                                                className="mb-3"
                                            >
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
                                            <Button
                                                variant="success"
                                                onClick={onSubmitForm}
                                            >
                                                Add
                                            </Button>
                                            <Button
                                                variant="warning"
                                                onClick={handleShopClose}
                                            >
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
                            
                            <Button style={{marginLeft: 10}} disabled = {!contextStore.store._id} onClick = {onClickClearNotification}>Clear</Button>
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
                                    {contextStore.storeNotifications.map(
                                        (storeNotification) => (
                                            <tr>
                                                <td>
                                                    {storeNotification.message}
                                                </td>
                                                <td>
                                                    {getDate(storeNotification.time)}
                                                </td>
                                            </tr>
                                        )
                                    )}
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
