import React, { useContext, useEffect, useState } from "react";
import "./ErrorLog.css";
import { Button, Form, Table } from "react-bootstrap";
import ContextStore from "../Context/ContextStore";
import dispatch from "../dispatch/dispatch";
import actions from "../dispatch/actions";
import getDate from "../getDate";

const ErrorLog = ({ data }) => {
    const {contextStore, setContextStore} = useContext(ContextStore)
    const [storeErrors, setStoreErrors] = useState([])

    const onClickClearError  = async () => {
        contextStore.setShowSpinner(true)
        const response = await dispatch(actions.clearError, {storeId: contextStore.store._id})
        console.log(response)
        contextStore.setShowSpinner(false)
    }
    useEffect(() => {
        setStoreErrors(contextStore.storeErrors)
    },[contextStore.storeErrors])
    const handleSearchChange = (e) => {
        setStoreErrors(contextStore.storeErrors.filter(storeError => 
            storeError.message.toLowerCase().includes(e.target.value.toLowerCase())
            ))
    }
    return (
        <div className="error__log">
            <h1>Error Log</h1>
            <Button disabled = {!contextStore.store._id} onClick = {onClickClearError}>Clear</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Message   
                            <Form.Control 
                             className="SKU__search"
                             size="sm"
                             type="text"
                             placeholder="Type"
                             onChange={handleSearchChange}
                            />
                        </th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {storeErrors.map((error) => (
                        <tr>
                            <td>{error.message}</td>
                            <td>{getDate(error.time)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ErrorLog;
