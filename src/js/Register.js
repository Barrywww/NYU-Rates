import React from "react";
import {BrowserRouter, Link} from "react-router-dom";
import {useRouteMatch} from "react-router";
import { DownOutlined, UserOutlined, ReadOutlined } from '@ant-design/icons';
import {Layout, Menu, Breadcrumb, Input, Select, AutoComplete, Row, Col, Button, Dropdown,Form, Checkbox} from 'antd';
import RegisterForm from '../components/common/registerForm';
import "../css/login.css";
import MainHeader from "../components/common/header";

// function App() {return <h1>Hello World!</h1>}
const { Header, Content, Footer } = Layout;
const {Option} = Select;

class Register extends React.Component{
    render(){
        return(
            <Layout className="layout" style={{minHeight: "100%"}}>
                <MainHeader />
                <h1 id='login-bannerText'>
                    Register Here! 
                </h1>
                <div id="reminderText">Note: only NYU emails will be accepted</div>
                <div className = "RegisterSection" style={{marginTop:"40px"}}>
                    <RegisterForm />
                </div>
                <Row align={"middle"} justify={"center"} style={{marginTop:"15px"}}>
                        <Col span={8}>
                            <img src = "/images/register.png" style={{display:"block", margin:"20px auto", width:"50%"}} />
                        </Col>
                </Row>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
            </Layout>
            
        )
    }
}

export default Register;