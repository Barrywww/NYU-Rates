import React, {lazy} from 'react';
import {Link} from 'react-router-dom';
import Column, {Divider, Layout, Button, Form, Checkbox, Input, Breadcrumb, Row, Col, Table, Switch, Radio, Space} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined, LockOutlined, UserOutlined, DownOutlined} from "@ant-design/icons";

const {Content} = Layout;

const GeneralModal = lazy(() => import("../common/modal"));

const data = [];

class ProfReq extends React.Component {
    constructor(props){
        super(props);
        this.state = {hasData: false, data:[]};
        console.log(props);
        this.modalRef = React.createRef();
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'request_id',
            },
            {
                title: 'Name',
                dataIndex: 'professor_name',
            },
            {
                title: 'Department',
                dataIndex: 'professor_department',
            },
            {
                title: 'Email',
                dataIndex: 'professor_email',
            },
            {
                title: 'Course',
                dataIndex: 'professor_course_name',
            },
            {
                title: 'Code',
                dataIndex: 'professor_course_code',
            },
            {
                title: 'Semester',
                dataIndex: 'professor_course_semester',
            },
            {
                title: 'Action',
                render: () => (
                    <Space size="middle">
                        <a className="accept">Accept</a>
                        <a className="decline">Decline</a>
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
        fetch("http://localhost:8081/admin/getprofrequests/", requestOptions).then(response => {
            if (response.status == 200){
                return response.json();
            }
        })
        .then(json => {
            console.log(json);
            let newData = [];
            for (let i=0; i<json.profRequests.length; i++){
                console.log(json.profRequests[i]);
                newData.push({
                    key: i,
                    request_id: json.profRequests[i].req_id,
                    professor_name: json.profRequests[i].professor_name,
                    professor_department: json.profRequests[i].professor_dept,
                    professor_email: json.profRequests[i].professor_email,
                    professor_course_name: json.profRequests[i].professor_course_name,
                    professor_course_code:json.profRequests[i].professor_course_code,
                    professor_course_semester:json.profRequests[i].professor_course_semester
                });
            };
            console.log(newData);
            this.setState({hasData: true, data: newData});
        }
        )
    }

    handleAccept(key){
        console.log(key);
        let con = confirm("Are you sure to add this professor?");
        if (con){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({request_id: key, operation: true}),
                credentials: "include"
            }
            fetch("http://localhost:8081/admin/handleprofrequests/", requestOptions).then(response => {
                if (response.status == 200){
                    return response.json();
                }
            })
            .then(json => {
                if (json.code !== 200){
                    alert("Operation Failed!");
                }
                else{
                    this.fetchData({});
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

    handleDecline(key) {
        console.log(key);
        let con = confirm("Are you sure to decline this request?");
        if (con){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({request_id: key, operation: false}),
                credentials: "include"
            }
            fetch("http://localhost:8081/admin/handleprofrequests/", requestOptions).then(response => {
                if (response.status == 200){
                    return response.json();
                }
            })
            .then(json => {
                if (json.code !== 200){
                    alert("Operation Failed!");
                }
                else{
                    this.fetchData({});
                }
            })
        }
    }

    onFinish(values) {
        console.log(values);
    }

    componentDidMount(){
        this.props.menuHandler("5");
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
                                                if (event.target.className === "accept"){
                                                    this.handleAccept(record.request_id);
                                                }
                                                else if (event.target.className === "decline"){
                                                    this.handleDecline(record.request_id);
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

export default ProfReq;
