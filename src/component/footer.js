import React, { Component } from 'react';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterSquare, AiOutlineMail, AiFillPhone } from 'react-icons/ai';

const Footer = (props) => {
    const {userLogin} = props;
    const menus = [
        {
            name: 'Trang Chủ',
            to: '/',
            exact: true
        }
    ];

    if (userLogin) {
        menus.push({
            name: 'Đăng xuất',
            to: '/logout',
            exact: false
        });
    } else {
        menus.push({
            name: 'Đăng Nhập',
            to: '/login',
            exact: false
        });
        menus.push({
            name: 'Đăng ký',
            to: '/register',
            exact: false
        });
    }

    return (
        <div className="container-fluid pb-0 mb-0 justify-content-center text-light bg-dark">
            <footer>
                <div className="row justify-content-center py-5">
                    <div className="col-11">
                        <div className="row ">
                            <div className="col-lg-4 col-12 my-auto mx-auto a">
                                <h3 className="text-muted mb-md-0 mb-5 bold-text">EHouseVN</h3>
                            </div>
                            <div className="col-lg-4 col-12">
                                <h6 className="mb-3 mb-lg-4 bold-text text-muted"><b>MENU</b></h6>
                                <ul className="list-unstyled">
                                    {
                                        menus.map((item, index) => {
                                          return (
                                              <li key={index} className="pb-1"><a href={item.to} className="text-decoration-none text-white">{item.name}</a></li>
                                          )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="col-lg-4 col-12">
                                <h6 className="mb-3 mb-lg-4 text-muted bold-text mt-sm-0 mt-5"><b>ĐỊA CHỈ</b></h6>
                                <p className="mb-1">371 Đường Nguyễn Kiệm, Phường 3</p>
                                <p>Quận Gò Vấp, Thành phố Hồ Chí Minh</p>
                            </div>
                        </div>
                        <div className="row ">
                            <div
                                className="col-lg-4 col-12 my-md-0 mt-5 order-sm-1 order-3 align-self-end">
                                <p className="social text-muted mb-0 pb-0 bold-text">
                                        <span className="mx-2">
                                            <AiFillFacebook/>
                                        </span>
                                    <span className="mx-2">
                                            <AiFillInstagram/>
                                        </span>
                                    <span className="mx-2">
                                            <AiFillTwitterSquare/>
                                        </span>
                                </p>
                                <small className="rights"><span>&#174;</span> Open University Ho Chi Minh
                                </small>
                            </div>
                            <div className="col-lg-4 col-12 order-1 align-self-end ">
                                <h6 className="mt-55 mt-2 text-muted bold-text"><b>HỖ TRỢ</b></h6>
                                <small>
                                    <span><AiOutlineMail/></span> ou@gmail.edu.vn
                                </small>
                            </div>
                            <div className="col-lg-4 col-12 order-2 align-self-end mt-3 ">
                                <h6 className="text-muted bold-text"><b>HOTLINE</b></h6>
                                <small>
                                    <span><AiFillPhone/></span> +89 123 4567 890
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );

};

export default Footer;