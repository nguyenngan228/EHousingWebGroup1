import React, { useState, useEffect, useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import Alert from "./common/alert"
import 'bootstrap/dist/css/bootstrap.min.css';
import APIs, { authApi, endpoints } from '../config/APIs';
import cookie from 'react-cookies'
import { MyDispatchContext } from '../config/Contexts';
const Login = () => {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [isLoading, setIsLoading] = useState(false)



    // const {code} = params;
    // const location = window.location.pathname;


    // useEffect(() => {
    //     if (localStorage.getItem('user')) {
    //         history.push('/');
    //     }

    //     //activate account
    //     if (location.startsWith('/activate-account')) {
    //         activeAccount();
    //     }
    // }, []);
    // const activeAccount = () => {
    //     if (code) {
    //         let item = {code};
    //         fetch(`https://nhatrovn.herokuapp.com/api/verify/activate-account`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //             },
    //             body: JSON.stringify(item)
    //         }).then(response => {
    //             if (response.ok) {
    //                 return response.json();
    //             }
    //         }).then(data => {
    //             if(typeof (data) !== 'undefined') {
    //                 setErrorMessage("Kích hoạt thành công. Vui lòng đăng nhập lại!")
    //                 setAlertStatus(true)
    //                 setAlertType("success")
    //             } else {
    //                 setErrorMessage("Đường dẫn kích hoạt không đúng hoặc đã tồn tại!")
    //                 setAlertStatus(true)
    //                 setAlertType("error")
    //             }

    //         });
    //     }
    // };

    function HideAlert() {
        setAlertStatus(false)
    }


    // async function login () {
    //     if(email == ""){
    //         setErrorMessage("Vui lòng nhập địa chỉ email")
    //         setAlertStatus(true)
    //         setAlertType("error")
    //     }
    //     else if (password == "") {
    //         setErrorMessage("Vui lòng nhập mật khẩu")
    //         setAlertStatus(true)
    //         setAlertType("error")
    //     } else {

    //     let item = {email, password};
    //     await fetch('https://nhatrovn.herokuapp.com/api/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify(item)
    //     }).then(function (response) {
    //         if (!response.ok) {
    //             throw Error(response.statusText);
    //         }
    //         return response;
    //     }).then(async function (response) {
    //         const result = await response.json();
    //         if (result.status === 0) {
    //             setErrorMessage("Tài Khoản chưa được kích hoạt!\n Vui lòng vào Email kích hoạt")
    //             setAlertStatus(true)
    //             setAlertType("error")
    //         }
    //         else {
    //             localStorage.setItem('user', JSON.stringify(result));
    //             setUserLogin();
    //             console.log(result);
    //             history.push('/');
    //         }
    //     }).catch(function (error) {
    //         setErrorMessage("Sai email hoặc mật khẩu")
    //         setAlertStatus(true)
    //         setAlertType("error")
    //     });
    // }
    // }
    const fields = [{
        label: "Tên người dùng",
        type: "text",
        field: "username"
    }, {
        label: "Mật khẩu",
        type: "password",
        field: "password"
    }]
    const [user, setUser] = useState({});
    const dispatch = useContext(MyDispatchContext);



    const change = (e, field) => {
        setUser(current => {
            return { ...current, [field]: e.target.value }
        })
    }
    const login = async (e) => {
        e.preventDefault();
        try {
            let res = await APIs.post(endpoints['login'], { ...user })
            cookie.save("token", res.data)
            let u = await authApi().get(endpoints['current_user']);
            cookie.save('user', u.data)
            dispatch({
                "type": "login",
                "payload": u.data
            });
            if (u.data.role === 'ROLE_TENANT')
                history.push('/');
            else if (u.data.role === 'ROLE_LANDLORD')
                history.push('/home');
        } catch (ex) {
            setErrorMessage("Tài khoản chưa kích hoạt hoặc không tồn tại");
            setAlertStatus(true);
            setAlertType("error");
            setIsLoading(false)
            return;
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="Login">
            <Form onSubmit={login} className="mt-5">
                <div className="form-title">
                    <h2>Đăng Nhập</h2>
                </div>

                {fields.map(f => <Form.Group key={f.field} className="mb-3" controlId={f.field}>
                    <Form.Label className="float-left">{f.label}</Form.Label>
                    <Form.Control onChange={e => change(e, f.field)} value={user[f.field]} type={f.type} placeholder={f.label} />
                </Form.Group>)}

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Label className="float-right"><a href="/forgot_pass" className="forgot-pass">Quên Mật Khẩu?</a></Form.Label>
                </Form.Group>

                <br />

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check className="float-left" type="checkbox" label="Nhớ mật khẩu" />
                </Form.Group>
                {/* <Button className="mt-3 btn btn-default text-white" onClick={login} variant="primary">
                    Đăng nhập
                </Button> */}
                <Button type="submit" className="mt-3 btn btn-default text-white" variant="primary" disabled={isLoading}>
                    {isLoading ? <Spinner animation="border" /> : "Đăng nhập"}
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
};

export default Login;