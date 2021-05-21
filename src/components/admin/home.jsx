import React from 'react';
import {Breadcrumb, Card, Col, Divider, Layout, Row, Statistic} from "antd";
import http from "../../services/httpService";

const {Content} = Layout;

class adminHome extends React.Component{
    /**
     * adminHomepage Class
     * @param props
     * @constructor
     */
    constructor(props){
        super(props);
        this.state = {comments: 0, courses: 0, profs: 0, users: 0};
    }

    /**
     * Get Statistical data
     */
    componentDidMount() {
        this.props.menuHandler("0");
        http.get("admin/stats").then(response => {
            if (response.data.code === 200){
                let result = response.data.msg.trim().split(" ");
                result = result.map(item => {return +item});
                console.log(result);
                this.setState({comments: result[0], courses: result[1], profs: result[2], users: result[3]});
            }
        })
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
                                    </Row>
                                    <Row gutter={{xs: 8, sm: 16, md: 24}}>
                                        <Col xs={24} sm={12} md={8} className={"adminButtonWrapper"}>
                                            <a href={"./viewReports"}>View Reports</a>
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
                                            <Statistic title="Users" value={this.state.users} />
                                            <Statistic title="Courses" value={this.state.courses} />
                                        </Col>
                                        <Col span={12}>
                                            <Statistic title="Professors" value={this.state.profs} />
                                            <Statistic title="Comments/Rates" value={this.state.comments} />
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