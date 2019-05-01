import axios from 'axios';

const host = 'http://localhost:3000/api/auth';

export function auth(userType) {
    if(!userType) return null;
    return axios.post(`${host}/${userType}`, undefined, {headers: {token: localStorage.getItem('token')}});
}