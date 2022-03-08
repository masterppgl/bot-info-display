import React from "react";
import Table from "react-bootstrap/Table";
import "./BotTable.css";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const BotTable = () => {
  return (
    <div>
      <h1>Bot Table</h1>
      <div className="info__table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                SKU{" "}
                <Form.Control
                  className="SKU__search"
                  size="sm"
                  type="text"
                  placeholder="SKU"
                />
              </th>
              <th>Time Interval</th>
              <th>Price Interval</th>
              <th>Lower Bound</th>
              <th>
                Active Status
                <Form.Select
                  size="sm"
                  aria-label="Default select example"
                  className="sort__option"
                >
                  <option>sort</option>
                  <option value="1">Ascending</option>
                  <option value="2">Descending</option>
                </Form.Select>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to="product-details">32123121</Link>
              </td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>
                <i class="fa-solid fa-circle active"></i>
                <i class="fa-solid fa-circle inactive"></i>
              </td>
              <td>
                <i class="fa-solid fa-circle-check"></i>
                <i class="fa-solid fa-circle-xmark"></i>
                <i class="fa-solid fa-trash"></i>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default BotTable;
