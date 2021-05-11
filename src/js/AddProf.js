import React from "react";
import {Layout, Select, Row, Col} from 'antd';
import AddProfForm from '../components/common/AddProfForm';
import "../css/login.css";
import MainHeader from "../components/common/header";

// function App() {return <h1>Hello World!</h1>}
const {Content, Footer } = Layout;
const {Option} = Select;

class AddProf extends React.Component{
    render(){
        return(
            <Layout className="layout" style={{minHeight: "100%"}}>
                <MainHeader />
                <Content>
                    <h1 id='login-bannerText'>
                        Add New Professor
                        <div id='login-subText'>Please search first to make sure this professor doesn't already exist</div>
                    </h1>
                    <div className = "loginSection" style={{marginTop:"40px"}}>
                        <AddProfForm />
                    </div>
                    <Row align={"middle"} justify={"center"} style={{marginTop:"40px"}}>
                        <Col span={8}>
                            <img src = "/images/AddProf.jpeg" style={{display:"block", margin:"20px auto", width:"50%"}} />
                        </Col>
                    </Row>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
            </Layout>

            
        )
    }
}

export default AddProf;