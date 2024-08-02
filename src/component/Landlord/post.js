import React, { Component, useState, useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import APIs, { authApi, endpoints } from "../../config/APIs";

const NewPostRoom = () => {
    const history = useHistory();
    const fields = [{
        label: "Tiêu đề",
        type: "text",
        field: "title"
    }, {
        label: "Nội dung",
        type: "text",
        field: "content"
    },
    {
        label: "Tên phòng",
        type: "text",
        field: "name"
    },
    {
        label: "Địa chỉ phòng",
        type: "text",
        field: "address"
    },
    {
        label: "Số lượng người ở",
        type: "int",
        field: "maxoccupants"
    },
    {
        label: "Giá tiền",
        type: "int",
        field: "price"
    },
    {
        label: "Vĩ độ",
        type: "int",
        field: "latitude"
    },
    {
        label: "Kinh độ",
        type: "int",
        field: "longitude"
    },
    ]
    const [user, setUser] = useState({});
    const image = useRef();



    const change = (e, field) => {
        setUser(current => {
            return { ...current, [field]: e.target.value }
        })
    }
    const addPost = async(e)=>{
        e.preventDefault();
        let form = new FormData();
        for (let key in user)
                form.append(key, user[key])
        if (image)
            form.append('file', image.current.files)
        try {
            let res = await authApi().post(endpoints['tenantPost'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            history.push('/home');
        }catch(ex){
            console.error(ex)
        }
    }

    return (
        <div style={{ paddingLeft: 200, paddingRight: 200, paddingTop: 50 }}>
            <p style={{ fontSize: 50, color: '#f37164', textAlign: "center" }}> <b> Đăng thông tin phòng cho thuê</b></p>
            <Form onSubmit={addPost} className="mt-5">
                {fields.map(f => <Form.Group key={f.field} className="mb-3" controlId={f.field}>
                    <Form.Label className="float-left">{f.label}</Form.Label>
                    <Form.Control onChange={e => change(e, f.field)} value={user[f.field]} type={f.type} placeholder={f.label} />
                </Form.Group>)}
                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Chọn ảnh phòng</Form.Label>
                    <Form.Control type="file" accept=".png,.jpg" ref={image} multiple />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Tỉnh Thành, thành phố</Form.Label>
                    <Form.Select aria-label="Thành phố" onSelect>
                        <option value="1">TP HCM</option>
                        <option value="2">TP BRVT</option>
                        <option value="3">TP Hà Nội</option>
                    </Form.Select>
                </Form.Group> */}

                <Button type="submit" className="mt-3 btn btn-default text-white d-flex" variant="primary">
                    Đăng tin
                </Button>
            </Form>
        </div>

    );
}

export default NewPostRoom;