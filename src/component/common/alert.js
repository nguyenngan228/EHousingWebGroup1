import React, { useState, useEffect } from 'react';
import ReactJsAlert from 'reactjs-alert';
import 'bootstrap/dist/css/bootstrap.min.css';


const Alert = (props) => {
    const {status, type, title, setIsAlert} = props;

    function HideAlert () {
        setIsAlert(false);
    }

    return (
        <div className="">
            <ReactJsAlert
                status={status}  
                type={type}  
                title={title}  
                Close={HideAlert}
            />
        </div>
    );
};
export default Alert;