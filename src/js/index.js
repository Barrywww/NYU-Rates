import React, {Component} from "react";
import {Link} from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
//import { Button, Tooltip } from 'antd';
import "../css/index.css";
import 'antd/dist/antd.compact.css'
//import Like from '../components/common/like';
//import Dislike from '../components/common/dislike';

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
                            <Menu.Item key="2">Login</Menu.Item>
                            <Menu.Item key="3">Sign Up</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px'}}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        {/*这下面是管搜索框那一栏的 */}
                    <div class="imageRow1">
                        <div class="imageColumn1">
                            <img src = "/images/pointingRight.png" width="100%;"/>
                            <p class="image1">This is where you can start!</p>
                        </div>
                        <div class="imageColumn1">
                            <p class="image1">这里放搜索框，先别吐槽我这块怎么弄的😂整个页面背景颜色调的跟我图片搭一点，几乎看不出来的那种。css里也可以改图片间距，依搜索框大小而定吧</p>
                        </div>
                    
                    </div>
                    {/*这里结束*/}
                    </Content>

                    {/*这下面是管align好的三张图的 */}
                    <div class="imageRow">
                        <div class="imageColumn">
                            <img src = "/images/Anonymity.jpg" width="100%;"/>
                            <p class="image">Anonymous</p>
                        </div>
                        <div class="imageColumn">
                            <img src = "/images/Improvement.jpg" width="100%;"/>
                            <p class="image">Improve Everyone</p>
                        </div>
                        <div class="imageColumn">
                            <img src = "/images/Honesty.jpg" width="100%;"/>
                            <p class="image">Be Honest</p>
                        </div>
                    </div>
                    {/*这里结束*/}

                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
                )
        }
}

export default IndexPage;