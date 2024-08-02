import React, { useEffect, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { authApi, endpoints } from "../../../../config/APIs";
import axios from "axios";


const PostFindRoom = () => {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [isLoading, setIsLoading] = useState(false)
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
        label: "Số lượng người ở",
        type: "int",
        field: "maxoccupants"
    },
    {
        label: "Diện tích",
        type: "int",
        field: "area"
    },
    {
        label: "Giá tiền tối thiểu",
        type: "int",
        field: "minPrice"
    },
    {
        label: "Giá tiền tối đa",
        type: "int",
        field: "maxPrice"
    },
    {
        label: "Phạm vi",
        type: "int",
        field: "scope"
    },

    ]
    const [user, setUser] = useState({
        title: "",
        scope: "",
        maxPrice: "",
        minPrice: "",
        maxPrice: "",
        maxoccupants: "",
        content: ""


    });
    const [post, setPost] = useState({});
    const image = useRef();

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [address, setAddress] = useState('');
    const [street, setStreet] = useState('');


    useEffect(() => {
        // Fetch provinces
        axios.get('https://vapi.vnappmob.com/api/province/')
            .then(response => setProvinces(response.data.results))
            .catch(error => console.error('Error fetching provinces:', error));
    }, []);

    useEffect(() => {
        // Fetch districts based on selected province
        if (selectedProvince) {
            axios.get(`https://vapi.vnappmob.com/api/province/district/${selectedProvince}`)
                .then(response => {
                    setDistricts(response.data.results);
                    setWards([]);
                    setSelectedDistrict('');
                    setSelectedWard('');
                })
                .catch(error => console.error('Error fetching districts:', error));
        }
    }, [selectedProvince]);

    useEffect(() => {
        // Fetch wards based on selected district
        if (selectedDistrict) {
            axios.get(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrict}`)
                .then(response => setWards(response.data.results))
                .catch(error => console.error('Error fetching wards:', error));
        }
    }, [selectedDistrict]);

    useEffect(() => {
        // Update full address
        const province = provinces.find(p => p.province_id === selectedProvince)?.province_name || '';
        const district = districts.find(d => d.district_id === selectedDistrict)?.district_name || '';
        const ward = wards.find(w => w.ward_id === selectedWard)?.ward_name || '';

        const addressArray = [street, ward, district, province].filter(Boolean);
        setAddress(addressArray.join(', '));
    }, [selectedProvince, selectedDistrict, selectedWard, street]);



    const change = (e, field) => {
        setUser(current => {
            return { ...current, [field]: e.target.value }
        })
    }
    const addPost = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json', {
                params: {
                    access_token: 'pk.eyJ1IjoidGhhb2RvYW4yMDAyIiwiYSI6ImNseGlwaXlwejFmdzgyanIyd2Q2dG8wYXAifQ.FBkm_UbA0EhR6nJsC_kxpg'
                }
            });

            // Log response data for debugging
            console.log('Response data:', response.data);

            let locations = null;

            if (response.data.features && response.data.features.length > 0) {
                locations = response.data.features[0].geometry.coordinates;
                console.log('Geocoded coordinates:', locations);
            } else {
                console.error('No location found for the address:', address);
                return; // Exit function if no location found
            }
            console.log(locations[0]);
            console.log(locations[1]);
            let form = new FormData();
            for (let key in user)
                if (!user[key]) {
                    setErrorMessage("Vui lòng nhập đầy đủ thông tin");
                    setAlertStatus(true);
                    setAlertType("error");
                    setIsLoading(false);
                    return;
                } else {
                    form.append(key, user[key])
                }



            form.append('address', address); // Corrected 'adress' to 'address' typo
            form.append('longitude', locations[0]);
            form.append('latitude', locations[1]);

            try {
                // Replace with your backend API endpoint
                const res = await authApi().post(endpoints.tenantPostCreate, form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('Post added:', res.data);
                history.push('/');
            } catch (ex) {
                console.error('Error adding post:', ex);
            }
        } catch (error) {
            console.error('Error geocoding address:', error);
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

                <Form.Group controlId="formStreet">
                    <Form.Label className="float-left">Đường:</Form.Label>
                    <Form.Control
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formProvince">
                    <Form.Label className="float-left">Tỉnh thành:</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.target.value)}
                        required
                    >
                        <option value="">Chọn tỉnh thành</option>
                        {provinces.map(province => (
                            <option key={province.province_id} value={province.province_id}>
                                {province.province_name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formDistrict">
                    <Form.Label className="float-left">Quận huyện:</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        required
                    >
                        <option value="">Chọn quận huyện</option>
                        {districts.map(district => (
                            <option key={district.district_id} value={district.district_id}>
                                {district.district_name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formWard">
                    <Form.Label column sm={2}>Xã phường:</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedWard}
                        onChange={(e) => setSelectedWard(e.target.value)}
                        required
                    >
                        <option value="">Chọn xã phường</option>
                        {wards.map(ward => (
                            <option key={ward.ward_id} value={ward.ward_id}>
                                {ward.ward_name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formAddress">
                    <Form.Label column sm={2}>Địa chỉ:</Form.Label>
                    <Form.Control type="text" value={address} readOnly />
                </Form.Group>
                <Button type="submit" className="mt-3 mb-2 btn btn-default text-white d-flex" variant="primary">
                    Đăng tin
                </Button>

            </Form>
        </div>

    );
}

export default PostFindRoom;