import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Divider, Layout, Button, Form, Checkbox, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

import "../css/admin.css";

let {Header, Content, Footer} = Layout;

class adminLogin extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount() {
        document.getElementById("root").style.display = "flex";
        document.getElementById("root").style.minHeight = "100%";
    }

    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                            >
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your Username!' }]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} size={"large"} placeholder="Username" />
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
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
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
            <BrowserRouter>
                <Route path={this.props.match.url + "/login"} component={adminLogin}/>
            </BrowserRouter>
        )
    }
}

export default adminRouter;