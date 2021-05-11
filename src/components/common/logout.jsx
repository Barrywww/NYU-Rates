import React, { Component } from 'react';
import {logout} from '../../services/authService';


class Logout extends Component {

    componentDidMount() {
        localStorage.removeItem('userInfo');
        logout();
        window.location = '/';
    }
    render() { 
        return null;
    }
}
 
export default Logout;