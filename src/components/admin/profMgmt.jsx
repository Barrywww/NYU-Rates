import React, {lazy} from 'react';
import {Link} from 'react-router-dom';
import {Layout, Button, Form, Input, Breadcrumb, Row, Col, Table} from "antd";
import http from "../../services/httpService";

const {Content} = Layout;

const GeneralModal = lazy(() => import("../common/modal"));

class ProfMgmt extends React.Component {
    /**
     * Professor Management Class
     * @param props
     * @constructor
     */
    constructor(props){
        super(props);
        this.state = {data: [], hasData: true};
        console.log(props);
        this.modalRef = React.createRef();
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name'
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
                title: 'Department',
                dataIndex: 'department',
            }
        ];
        this.fetchData({});
    }

    /**
     * fetch professor_list
     * @param values - input data of form
     */
    async fetchData(values) {
        http.post("admin/prof_list", values).then(response => {
            if (response.data.code === 200){
                let result_data = [];
                for (let r of response.data.profList){
                    result_data.push({
                        key: r.email,
                        name: r.name,
                        email: r.email,
                        netid: r.netid,
                        department: r.dept
                    })
                }
                this.setState({data: result_data, hasData: true});
            }
        })
    }

    /**
     * onFinish trigger of Ant.d Form
     * @param values - form values
     */
    onFinish = (values) => {
        this.fetchData(values);
    }

    /**
     * menu selection handler
     */
    componentDidMount(){
        this.props.menuHandler("6");
        console.log(this.state);
    }

    render() {
        return(
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to={"./home"}>Admin Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Professor Management</Breadcrumb.Item>
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
                        </Form>
                        <Row gutter={{ xs: 8, sm: 16, md: 24}} align="top" justify="center">
                            <Col span={24}>
                                <Table
                                    dataSource={this.state.hasData? this.state.data : null}
                                    columns={this.columns}
                                    scroll={{x: "500px"}}
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

export default ProfMgmt;
