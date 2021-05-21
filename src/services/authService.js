//这个service管理login & logout
import http from './httpService';

const apiEndpoint = 'public/login';   //athentication Endpoint
const apiEndpoint1 = 'public/logout';

/**
 * Login Wrapper
 * @param email - user email
 * @param role - user role
 * @param password - user password
 * @return axios
 */
export function login(email, role, password){
    return http.post( apiEndpoint , {"email": email, "password": password, "role":role});
};

/**
 * Logout Wrapper
 * @param email - user email
 */
export function logout(email){
    return http.post( apiEndpoint1 , {"email": email});
};