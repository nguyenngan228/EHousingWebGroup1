import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import RoomDetail from './RoomDetail';
import ProfileLandlord from '../Landlord/ProfileLandlord';
import TenantDetailPost from '../host/components/post/DetailPost';

const Products = (props) => {
    const {match} = props;
    const url = match.url;

    return (
        <div className="container">
            <div className="row">
                <Route path={`${url}/:id/`} component={RoomDetail}/>
                <Route path={`${url}/:userId/`} component={ProfileLandlord}/>
                <Route path={`${url}/:detailId/`} component={TenantDetailPost}/>
            </div>

        </div>
    );

};

export default Products;