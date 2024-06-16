import React, { useContext } from 'react';
import { Route, Link, useHistory } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { MyDispatchContext, MyUserContext } from '../config/Contexts';

const Menu = () => {
    const history = useHistory();
    const userLogin = useContext(MyUserContext);
    const dispatch = useContext(MyDispatchContext);

    const menus = [
        {
            name: 'Đăng Nhập',
            to: '/login',
            exact: false
        },
        {
            name: 'Đăng ký',
            to: '/selectrole',
            exact: false
        }
    ];

    const handleLogout = () => {
        dispatch({ type: 'logout' });
        history.push('/');
    };

    const MenuLink = ({ label, to, activeOnlyWhenExact, onClick }) => {
        return (
            <Route
                path={to}
                exact={activeOnlyWhenExact}
                children={({ match }) => {
                    const active = match ? 'active bg-pink' : '';
                    const loginStatus = (userLogin && (to === '/login' || to === '/selectrole')) ? 'hidden' : '';

                    return (
                        <Nav.Item as="li" className={`my-li align-items-center d-grid ${active} ${loginStatus}`}>
                            <Nav.Link as={Link} to={to} className="text-pink" onClick={onClick}>
                                {label}
                            </Nav.Link>
                        </Nav.Item>
                    );
                }}
            />
        );
    };

    const showMenus = (menus) => {
        if (userLogin) {
            if (userLogin.role === 'ROLE_TENANT') {
                menus.push({
                    name: 'Trang chủ',
                    to: '/',
                    exact: false
                });
                menus.push({
                    name: 'Đăng tìm trọ',
                    to: '/postfindroom',
                    exact: false
                });
                menus.push({
                    name: 'Cá Nhân',
                    to: '/host',
                    exact: false
                });
                menus.push({
                    name: 'Đăng xuất',
                    to: '#',
                    exact: false,
                    onClick: handleLogout
                });
            } else if (userLogin.role === 'ROLE_LANDLORD') {
                menus.push({
                    name: 'Trang chủ',
                    to: '/home',
                    exact: false
                });
                menus.push({
                    name: 'Đăng tin',
                    to: '/postStatus',
                    exact: false
                });

                menus.push({
                    name: 'Cá Nhân',
                    to: '/host',
                    exact: false
                });
                menus.push({
                    name: 'Đăng xuất',
                    to: '#',
                    exact: false,
                    onClick: handleLogout
                });
            }
        }


        return menus.map((menu, index) => (
            <MenuLink
                key={index}
                label={menu.name}
                to={menu.to}
                activeOnlyWhenExact={menu.exact}
                onClick={menu.onClick}
            />
        ));
    };

    return (
        <div className="bg-light shadow">
            <Nav defaultActiveKey="/home" as="ul" className="container justify-content-between">
                <div className="logo">
                    <a href="/"><img src="/NTVN-logo.png" width="70" className="p-2" alt="Logo" /></a>
                </div>
                <div className="d-flex">
                    {showMenus(menus)}
                </div>
            </Nav>
        </div>
    );
};

export default Menu;


