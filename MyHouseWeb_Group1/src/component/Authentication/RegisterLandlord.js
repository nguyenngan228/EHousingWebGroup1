import React, { Component, useState, useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from "../common/alert";
import APIs, { endpoints } from "../../config/APIs";

const RegisterLandlord=()=> {

    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');


    const fields = [{
        label: "Tên người dùng",
        type: "text",
        field: "username"
    }, {
        label: "Mật khẩu",
        type: "password",
        field: "password"
    }, {
        label: "Xác nhận mật khẩu",
        type: "password",
        field: "confirm"
    }, {
        label: "Email",
        type: "email",
        field: "email"
    }]

    const history = useHistory()
    const [user, setUser] = useState({role: 'landlord'});
    const avatar = useRef();


    const change = (e, field) => {
        setUser(current => {
            return { ...current, [field]: e.target.value }
        })
    }

    const register = async (e) => {
        e.preventDefault();
        let form = new FormData();
        for (let key in user)
            // if(key === " "){
            //     setErrorMessage("Vui lòng nhập đầy đủ thông tin")
            //     setAlertStatus(true)
            //     setAlertType("error")
            // } else 
            if (key !== 'confirm')
                form.append(key, user[key])
        if (avatar)
            form.append('file', avatar.current.files[0])
        try {
            let res = await APIs.post(endpoints['register'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status === 201) {
                history.push("/login")
                setErrorMessage("Đăng kí thành công!")
                setAlertStatus(true)
                setAlertType("success")
            } else {
                setErrorMessage("Đã có lỗi xảy ra")
                setAlertStatus(true)
                setAlertType("error")
            }


        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <div className="Login">
            <Form onSubmit={register} className="mt-5">
                <div className="form-title">
                    <h2>Đăng Kí</h2>
                </div>

                {fields.map(f => <Form.Group key={f.field} className="mb-3" controlId={f.field}>
                    <Form.Label className="float-left">{f.label}</Form.Label>
                    <Form.Control onChange={e => change(e, f.field)} value={user[f.field]} type={f.type} placeholder={f.label} />
                </Form.Group>)}

                <Form.Group className="mb-3" controlId="avatar">
                    <Form.Label className="float-left">Chọn ảnh đại diện</Form.Label>
                    <Form.Control type="file" accept=".png,.jpg,.jpeg" ref={avatar} />
                </Form.Group>
                <Button type="submit" className="mt-3 btn btn-default text-white" variant="primary">
                    Đăng kí
                </Button>
            </Form>

            <Alert
                status={alertStatus}   // true or false
                type={alertType}   // success, warning, error, info
                title={errorMessage}   // title you want to display
                setIsAlert={setAlertStatus}
            />
        </div>
    );
}

export default RegisterLandlord;