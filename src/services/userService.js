//Register Service
import http from './httpService';

const apiEndpoint = 'http://localhost:8081/public/register';

export function register(user){
    return http.post(apiEndpoint,{
        username : user.email,
        role : user.role,
        password : user.password,
        nickname : user.nickname
    });
};