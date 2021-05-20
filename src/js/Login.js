import React from "react";
import {Layout, Select, Row, Col} from 'antd';
import LoginForm from '../components/common/loginForm';
import "../css/login.css";
import MainHeader from "../components/common/header";
import MainFooter from "../components/common/footer";

// function App() {return <h1>Hello World!</h1>}
const {Content, Footer } = Layout;
const {Option} = Select;

class Login extends React.Component{
    render(){
        return(
            <Layout className="layout" style={{minHeight: "100%"}}>
                <MainHeader />
                <Content>
                    <Row align={"middle"} justify={"center"}>
                        <Col span={12}>
                            <h1 id='login-bannerText'>
                                Login
                                <div id='login-subText'><a href="/register">Don't have an account? Register Now!</a></div>
                            </h1>
                            <div className = "loginSection" style={{marginTop:"20px"}}>
                                <LoginForm />
                            </div>
                        </Col>
                        <Col span={6}>
                            <img src = "/images/login.png" style={{display:"block", margin:"20px 0", width:"80%"}} />
                        </Col>
                    </Row>
                </Content>
                <MainFooter />
            </Layout>      
        )
    }
}

export default Login;