import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Profile from './components/profile/profile';
// import Payment from './components/payment/payment';
// import ChangePassword from './components/password/changePassword';
import './host.css';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import MyLandlordPost from '../Landlord/MyLandlordPost';
import { MyUserContext } from '../../config/Contexts';
import MyTenantPost from './components/post/MyTenantPost';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        maxWidth: "75%",
        margin: "0 auto",
    },
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const user = useContext(MyUserContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const alertOptions = {
        timeout: 5000,
        position: positions.TOP_CENTER,
    };

    let index = 0;
    const tabs = [
        { label: 'Thông tin cá nhân', component: <Profile />, index: index++ },
        user.role === 'ROLE_LANDLORD' && { label: 'Danh sách nhà', component: <MyLandlordPost />, index: index++ },
        user.role === 'ROLE_TENANT' && { label: 'Danh sách bài đăng', component: <MyTenantPost />, index: index++ },
    ].filter(Boolean); 

    return (
        <Provider template={AlertTemplate} {...alertOptions}>
            <div className={[classes.root, 'host-container'].join(' ')}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        {tabs.map((tab, idx) => (
                            <Tab key={idx} label={tab.label} {...a11yProps(tab.index)} />
                        ))}
                    </Tabs>
                </AppBar>
                {tabs.map((tab, idx) => (
                    <TabPanel key={idx} value={value} index={tab.index}>
                        {tab.component}

                    </TabPanel>
                ))}
            </div>
        </Provider>
    );
}
