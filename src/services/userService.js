//Register Service
import http from './httpService';

const apiEndpoint = 'http://localhost:8081/public/register';

/**
* register a user
* @param {object} user -user's info: email, etc
* @returns {number} -request feedback code
*/

export function register(user){
    return http.post(apiEndpoint,{
        username : user.email,
        role : user.role,
        password : user.password,
        nickname : user.nickname
    });
};