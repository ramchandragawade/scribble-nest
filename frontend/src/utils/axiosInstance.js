import axios from 'axios';
import { BACKEND_URL } from './constants';

const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    }, (err) => {
        return Promise.reject(err);
    }
);

export default axiosInstance;
