import React, { useState, useRef, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from "../common/alert";
import APIs, { endpoints } from "../../config/APIs";
import { getCities, getDistricts, getWards } from "../../config/APIAdress";

const RegisterLandlord = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');
    const history = useHistory();
    const [user, setUser] = useState({ role: 'landlord' });
    const [cities, setCities] = useState(null);
    const [districts, setDistricts] = useState(null);
    const [wards, setWards] = useState(null);
    const [selectedCity, setSelectedCity] = useState({ id: 0, value: null });
    const [selectedDistrict, setSelectedDistrict] = useState({ id: 0, value: null });
    const [selectedWard, setSelectedWard] = useState({ id: 0, value: null });
    // const GHN_TOKEN = 'b08e0769-130e-11ec-b8c6-fade198b4859';

    const avatar = useRef();
    const imageRow = useRef();
    const imageRoom = useRef();

    const fields = [
        { label: "Tên người dùng", type: "text", field: "username" },
        { label: "Mật khẩu", type: "password", field: "password" },
        { label: "Xác nhận mật khẩu", type: "password", field: "confirm" },
        { label: "Email", type: "email", field: "email" },
        { label: "Họ tên", type: "text", field: "full_name" },
        { label: "Số điện thoại", type: "text", field: "phone_number" },
        { label: "Địa chỉ", type: "text", field: "street" }
    ];

    const change = (e, field) => {
        setUser(current => {
            return { ...current, [field]: e.target.value }
        })
    }

    const register = async (e) => {
        e.preventDefault();
        let form = new FormData();
        for (let key in user) {
            if (key !== 'confirm') {
                if (key === 'street')
                    form.append(key, `${user[key]},${selectedWard.value}, ${selectedDistrict.value},Thành phố ${selectedCity.value}`)
                form.append(key, user[key]);
            }
        }
        if (avatar.current.files[0]) {
            form.append('file', avatar.current.files[0]);
        }
        if (imageRow.current.files.length > 0) {
            Array.from(imageRow.current.files).forEach(file => {
                form.append('imageRow', file);
            });
        }
        if (imageRoom.current.files.length > 0) {
            Array.from(imageRoom.current.files).forEach(file => {
                form.append('imageRoom', file);
            });
        }
        try {
            let res = await APIs.post(endpoints['landlord_register'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status === 201) {
                setErrorMessage("Đăng kí thành công!");
                setAlertStatus(true);
                setAlertType("success");
                history.push("/login");
            } else {
                setErrorMessage("Đã có lỗi xảy ra");
                setAlertStatus(true);
                setAlertType("error");
            }
        } catch (ex) {
            console.error(ex);
            setErrorMessage("Đã có lỗi xảy ra");
            setAlertStatus(true);
            setAlertType("error");
        }
    }
    useEffect(() => {
        const fetchCities = async () => {
            const citiesData = await getCities();
            setCities(citiesData);
        };
        fetchCities();
    }, []);

    useEffect(() => {
        if (selectedCity.id) {
            const fetchDistricts = async () => {
                const districtsData = await getDistricts(selectedCity.id);
                setDistricts(districtsData);
            };
            fetchDistricts();
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedDistrict.id) {
            const fetchWards = async () => {
                const wardsData = await getWards(selectedDistrict.id);
                setWards(wardsData);
            };
            fetchWards();
        }
    }, [selectedDistrict]);


    const handleSelectCity = (value) => {
        var valueSplitted = value.split(',');
        setSelectedCity({
            id: valueSplitted[0],
            value: valueSplitted[1]
        });
        setWards([]);
    };
    const handleSelectDistrict = (value) => {
        var valueSplitted = value.split(',');
        setSelectedDistrict({
            id: valueSplitted[0],
            value: valueSplitted[1]
        });
    };

    const handleSelectWard = (value) => {
        var valueSplitted = value.split(',');
        setSelectedWard({
            id: valueSplitted[0],
            value: valueSplitted[1]
        });
    };


    return (
        <div className="Login">
            <Form onSubmit={register} className="mt-5">
                <div className="form-title">
                    <h2>Đăng Kí</h2>
                </div>

                {fields.map(f => (
                    <Form.Group key={f.field} className="mb-3" controlId={f.field}>
                        <Form.Label className="float-left">{f.label}</Form.Label>
                        <Form.Control onChange={e => change(e, f.field)} value={user[f.field]} type={f.type} placeholder={f.label} />
                    </Form.Group>
                ))}

                <Form.Group className="mb-3" controlId="avatar">
                    <Form.Label className="float-left">Chọn ảnh đại diện</Form.Label>
                    <Form.Control type="file" accept=".png,.jpg,.jpeg" ref={avatar} />
                </Form.Group>
                <div className="mt-3">
                    <select className="form-control search-slt" id="province" onChange={(e) => handleSelectCity(e.target.value)}>
                        <option value="">Chọn tỉnh thành</option>
                        {cities === null ? (
                            <Spinner animation="border" />
                        ) : (cities.map(c => (
                            <option key={c.ProvinceID} value={`${c.ProvinceID},${c.ProvinceName}`}>
                                {c.ProvinceName}
                            </option>
                        )))}

                    </select>
                </div>
                <div className="mt-3">
                    <select className="form-control search-slt" id="province" onChange={(e) => handleSelectDistrict(e.target.value)}>
                        <option value="">Chọn quận huyện</option>
                        {districts === null ? (
                            <Spinner animation="border" />
                        ) : (districts.map(c => (
                            <option key={c.DistrictID} value={`${c.DistrictID},${c.DistrictName}`}>
                                {c.DistrictName}
                            </option>
                        )))}

                    </select>
                </div>
                <div className="mt-3">
                    <select className="form-control search-slt" id="province" onChange={(e) => handleSelectWard(e.target.value)}>
                        <option value="">Chọn quận huyện</option>
                        {wards === null ? (
                            <Spinner animation="border" />
                        ) : (wards.map(c => (
                            <option key={c.WardCode} value={`${c.WardCode},${c.WardName}`}>
                                {c.WardName}
                            </option>
                        )))}

                    </select>
                </div>

                <Form.Group className="mb-3" controlId="imageRow">
                    <Form.Label className="float-left">Chọn ảnh dãy trọ</Form.Label>
                    <Form.Control type="file" accept=".png,.jpg,.jpeg" ref={imageRow} multiple />
                </Form.Group>
                <Form.Group className="mb-3" controlId="imageRoom">
                    <Form.Label className="float-left">Chọn ảnh phòng trọ</Form.Label>
                    <Form.Control type="file" accept=".png,.jpg,.jpeg" ref={imageRoom} multiple />
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
