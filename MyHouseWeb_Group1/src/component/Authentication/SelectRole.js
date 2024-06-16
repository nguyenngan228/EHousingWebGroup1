import React, { Component, useState, useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SelectRole = () => {
    const history = useHistory()
    const [role,setRole]=useState("")
    const selectRole=(e)=>{
        e.preventDefault();
        setRole(role);
        if(role==1)
            history.push("/registertenant")
        else if(role==2)
            history.push("/registerlandlord")
    }
    return (
        <div className="Login">
            <Form onSubmit={selectRole} className="mt-5">
                <div className="form-title">
                    <h2>Bạn là ?</h2>
                </div>
                <Form.Group className="mb-3 mt-3" controlId="role">
                    <Form.Select aria-label="Vai trò" value={role} onChange={e => setRole(e.target.value)}>
                        <option value="1">Người tìm trọ</option>
                        <option value="2">Người cho thuê</option>
                    </Form.Select>
                </Form.Group>
                <Button type="submit" className="mt-3 btn btn-default text-white" variant="primary">
                    Tiếp tục
                </Button>
            </Form>
        </div>
    );
}
export default SelectRole;
