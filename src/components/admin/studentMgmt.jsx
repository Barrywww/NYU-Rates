import React, {lazy} from 'react';
import {Link} from 'react-router-dom';
import {Layout, Button, Form, Input, Breadcrumb, Row, Col, Table, Switch, Radio, Space} from "antd";
import http from '../../services/httpService';

const {Content} = Layout;

const GeneralModal = lazy(() => import("../common/modal"));

class StudentMgmt extends React.Component {
    /**
     * Student Management Page
     * @param props
     * @constructor
     */
    constructor(props){
        super(props);
        this.state = {data: [], hasData: false};
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
            },
            {
                title: 'NetID',
                dataIndex: 'netid',
            },
            {
                title: 'Action',
                render: () => (
                    <Space size="middle">
                        <a className="delete">Delete</a>
                    </Space>
                ),
            },
        ];
        this.fetchData({})
    }

    /**
     * Fetch student list
     * @param values - values from props
     */
    async fetchData(values) {
        http.post("admin/student_list", values).then(response => {
            if (response.data.code === 200){
                let result_data = [];
                for (let r of response.data.student_list){
                    result_data.push({
                        key: r.email,
                        ...r
                    })
                }
                this.setState({data: result_data, hasData: true});
            }
        })
    }

    /**
     * Delete User
     * @param key - user id
     */
    handleDelete(key) {
        const r = confirm("Are you sure to delete user: " + key + "?");
        if (r){
            http.post("admin/deletestudent", {email: key}).then(response => {
                if (response.data.code === 200){
                    alert("Delete success!");
                    window.location.reload();
                }
                else{
                    alert("Delete Failed!");
                }
            })
        };
    }

    /**
     * Form OnFinish Trigger
     * @param values - values from form.
     */
    onFinish = (values) => {
        this.fetchData(values);
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
                                                    this.handleDelete(record.email);
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
