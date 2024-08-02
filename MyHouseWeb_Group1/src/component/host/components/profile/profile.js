import React, { Component, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './profile.css';
import { MyUserContext } from '../../../../config/Contexts';

function Profile() {

    const history = useHistory();
    const user = useContext(MyUserContext)

    return (
        <div>
            <div className="mt-3">
                <div className="profile">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="w-100 bold">Thông Tin Tài Khoản</h3>
                    </div>
                    <div className="card-body text-left">
                        <div className="d-flex justify-content-center mb-3">
                            <img className="rounded-circle profile-img" src={user.avatar} alt="User Avatar" />
                        </div>
                        <div className="row">
                            <div className="col-sm-3 vertical-base">
                                <h6 className="mb-0 float-left">Họ và tên</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {user.fullName}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-3 vertical-base">
                                <h6 className="mb-0 float-left">Username</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {user.username}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-3 vertical-base">
                                <h6 className="mb-0 float-left">Email</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {user.email}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            
        </div>
    );
}

export default Profile;