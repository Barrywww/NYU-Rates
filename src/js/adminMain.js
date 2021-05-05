import React, {lazy} from "react";
import { Layout, Statistic, Menu, Breadcrumb, Row, Col, Button, Card, Divider } from 'antd';
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    HomeTwoTone,
    HomeOutlined,
    TeamOutlined, ReadOutlined, ArrowUpOutlined, ArrowDownOutlined
} from '@ant-design/icons';
import {Link, Switch, Route, Redirect} from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const AdminHome = lazy(() => import("../components/admin/home"));
const StudentMgmt = lazy(() => import("../components/admin/studentMgmt"));

class adminMain extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
            username:"Barry Wang",
            account:"yw3752@nyu.edu",
            role:"Site Administrator",
            selectedKey: "0"
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize.bind(this));
        this.handleResize();
        console.log(this.props.match.url);
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

    handleMenuKey(key) {
        this.setState({selectedKey: key}, ()=>{console.log(this.state)});

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
                            defaultSelectedKeys={["0"]}
                            selectedKeys={[this.state.selectedKey]}
                            defaultOpenKeys={['sub1', 'sub2','sub3','sub4']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="0" icon={<HomeOutlined />}><Link to={"./home"}>Home</Link></Menu.Item>
                            <SubMenu key="sub1" icon={<UserOutlined />} title="Student">
                                <Menu.Item key="1"><Link to={"./studentMgmt"}>Student Management</Link> </Menu.Item>
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
                    <Switch>
                        <Route path={this.props.match.url + "/home"}
                               render={() =>
                                   <AdminHome menuHandler={this.handleMenuKey.bind(this)}
                                              username={this.state.username}
                                              account={this.state.account}
                                              role={this.state.role}
                                   />} />
                        <Route path={this.props.match.url + "/studentMgmt" }
                               render={() =>
                                   <StudentMgmt menuHandler={this.handleMenuKey.bind(this)}/>}/>
                        <Redirect to={this.props.match.url + "/home"} />
                    </Switch>
                </Layout>
            </Layout>
        )
    }
}

export default adminMain;