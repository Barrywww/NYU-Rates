//这个service管理login & logout
import http from './httpService';

const apiEndpoint = 'xxx';   //athentication Endpoint

export function login(email,role,password){
    return http.post( apiEndpoint , { email,role,password } );
};