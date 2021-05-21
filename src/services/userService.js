//Register Service
import http from './httpService';

const apiEndpoint = 'public/register';

export function register(user){
    return http.post(apiEndpoint,{
        username : user.email,
        role : user.role,
        password : user.password,
        name : user.name
    });
};