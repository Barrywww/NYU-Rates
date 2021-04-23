import React, { Component } from 'react';

class Logout extends Component {

    componentDidMount() {
        localStorage.removeItem('userInfo');
        window.location = '/';
    }
    render() { 
        return null;
    }
}
 
export default Logout;