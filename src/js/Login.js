import React from "react";
import {Layout, Select, Row, Col} from 'antd';
import LoginForm from '../components/common/loginForm';
import "../css/login.css";
import MainHeader from "../components/common/header";

// function App() {return <h1>Hello World!</h1>}
const {Content, Footer } = Layout;
const {Option} = Select;

class Login extends React.Component{
    render(){
        return(
            <Layout className="layout" style={{minHeight: "100%"}}>
                <MainHeader />
                <Content>
                    <h1 id='login-bannerText'>
                        Please Login!
                        <div id='login-subText'>Register if you don't have an account yet!↗️</div>
                    </h1>
                    <div className = "loginSection" style={{marginTop:"40px"}}>
                        <LoginForm />
                    </div>
                    <Row align={"middle"} justify={"center"} style={{marginTop:"40px"}}>
                        <Col span={8}>
                            <img src = "/images/login.png" style={{display:"block", margin:"20px auto", width:"50%"}} />
                        </Col>
                    </Row>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
            </Layout>

            
        )
    }
}

export default Login;