//这个service管理login & logout
import http from './httpService';

const apiEndpoint = 'http://localhost:8081/student/login';   //athentication Endpoint

export function login(email,role,password){
    return http.post( apiEndpoint , {"email": email, "password": password} );
};