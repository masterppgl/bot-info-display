import React from "react";
import "./ErrorLog.css";
import { Table } from "react-bootstrap";

const ErrorLog = () => {
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
          <tr>
            <td>154</td>
            <td>10.53</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ErrorLog;
