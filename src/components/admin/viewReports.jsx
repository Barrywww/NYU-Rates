import React, {lazy} from 'react';
import {Link} from 'react-router-dom';
import Column, {Divider, Layout, Button, Form, Checkbox, Input, Breadcrumb, Row, Col, Table, Switch, Radio, Space} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined, LockOutlined, UserOutlined, DownOutlined} from "@ant-design/icons";

const {Content} = Layout;

const GeneralModal = lazy(() => import("../common/modal"));

const data = [];

class ViewReports extends React.Component {
    constructor(props){
        super(props);
        this.state = {hasData: false, data:[]};
        console.log(props);
        this.modalRef = React.createRef();
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'report_id',
            },
            {
                title: 'Comment ID',
                dataIndex: 'comment_id',
            },
            {
                title: 'User',
                dataIndex: 'comment_user',
            },
            {
                title: 'Content',
                dataIndex: 'comment_content',
            },
            {
                title: 'Reason',
                dataIndex: 'report_reason',
            },
            {
                title: 'Action',
                render: () => (
                    <Space size="middle">
                        <a className="delete">Accept</a>
                        <a className="revert">Decline</a>
                    </Space>
                ),
            },
        ];
        this.fetchData({})
    }

    async fetchData(values) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
            credentials: "include"
        }
        fetch("http://localhost:8081/admin/getreports/", requestOptions).then(response => {
            if (response.status == 200){
                return response.json();
            }
        })
        .then(json => {
            console.log(json);
            let newData = [];
            for (let i=0; i<json.reportsArray.length; i++){
                console.log(json.reportsArray[i]);
                newData.push({
                    key: i,
                    report_id: json.reportsArray[i].report_id,
                    comment_id: json.reportsArray[i].comment_id,
                    comment_user: json.reportsArray[i].comment_user,
                    comment_content: json.reportsArray[i].comment_content,
                    report_reason: json.reportsArray[i].report_reason
                });
            };
            console.log(newData);
            this.setState({hasData: true, data: newData});
        }
        )
    }

    handleDelete(key, report){
        console.log(key);
        let con = confirm("Are you sure to delete this comment?");
        if (con){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({comment_id: key, report_id: report, validity: false}),
                credentials: "include"
            }
            fetch("http://localhost:8081/admin/reviewcomment/", requestOptions).then(response => {
                if (response.status == 200){
                    return response.json();
                }
            })
            .then(json => {
                if (json.code !== 200){
                    alert("Operation Failed!");
                }
                else{
                    this.fetchData({})
                }
            })
        }
    }

    handleAddCourse(key){
        alert("Are you sure to add course?");
    }


    handleHasData(){
        this.setState({hasData: !this.state.hasData});
    }

    handleRevert(key, report) {
        console.log(key);
        let con = confirm("Are you sure to revert this comment?");
        if (con){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({comment_id: key, report_id: report, validity: true}),
                credentials: "include"
            }
            fetch("http://localhost:8081/admin/reviewcomment/", requestOptions).then(response => {
                if (response.status == 200){
                    return response.json();
                }
            })
            .then(json => {
                if (json.code !== 200){
                    alert("Operation Failed!");
                }
                else{
                    this.fetchData({})
                }
            })
        }
    }

    onFinish(values) {
        console.log(values);
    }

    componentDidMount(){
        this.props.menuHandler("9");
        console.log(this.state);
    }

    render() {
        return(
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to={"./home"}>Admin Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>View Reports</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 10,
                        margin: 0,
                        minHeight: 280,
                    }}>
                    <div id="adminMainWrapper">
                        {/* <Form
                            name="profQuery"
                            onFinish={this.onFinish}>
                            <Row gutter={{ xs: 8, sm: 16, md: 24}} align="top" justify="center">
                                <Col xs={12} sm={12} md={5}>
                                    <Form.Item name="name">
                                        <Input size="large" placeholder="Name"/>
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={5}>
                                    <Form.Item name="netid">
                                        <Input size="large" placeholder="NetID"/>
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={5}>
                                    <Form.Item name="email">
                                        <Input size="large" placeholder="Email"/>
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={5}>
                                    <Form.Item name="department">
                                        <Input size="large" placeholder="Department"/>
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={4}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" style={{width: "100%"}} size="large">
                                            Search
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form> */}
                        <Row gutter={{ xs: 8, sm: 16, md: 24}} align="top" justify="center">
                            <Col span={24}>
                                <Table
                                    dataSource={this.state.hasData? this.state.data : null}
                                    columns={this.columns}
                                    scroll={{x: "500px"}}
                                    onRow={record => {
                                        return {
                                            onClick: event => {
                                                console.log(record);
                                                event.preventDefault();
                                                event.stopPropagation();
                                                if (event.target.className === "delete"){
                                                    this.handleDelete(record.comment_id, record.report_id);
                                                }
                                                else if (event.target.className === "revert"){
                                                    this.handleRevert(record.comment_id, record.report_id);
                                                }
                                            }
                                        }
                                    }}
                                >
                                </Table>
                            </Col>
                        </Row>
                    </div>
                </Content>
                <GeneralModal ref={this.modalRef} />
            </Layout>
        )
    }
}

export default ViewReports;
