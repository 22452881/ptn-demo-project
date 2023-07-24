import axios from 'axios';

const apicaller = axios.create({
    baseURL: 'http://localhost:5015/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Connection': 'Keep-Alive'
    },
    withCredentials: true
});

const api = {

    login: (username, password) => {
        const request = {
            username: username, password: password
        }
        return apicaller.post('/auth/login', request);
    },



};

export default api;