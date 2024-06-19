import axios from "axios";
import cookie from 'react-cookies'


export const API_URL=""
export const CLOUD_IMG=""
const BASE_URL = 'http://localhost:8080/WebFindingHousing/';
export const endpoints = {
    'landlordPost':'/api/landlordposts/',
    'login':'/api/login/',
    'register':'/api/users/',
    'landlord_register':'/api/landlord_create/',
    'current_user':'/api/current-user/',
    'landlordPostCreate':'/api/landlordpost_create/',
    'tenantPost':'/api/tenantpost/',
    'tenantPostDetail':(detailId)=>`/api/tenantpost/${detailId}/`,
    'landlordPostDetail':(postId)=>`/api/landlordposts/${postId}/`,
    'roomDetail':(roomId)=>`/api/rooms/${roomId}/images/`,
    'loadUser':(userId)=>`/api/users/${userId}/`,
    'follow':(flId)=>`/api/users/${flId}/follow/`,
    'landlordPostByUserId':(landlordId)=>`/api/landlordposts/${landlordId}/landlord/`,
    'tenantPostByUserId':(tenantId)=>`/api/tenantposts/${tenantId}/tenant/`,
    'checkFollow':(id)=>`/api/checkfollow/${id}/`,
    'comment':(cmtPostId)=>`/api/posts/${cmtPostId}/comments/`,
    'listCmt':(cmtId)=>`/api/posts/${cmtId}/getcomments/`
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