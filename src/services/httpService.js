//呼叫后端Service
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081/"

axios.interceptors.response.use(null, config => {
    config.withCredentials = true;
    return config},error=>{
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError){
        alert("An unexpected error occured.");
    }
    return Promise.reject(error);
});

const http = axios.create({
  withCredentials: true
})

export default http;