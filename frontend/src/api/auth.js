import axios from 'axios';

const host = `${process.env.REACT_APP_HOST}/auth`;

export function auth(userType) {
    if(!userType) return null;
    return axios.post(`${host}/${userType}`, undefined, {headers: {token: localStorage.getItem('token')}});
}