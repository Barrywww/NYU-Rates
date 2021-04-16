import React from 'react';
import {Link} from "react-router-dom";
import {Layout, Menu} from "antd";
import "../../css/index.css"
const {Header} = Layout;

class MainHeader extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Header className={"indexHeader"} style={{backgroundColor: 'white'}}>
                <Link className="logo" to={"/"}>
                    <img src="/images/logo_withtitle.png" height="60px"/>
                </Link>
                <Menu className="headerMenu menus" theme="light" mode="horizontal">
                    <Menu.Item key="1">
                        <Link to={"/login"}>Login</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={"/register"}>Register</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to={"/AboutUs"}>About Us</Link>
                    </Menu.Item>
                </Menu>
            </Header>
        )
    }
}

export default MainHeader;