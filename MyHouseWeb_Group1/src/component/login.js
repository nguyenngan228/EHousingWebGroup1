import React, { useState, useEffect, useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import Alert from "./common/alert"
import 'bootstrap/dist/css/bootstrap.min.css';
import APIs, { authApi, endpoints } from '../config/APIs';
import cookie from 'react-cookies'
import { MyDispatchContext } from '../config/Contexts';
import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import firebase, { auth } from '../firebase/Config';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
const Login = () => {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [isLoading, setIsLoading] = useState(false)



    const HideAlert = () => {
        setAlertStatus(false)
    }

    const fields = [{
        label: "Tên người dùng",
        type: "text",
        field: "username"
    }, {
        label: "Mật khẩu",
        type: "password",
        field: "password"
    }]
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const dispatch = useContext(MyDispatchContext);



    const change = (e, field) => {
        setUser(current => {
            return { ...current, [field]: e.target.value }
        })
    }
    const login = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Kiểm tra xem tất cả các trường trong 'user' có được điền đầy đủ hay không
        for (let key in user) {
            if (!user[key]) {
                setErrorMessage("Vui lòng nhập đầy đủ thông tin");
                setAlertStatus(true);
                setAlertType("error");
                setIsLoading(false);
                return;
            }
        }

        try {
            let res = await APIs.post(endpoints['login'], { ...user });
            cookie.save("token", res.data);
            let u = await authApi().get(endpoints['current_user']);
            cookie.save('user', u.data);
            dispatch({
                type: "login",
                payload: u.data
            });
            if (u.data.role === 'ROLE_TENANT')
                history.push('/');
            else if (u.data.role === 'ROLE_LANDLORD')
                history.push('/home');
        } catch (ex) {
            setErrorMessage("Tài khoản chưa kích hoạt hoặc không tồn tại");
            setAlertStatus(true);
            setAlertType("error");
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };



    const fbProvider = new FacebookAuthProvider();
    const ggProvider = new GoogleAuthProvider();

    const loginWithFB = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, fbProvider);
            console.log(result);

        } catch (ex) {
            console.error(ex)
        }

    }
    const loginWithGG = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, ggProvider);
            console.log(result);
        } catch (ex) {
            console.error(ex)
        }

    }

    auth.onAuthStateChanged((user) => {
        console.log({ user });
    });

    return (
        <div className="Login">
            <Form className="mt-5">
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
                <Button type="submit" onClick={login} className="mt-3 btn btn-default text-white" variant="primary" disabled={isLoading}>
                    {isLoading ? <Spinner animation="border" /> : "Đăng nhập"}
                </Button>
                <Button type="submit" className="mt-3 btn btn-default text-white" variant="primary" >
                    "Đăng nhập với Google"
                </Button>
                <Button type="submit" className="mt-3 btn btn-default text-white" variant="primary" >
                    "Đăng nhập với Facebook"
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