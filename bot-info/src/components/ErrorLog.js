import React from "react";
import "./ErrorLog.css";
import { Table } from "react-bootstrap";

const ErrorLog = ({ data }) => {
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
