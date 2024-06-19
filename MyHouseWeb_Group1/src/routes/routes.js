import React from 'react';
import Rooms from '../component/rooms';
import Login from '../component/login';
import Home from '../component/home';
import SavedRoom from '../component/savedRoom/savedRoom';
import Host from '../component/host/host';
import ForgotPassword from '../component/host/components/password/forgotPassword';
import NewPostRoom from '../component/Landlord/post';
import HomeLandlord from '../component/Landlord/home';
import PostFindRoom from '../component/host/components/post/postFindRoom';
import RegisterLandlord from '../component/Authentication/RegisterLandlord';
import SelectRole from '../component/Authentication/SelectRole';
import RegisterTenant from '../component/Authentication/RegisterTenant';
import RoomDetail from '../component/rooms/RoomDetail';
import ProfileLandlord from '../component/Landlord/ProfileLandlord';
import TenantDetailPost from '../component/host/components/post/DetailPost';

const routes = [
    {
        path: '/host',
        exact: false,
        main: ({match, location}) => <Host match={match} location={location}/>
    },
    {
        path: '/forgot_pass',
        exact: false,
        main: ({location}) => <ForgotPassword location={location}/>
    },
    {
        path: '/saved_room',
        exact: false,
        main: ({match, location}) => <SavedRoom match={match} location={location}/>
    },
    {
        path: '/room',
        exact: false,
        main: ({match, location}) => <Rooms match={match} location={location}/>
    },
    {
        path: '/login',
        exact: false,
        main: ({location}) => <Login location={location}/>
    },
    {
        path: '/registerlandlord',
        exact: false,
        main: ({location}) => <RegisterLandlord location={location}/>
    },
    {
        path: '/postStatus',
        exact: false,
        main: ({location}) => <NewPostRoom location={location}/>
    },
    {
        path: '/logout',
        exact: false,
        main: ({location}) => <Home location={location} />
    },
    {
        path: '/activate-account/:code',
        exact: false,
        main: ({location}) => <Login location={location}/>
    },
    {
        path: '/',
        exact: true,
        main: ({location}) => <Home location={location}/>
    },
    {
        path: '/home',
        exact: true,
        main: ({location}) => <HomeLandlord location={location}/>
    },
    {
        path: '/postfindroom',
        exact: true,
        main: ({location}) => <PostFindRoom location={location}/>
    },
    {
        path: '/selectrole',
        exact: true,
        main: ({location}) => <SelectRole location={location}/>
    },
    {
        path: '/registertenant',
        exact: false,
        main: ({location}) => <RegisterTenant location={location}/>
    },
    {
        path: '/landlordposts/:id/',  
        exact: false,
        main: ({ match, location }) => <RoomDetail match={match} location={location} />
    },
    {
        path: '/users/:userId/',  
        exact: false,
        main: ({ match, location }) => <ProfileLandlord match={match} location={location} />
    },
    {
        path: '/tenantpost/:detailId/',  
        exact: false,
        main: ({ match, location }) => <TenantDetailPost match={match} location={location} />
    },
];

export default routes;
