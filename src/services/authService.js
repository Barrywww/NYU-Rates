//这个service管理login & logout
import http from './httpService';

const apiEndpoint = 'http://localhost:8081/public/login';   //athentication Endpoint
const apiEndpoint1 = 'http://localhost:8081/public/logout'; 

export function login(email, role, password){
    return http.post( apiEndpoint , {"email": email, "password": password, "role":role});
};

export function logout(email){
    return http.post( apiEndpoint1 , {"email": email});
};