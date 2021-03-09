import React, {Component} from "react";
import {Link} from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import "../css/index.css";
import 'antd/dist/antd.compact.css'

const { Header, Content, Footer } = Layout;

class IndexPage extends Component{
    render(){
        return(
                <Layout className="layout" style={{minHeight: "100%"}}>
                    <Header>
                        <div className="logo">Logo</div>
                        <Menu className="headerMenu" theme="dark" mode="horizontal">
                            <Menu.Item key="1">
                                <Link to={"/test"}>Test Page</Link>
                            </Menu.Item>
                            <Menu.Item key="2">Nav 2</Menu.Item>
                            <Menu.Item key="3">Nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px'}}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-content">
                            <div>Content</div>
                            <Link to={"/test"}>
                                <a>To Test Page</a>
                            </Link>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
                )
        }
}

export default IndexPage;