import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./BotTable.css";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ContextStore from "../Context/ContextStore";
import dispatch from "../dispatch/dispatch";
import actions from "../dispatch/actions";
import axios from "axios";

const BotTable = () => {
    const {contextStore, setContextStore} = useContext(ContextStore);
    const [storeProcesses, setStoreProcesses] = useState([])
    const [selectedProcesses, setSelectedProcesses] = useState([])
    const [columnValues, setColumnValues] = useState({
        stringColumn: "",
        numberColumn: 0
    })
    const onClickCheckBox = (value, process) => {
        console.log(value)
        if (value){
            let vProcesses = [...selectedProcesses]
            vProcesses.push(process)
            setSelectedProcesses(vProcesses)
            setStoreProcesses(storeProcesses.map(storeProcess => {
                if(storeProcess._id.toString() === process._id.toString()){
                    storeProcess.checked = true
                    return storeProcess
                }
                else return storeProcess
            }))
        }
        else{
            console.log("Hi from unselect")
            setSelectedProcesses(selectedProcesses.filter(vProcess => vProcess._id.toString() !== process._id.toString()))
            setStoreProcesses(storeProcesses.map(storeProcess => {
                if(storeProcess._id.toString() === process._id.toString()){
                    storeProcess.checked = false
                    return storeProcess
                }
                else return storeProcess
            }))
        }
    }
    const onClickXmark = async (processId) => {
        contextStore.setShowSpinner(true)
        await dispatch(actions.stopStoreProcess, {id: processId})
        contextStore.setShowSpinner(false)
    }
    const onClickDeleteMark = async (processId) => {
        contextStore.setShowSpinner(true)
        await dispatch(actions.deleteStoreProcess, {id: processId})
        contextStore.setShowSpinner(false)
    }
    const onClickProductDetailsLink = (storeProcess) => {
        setContextStore(prev => ({
            ...prev,
            storeProcess
        }))
    }
    const onClickCheckMark = async (storeProcess) => {
        contextStore.setShowSpinner(true)
        await dispatch(actions.restartStoreProcess, {id: storeProcess._id})
        contextStore.setShowSpinner(false)
    }
    const onClickProcessUpdateButtons = async (e) => {
        contextStore.setShowSpinner(true)
        let response
        switch(e.target.name){
            case "restart":
                response = await dispatch(actions.batchRestartProcesses, {}, {processes: selectedProcesses})
                break
            case "stop":
                response = await dispatch(actions.batchStopProcesses, {}, {processes: selectedProcesses})
                break
            case "delete":
                response = await dispatch(actions.batchDeleteProcesses, {}, {processes: selectedProcesses})
                break
        }
        console.log(response)
        contextStore.setShowSpinner(false)

    }
    const sortProcesses = (parameterName, sortType) => {
        console.log(parameterName, sortType)
        let vStoreProcesses = [...storeProcesses]
        switch (sortType){
            case "ascending":
                vStoreProcesses.sort((a ,b) => a[parameterName] - b[parameterName])
                break;
            case "descending":
                vStoreProcesses.sort((a, b) => b[parameterName] - a[parameterName])
        }
        setStoreProcesses(vStoreProcesses)
    }
    const onClickEditProcess = (vStoreProcess) => {
        if(!columnValues.stringColumn && !columnValues.numberColumn){
            setStoreProcesses(storeProcesses.map(storeProcess => {
                if(storeProcess._id === vStoreProcess._id){
                    storeProcess.edit = true
                }
                return storeProcess
            }))
            setColumnValues({
                stringColumn : vStoreProcess.stringColumn,
                numberColumn : vStoreProcess.numberColumn 
            })
        }
    }
    const onClickCancelEditProcess = (vStoreProcess) => {
        setStoreProcesses(storeProcesses.map(storeProcess => {
            if(storeProcess._id === vStoreProcess._id){
                storeProcess.edit = false
            }
            return storeProcess
        }))
        setColumnValues({
            stringColumn: "",
            numberColumn: 0
        })
    }
    const handleSearchChange = (e) => {
        setStoreProcesses(
            contextStore.storeProcesses.filter((storeProcess) =>
                storeProcess[e.target.name].toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };
    const onChangeColumnValues = (e) => {
        setColumnValues({...columnValues, [e.target.name]: e.target.value})
    }
    const onClickSaveProcess = async(id) => {
        contextStore.setShowSpinner(true)
        const response = await dispatch(actions.updateProcess, {id}, {...columnValues})
        console.log(response)
        setColumnValues({
            stringColumn: "",
            numberColumn: 0
        })
        contextStore.setShowSpinner(false)
    }
    useEffect(() => {
        setStoreProcesses(contextStore.storeProcesses.map(storeProcess => {
            storeProcess.checked = false
            storeProcess.edit = false
            return storeProcess
        }))
        setSelectedProcesses([])
    },[contextStore.storeProcesses])
  
    return (
        <div>
            {console.log(storeProcesses)}
            <h1>Bot Table</h1>
            <Button variant="danger" style={{margin: 5}} disabled = {!(selectedProcesses.length > 0)} name = "stop" onClick={onClickProcessUpdateButtons}>Stop</Button>
            <Button variant="success"  style={{margin: 5}} disabled = {!(selectedProcesses.length > 0)} name = "restart" onClick={onClickProcessUpdateButtons}>Restart</Button>
            <Button variant="warning"  style={{margin: 5}} disabled = {!(selectedProcesses.length > 0)} name = "delete" onClick={onClickProcessUpdateButtons}>Delete</Button>
            <div className="info__table">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                Select
                            </th>
                            <th>
                                SKU{" "}
                                <Form.Control
                                    className="SKU__search"
                                    size="sm"
                                    type="text"
                                    placeholder="SKU"
                                    name = "sku"
                                    onChange={handleSearchChange}
                                />
                            </th>
                            <th>Time Interval In Minutes</th>
                            <th>Price Interval
                            <Form.Select
                                    size="sm"
                                    aria-label="Default select example"
                                    className="sort__option"
                                    onChange = {(e) => {sortProcesses("priceInterval", e.target.value)}}
                                >
                                    <option>sort</option>
                                    <option value="ascending" onSelect={() => {sortProcesses("priceInterval", "ascending")}}>Ascending</option>
                                    <option value="descending" onSelect={() => {sortProcesses("priceInterval", "descending")}}>Descending</option>
                                </Form.Select>
                            </th>
                            <th>Lower Bound
                            <Form.Select
                                    size="sm"
                                    aria-label="Default select example"
                                    className="sort__option"
                                    onChange = {(e) => {sortProcesses("lowerBound", e.target.value)}}
                                >
                                    <option>sort</option>
                                    <option value="ascending" onSelect={() => {sortProcesses("lowerBound", "ascending")}}>Ascending</option>
                                    <option value="descending" onSelect={() => {sortProcesses("lowerBound", "descending")}}>Descending</option>
                                </Form.Select>
                            </th>
                            <th>
                                URL
                            </th>
                            <th>
                                Stock Available
                                <Form.Select
                                    size="sm"
                                    aria-label="Default select example"
                                    className="sort__option"
                                    onChange = {(e) => {sortProcesses("available", e.target.value)}}
                                >
                                    <option>sort</option>
                                    <option value="ascending" onSelect={() => {sortProcesses("available", "ascending")}}>Ascending</option>
                                    <option value="descending" onSelect={() => {sortProcesses("available", "descending")}}>Descending</option>
                                </Form.Select>
                            </th>
                            <th>
                                Current Price
                                <Form.Select
                                    size="sm"
                                    aria-label="Default select example"
                                    className="sort__option"
                                    onChange = {(e) => {sortProcesses("currentPrice", e.target.value)}}
                                >
                                    <option>sort</option>
                                    <option value="ascending" onSelect={() => {sortProcesses("currentPrice", "ascending")}}>Ascending</option>
                                    <option value="descending" onSelect={() => {sortProcesses("currentPrice", "descending")}}>Descending</option>
                                </Form.Select>
                            </th>
                            <th>
                                String Column
                                <Form.Control
                                    className="SKU__search"
                                    size="sm"
                                    type="text"
                                    placeholder="Type"
                                    name = "stringColumn"
                                    onChange={handleSearchChange}
                                />
                            </th>
                            <th>
                                Number Column
                                <Form.Select
                                    size="sm"
                                    aria-label="Default select example"
                                    className="sort__option"
                                    onChange = {(e) => {sortProcesses("numberColumn", e.target.value)}}
                                >
                                    <option>sort</option>
                                    <option value="ascending" onSelect={() => {sortProcesses("numberColumn", "ascending")}} >Ascending</option>
                                    <option value="descending" onSelect={() => {sortProcesses("numberColumn", "descending")}}>Descending</option>
                                </Form.Select>
                            </th>
                            <th>Edit</th>
                            <th>
                                Active Status
                                <Form.Select
                                    size="sm"
                                    aria-label="Default select example"
                                    className="sort__option"
                                    onChange = {(e) => {sortProcesses("active", e.target.value)}}
                                >
                                    <option>sort</option>
                                    <option value="ascending" onSelect={() => {sortProcesses("active", "ascending")}}>Ascending</option>
                                    <option value="descending" onSelect={() => {sortProcesses("active", "descending")}}>Descending</option>
                                </Form.Select>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storeProcesses.map((storeProcess, index) => (
                            <tr>
                                <td>
                                    <Form.Check type="checkbox" value={storeProcess.checked} checked={storeProcess.checked} onClick={(e) => {onClickCheckBox(e.target.checked, storeProcess)}}/>
                                </td>
                                <td>
                                    <Link to="product-details" onClick={() => {onClickProductDetailsLink(storeProcess)}}>{storeProcess.sku}</Link>
                                </td>
                                <td>{parseInt(storeProcess.timeInterval)/60000}</td>
                                <td>{storeProcess.priceInterval}</td>
                                <td>{storeProcess.lowerBound}</td>
                                <td><a href={storeProcess.url}>URL</a></td>
                                <td>{storeProcess.available}</td>
                                <td>{storeProcess.currentPrice}</td>
                                
                                {!storeProcess.edit && <td><div>{storeProcess.stringColumn}</div></td>}
                                {storeProcess.edit && <td><input type={"text"} value = {columnValues.stringColumn} name = "stringColumn" onChange={onChangeColumnValues}/></td>}
                                {!storeProcess.edit && <td><div>{storeProcess.numberColumn}</div></td>}
                                {storeProcess.edit && <td><input type={"number"} value = {columnValues.numberColumn} name = "numberColumn" onChange={onChangeColumnValues}/></td>}
                                {storeProcess.edit && <td> <Button style={{padding: 0, paddingLeft: 2, paddingRight: 2}} variant = "success" onClick={() => {onClickSaveProcess(storeProcess._id)}}>Save</Button> <Button style={{padding: 0, paddingLeft: 2, paddingRight: 2}} variant = "danger" onClick={() => {onClickCancelEditProcess(storeProcess)}}>Cancel</Button></td>}
                                {!storeProcess.edit && <td><Button style={{padding: 0, paddingLeft: 2, paddingRight: 2}} onClick={() => {onClickEditProcess(storeProcess)}}>Edit</Button></td>} 
                                <td>
                                    {storeProcess.active && <i className="fa-solid fa-circle active"></i>}
                                    {!storeProcess.active && <i className="fa-solid fa-circle inactive"></i>}
                                </td>
                                <td>
                                    {!storeProcess.active && <i className="fa-solid fa-circle-check" onClick = {() => {onClickCheckMark(storeProcess)}}></i>}
                                    {storeProcess.active && <i className="fa-solid fa-circle-xmark" onClick={() => {onClickXmark(storeProcess._id)}}></i>}
                                    <i class="fa-solid fa-trash" onClick={() => {onClickDeleteMark(storeProcess._id)}}></i>
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
