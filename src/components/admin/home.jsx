import React from 'react';
import {Breadcrumb, Card, Col, Divider, Layout, Row, Statistic} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";

const {Content} = Layout;

class adminHome extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.menuHandler("0");
    }

    render() {
        console.log(this.props.username);
        return (
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
                                    <p>Username: {this.props.username}</p>
                                    <p>Account: {this.props.account}</p>
                                    <p>Role: {this.props.role}</p>
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
        )
    }
}

export default adminHome;