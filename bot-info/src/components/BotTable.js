import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import "./BotTable.css";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ContextStore from "../Context/ContextStore";

const BotTable = () => {
    const {contextStore, setContextStore} = useContext(ContextStore);
    const onClickXmark = (processId) => {
        contextStore.socket.emit("stopProcess", {processId})
    }
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
                        {contextStore.storeProcesses.map((storeProcess) => (
                            <tr>
                                <td>
                                    <Link to="product-details">{storeProcess.sku}</Link>
                                </td>
                                <td>{storeProcess.timeInterval}</td>
                                <td>{storeProcess.priceInterval}</td>
                                <td>{storeProcess.lowerBound}</td>
                                <td>
                                    {storeProcess.active && <i className="fa-solid fa-circle active"></i>}
                                    {!storeProcess.active && <i className="fa-solid fa-circle inactive"></i>}
                                </td>
                                <td>
                                    {!storeProcess.active && <i className="fa-solid fa-circle-check"></i>}
                                    {storeProcess.active && <i className="fa-solid fa-circle-xmark" onClick={() => {onClickXmark(storeProcess._id)}}></i>}
                                    <i class="fa-solid fa-trash"></i>
                                </td>
                            </tr>
                        ))}
                        {/* <tr>
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
            </tr> */}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default BotTable;
