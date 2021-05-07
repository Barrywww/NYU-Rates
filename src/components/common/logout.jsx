import React, { Component } from 'react';
import {login} from '../../services/authService';


class Logout extends Component {

    async componentDidMount() {
        localStorage.removeItem('userInfo');
        await login();
        window.location = '/';
    }
    render() { 
        return null;
    }
}
 
export default Logout;