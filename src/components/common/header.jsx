import React,{ useState } from 'react';
import {Link} from "react-router-dom";
import {Layout, Menu} from "antd";
import { TreeSelect } from 'antd';
import "../../css/index.css"
const {Header} = Layout;
const { TreeNode } = TreeSelect;



class MainHeader extends React.Component{
    /**
     * Main Footer Function
     * @constructor
     */
    constructor(props){
        super(props)
        this.state = {"user":JSON.parse(localStorage.getItem('userInfo'))} //用给下面conditional rendering
    }
    
    render(){
        let conditionMenu = (
                <React.Fragment>
                    <Menu.Item key="1">
                        <Link to={"/login"}>Login</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={"/register"}>Register</Link>
                    </Menu.Item>
                </React.Fragment>
        );
        if (this.state.user !== null){
            if (this.state.user.role == "student"){
                conditionMenu = (
                    <React.Fragment>
                        <Menu.Item key="1">
                            <Link to={"/profile"}>Hi, {this.state.user.username}!</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={"/logout"}>Logout</Link>
                        </Menu.Item>
                    </React.Fragment> 
                )
            }
            else if (this.state.user.role == "professor"){
                conditionMenu = (
                    <React.Fragment>
                        <Menu.Item key="1">
                            <Link to={"/profprofile"}>Hi, {this.state.user.username}!</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={"/logout"}>Logout</Link>
                        </Menu.Item>
                    </React.Fragment>
                )
            }
        }

        return (
            <Header className={"indexHeader"} style={{backgroundColor: 'white'}}>
                <a className="logo" href="/">
                    <img src="/images/logo_withtitle.png" height="60px"/>
                </a>




                <Menu className="headerMenu menus" theme="light" mode="horizontal">
                    {conditionMenu}
                    <Menu.Item key="3">
                        <Link to={"/AboutUs"}>About Us</Link>
                    </Menu.Item>
                </Menu>
            </Header>
        )
    }
}

export default MainHeader;