import React from "react";
import {Layout, Row, Col} from 'antd';
import RegisterForm from '../components/common/registerForm';
import "../css/login.css";
import MainHeader from "../components/common/header";
import MainFooter from "../components/common/footer";

const {Content } = Layout;

/**
 * Menu Register Page
 */
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