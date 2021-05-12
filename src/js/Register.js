import React from "react";
import {BrowserRouter, Link} from "react-router-dom";
import {useRouteMatch} from "react-router";
import { DownOutlined, UserOutlined, ReadOutlined } from '@ant-design/icons';
import {Layout, Menu, Breadcrumb, Input, Select, AutoComplete, Row, Col, Button, Dropdown,Form, Checkbox} from 'antd';
import RegisterForm from '../components/common/registerForm';
import "../css/login.css";
import MainHeader from "../components/common/header";
import MainFooter from "../components/common/footer";

// function App() {return <h1>Hello World!</h1>}
const { Header, Content, Footer } = Layout;
const {Option} = Select;

class Register extends React.Component{
    render(){
        return(
            <Layout className="layout" style={{minHeight: "100%"}}>
                <MainHeader />
                <Content>
                    <Row align={"middle"} justify={"center"}>
                        <Col span={15}>
                            <h1 id='login-bannerText'>
                                Register 
                            </h1>
                            <div id="reminderText">Note: only NYU emails will be accepted</div>
                            <div className = "RegisterSection" style={{marginTop:"20px"}}>
                                <RegisterForm />
                            </div>
                        </Col>
                        <Col span={9}>
                            <img src = "/images/register.png" style={{display:"block", width:"50%"}} />
                        </Col>
                    </Row>
                </Content>
                <MainFooter />
            </Layout>
            
        )
    }
}

export default Register;