//Register Service
import http from './httpService';

const apiEndpoint = 'public/register';

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
        name : user.name
    });
};