import React from "react";
import {BrowserRouter, Link} from "react-router-dom";
import {useRouteMatch} from "react-router";
import { DownOutlined, UserOutlined, ReadOutlined } from '@ant-design/icons';
import {Layout, Menu, Breadcrumb, Input, Select, AutoComplete, Row, Col, Button, Dropdown,Form, Checkbox} from 'antd';
import LoginForm from '../components/common/loginForm';
import "../css/login.css";

// function App() {return <h1>Hello World!</h1>}
const { Header, Content, Footer } = Layout;
const {Option} = Select;

class Login extends React.Component{
    render(){
        return(
            <Layout className="layout" style={{minHeight: "100%"}}>
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
                <h1 id='bannerText'>
                    Please Login! 
                    <div id='subText'>Register if you don't have an account yet!↗️</div>
                </h1>
                <div className = "loginSection" style={{marginTop:"40px"}}>
                    <LoginForm />
                </div>
                <Row align={"middle"} justify={"center"} style={{marginTop:"40px"}}>
                        <Col span={8}>
                            <img src = "/images/login.png" style={{display:"block", margin:"20px auto", width:"50%"}} />
                        </Col>
                </Row>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
            </Layout>

            
        )
    }
}

export default Login;