import React, {lazy} from 'react';
import {Link} from 'react-router-dom';
import Column, {Divider, Layout, Button, Form, Checkbox, Input, Breadcrumb, Row, Col, Table, Switch, Radio, Space} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined, LockOutlined, UserOutlined, DownOutlined} from "@ant-design/icons";

const {Content} = Layout;

const GeneralModal = lazy(() => import("../common/modal"));

const data = [];

class StudentMgmt extends React.Component {
    constructor(props){
        super(props);
        this.state = {hasData: true};
        console.log(props);
        this.modalRef = React.createRef();
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                sorter: (a, b) => a.age - b.age,
            },
            {
                title: 'NetID',
                dataIndex: 'netid',
                sorter: (a, b) => a.age - b.age,
            },
            {
                title: 'Action',
                render: () => (
                    <Space size="middle">
                        <a className="ban">Ban</a>
                        <a className="delete">Delete</a>
                        <a className="update">Change Info</a>
                    </Space>
                ),
            },
        ];
    }

    async fetchData(values) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
            credentials: "include"
        }
        const response = await fetch("http://localhost:8081/admin/login/", requestOptions);
        if (response.status !== 200){
            let json = await response.json();
            for (let i=0; i<json.length; i++){
                data.push({
                    key: i,
                    name: json[i].name,
                    netid: json[i].netid,
                    email: json[i].email,
                });
            }

        }
        else{
            alert("Login Failure. Please try again.")
        }
    }

    handleBan(key) {
        alert("Are you sure to ban?");
    }

    handleUpdate(key){
        alert("Are you sure to update?");
    }

    handleHasData(){
        this.setState({hasData: !this.state.hasData});
    }

    handleDelete(key) {
        alert("Are you sure to delete user: " + key + "?");
    }

    onFinish(values) {
        console.log(values);
    }

    componentDidMount(){
        this.props.menuHandler("1");
        console.log(this.state);
    }

    render() {
        return(
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to={"./home"}>Admin Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Student Management</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 10,
                        margin: 0,
                        minHeight: 280,
                    }}>
                    <div id="adminMainWrapper">
                        <Form
                            name="studentQuery"
                            onFinish={this.onFinish}>
                            <Row gutter={{ xs: 8, sm: 16, md: 24}} align="top" justify="center">
                                <Col xs={12} sm={12} md={6}>
                                    <Form.Item name="name">
                                        <Input size="large" placeholder="Name"/>
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={6}>
                                    <Form.Item name="netid">
                                        <Input size="large" placeholder="NetID"/>
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={6}>
                                    <Form.Item name="email">
                                        <Input size="large" placeholder="Email"/>
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={6}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" style={{width: "100%"}} size="large">
                                            Search
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                        <Row gutter={{ xs: 8, sm: 16, md: 24}} align="top" justify="center">
                            <Col span={24}>
                                <Table
                                    dataSource={this.state.hasData? data : null}
                                    columns={this.columns}
                                    scroll={{x: "500px"}}
                                    onRow={record => {
                                        return {
                                            onClick: event => {
                                                console.log(record);
                                                event.preventDefault();
                                                event.stopPropagation();
                                                if (event.target.className === "ban"){
                                                    this.handleBan(record.email);
                                                }
                                                else if (event.target.className === "delete"){
                                                    this.handleDelete(record.email);
                                                }
                                                else if (event.target.className === "update"){
                                                    this.handleUpdate(record.email);
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

export default StudentMgmt;
