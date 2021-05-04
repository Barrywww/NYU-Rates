import React from "react";
import { Layout, Statistic, Menu, Breadcrumb, Row, Col, Button, Card, Divider } from 'antd';
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    HomeTwoTone,
    HomeOutlined,
    TeamOutlined, ReadOutlined, ArrowUpOutlined, ArrowDownOutlined
} from '@ant-design/icons';
import {Link} from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class adminMain extends React.Component {
    constructor(props){
        super(props);
        this.state = {collapsed: false, username:"Barry Wang", account:"yw3752@nyu.edu", role:"Site Administrator"}
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize.bind(this));
        this.handleResize();
    }

    shouldComponentUpdate(nextProps, nextState){
        for (let k in this.state){
            if(this.state[k] !== nextState[k]){
                return true
            }
        }
        return false;
    }

    handleResize() {
        if (document.body.scrollWidth <= 600){
            this.setState({collapsed: true});
        }
        else{
            this.setState({collapsed: false});
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout style={{minHeight: "100%"}}>
                <Header className={"adminHeader"} style={{backgroundColor: 'white', padding: "0 10px"}}>
                    <Link className="logo" to={"/"}>
                        <img src="/images/logo_withtitle.png" height="60px"/>
                    </Link>
                </Header>
                <Layout>
                    <Sider className="site-layout-background" trigger={null} collapsible collapsed={this.state.collapsed}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['0']}
                            defaultOpenKeys={['sub1', 'sub2','sub3','sub4']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="0" icon={<HomeOutlined />}>Home</Menu.Item>
                            <SubMenu key="sub1" icon={<UserOutlined />} title="Student">
                                <Menu.Item key="1">Student Management</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<TeamOutlined />} title="Professor">
                                <Menu.Item key="5">New Requests</Menu.Item>
                                <Menu.Item key="6">Professor Management</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined />} title="Comments">
                                <Menu.Item key="9">Reports</Menu.Item>
                                <Menu.Item key="10">Comments Management</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" icon={<ReadOutlined />} title="Dept./Course">
                                <Menu.Item key="13">New Dept./Course</Menu.Item>
                                <Menu.Item key="14">Management</Menu.Item>
                                <Menu.Item key="15">option11</Menu.Item>
                                <Menu.Item key="16">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Admin Home</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 10,
                                margin: 0,
                                minHeight: 280,
                            }}>
                            <div id="adminMainWrapper">
                                <h1>Welcome to NYURates Administrative Portal!</h1>
                                <Row gutter={{ xs: 8, sm: 16, md: 24}} align="top" justify="center" style={{minHeight: "100%"}}>
                                    <Col sm={24} md={12}>
                                        <Card title="Info" bordered={true} style={{ width: "100%" }}>
                                            <p>You are currently logged in as:</p>
                                            <p>Username: {this.state.username}</p>
                                            <p>Account: {this.state.account}</p>
                                            <p>Role: {this.state.role}</p>
                                        </Card>
                                        <Divider />
                                        <Card title="Quick Access" bordered={true} style={{ width: "100%" }}>
                                            <Row gutter={{xs: 8, sm: 16, md: 24}}>
                                                <Col xs={24} sm={12} md={8} className={"adminButtonWrapper"}>
                                                   <a href={"./studentMgmt"} >Student Management</a>
                                                </Col>
                                                <Col xs={24} sm={12} md={8} className={"adminButtonWrapper"}>
                                                    <a href={"./profMgmt"}>Professor Management</a>
                                                </Col>
                                                <Col xs={24} sm={12} md={8} className={"adminButtonWrapper"}>
                                                    <a href={"./profMgmt"}>Comment Management</a>
                                                </Col>
                                            </Row>
                                            <Row gutter={{xs: 8, sm: 16, md: 24}}>
                                                <Col xs={24} sm={12} md={8} className={"adminButtonWrapper"}>
                                                    <a href={"./courses"}>Course Management</a>
                                                </Col>
                                                <Col xs={24} sm={12} md={8} className={"adminButtonWrapper"}>
                                                    <a href={"./reports"}>View Reports</a>
                                                </Col>
                                                <Col xs={24} sm={12} md={8} className={"adminButtonWrapper"}>
                                                    <a href={"./profReq"}>New Prof. Requests</a>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                    <Col sm={24} md={12} style={{width: "100%"}} className={"adminPanelThirdCol"}>
                                        <Card title="Statistics" bordered={true} style={{ width: "100%" }}>
                                            <Row gutter={{ xs: 8, sm: 16, md: 24}}>
                                                <Col span={12} >
                                                    <Statistic title="Users" value={458} />
                                                    <Statistic title="Courses" value={812} />
                                                    <Statistic
                                                        title="New Users"
                                                        value={11.28}
                                                        precision={2}
                                                        valueStyle={{ color: '#3f8600' }}
                                                        prefix={<ArrowUpOutlined />}
                                                        suffix="%"
                                                    />
                                                </Col>
                                                <Col span={12}>
                                                    <Statistic title="Professors" value={103} />
                                                    <Statistic title="Comments/Rates" value={1452} />
                                                    <Statistic
                                                        title="New Comments"
                                                        value={9.3}
                                                        precision={2}
                                                        valueStyle={{ color: '#cf1322' }}
                                                        prefix={<ArrowDownOutlined />}
                                                        suffix="%"
                                                    />
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                </Row>
                                <img id={"adminBlankLogo"} src={"/images/logo_no_margin.png"}/>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default adminMain;