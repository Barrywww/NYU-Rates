import React, {lazy} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Divider, Layout, Button, Form, Checkbox, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import GeneralModal from "../components/common/modal";
import "../css/admin.css";

const adminMain = lazy(() => import("./adminMain"));

let {Header, Content, Footer} = Layout;

class adminBundle extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
        this.modalRef = React.createRef();
    }

    componentDidMount() {
        document.getElementById("root").style.display = "flex";
        document.getElementById("root").style.minHeight = "100%";
    }

    onFinish = async (values) => {
        console.log('Success:', values);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
            credentials: "include"
        }
        const response = await fetch("http://localhost:8081/admin/login/", requestOptions);
        if (response.status === 200){
            const result = await response.json();
            if (result.code == 200){
                sessionStorage.setItem("adminStatus", JSON.stringify({username: result.username, email: values.email, role: "admin"}));
                this.props.history.push("home");
            }
            else{
                alert("Login Failure. Please try again.")
            }
            
        }
        else{
            alert("Login Failure. Please try again.")
        }
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        const title = "Login Failed";
        const bodyText = "Please check your username and password!";
        this.modalRef.current.showModal(title, bodyText);
    };

    render() {
        return(
            <Layout className="layout" style={{minHeight: "100%"}}>
                <Content>
                    <div id="loginPanel">
                        <div id="loginLogo" />
                        <h1>Administrative Portal</h1>
                        <div id="loginFormWrapper">
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}
                            >
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your Email!' }]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} size={"large"} placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                        size={"large"}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button" size="large">
                                        Log in
                                    </Button>
                                    <Divider/>
                                    <a href="/">← Back to homepage</a>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Content>
               <GeneralModal ref={this.modalRef}/>
            </Layout>
        )
    }
}


class adminRouter extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this.props.match)
    }

    render(){
        return(
            <Switch>
                <Route path={this.props.match.url + "/login"} component={adminBundle}/>
                <Route path={this.props.match.url} component={adminMain} />
            </Switch>
        )
    }
}

export default adminRouter;