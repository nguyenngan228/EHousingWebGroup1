import axios from "axios";
import cookie from 'react-cookies'


export const API_URL=""
export const CLOUD_IMG=""
const BASE_URL = 'http://localhost:8080/WebFindingHousing/';
export const endpoints = {
    'landlordPost':'/api/landlordposts/',
    'login':'/api/login/',
    'register':'/api/users/',
    'current_user':'/api/current-user/',
    'landlordPostCreate':'/api/landlordpost_create/',
    'tenantPost':'/api/tenantpost/'
}

export const authApi=()=>{
    return axios.create({
        baseURL:BASE_URL,
        headers:{
            'Authorization': `${cookie.load('token')}`
        }
    })
}
export default axios.create({
    baseURL: BASE_URL
});