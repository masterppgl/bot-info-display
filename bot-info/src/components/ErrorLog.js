import React, { useContext } from "react";
import "./ErrorLog.css";
import { Table } from "react-bootstrap";
import ContextStore from "../Context/ContextStore";

const ErrorLog = ({ data }) => {
    const {contextStore, setContextStore} = useContext(ContextStore)
    return (
        <div className="error__log">
            <h1>Error Log</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Message</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((error) => (
                        <tr>
                            <td>{error.message}</td>
                            <td>{error.time}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ErrorLog;
