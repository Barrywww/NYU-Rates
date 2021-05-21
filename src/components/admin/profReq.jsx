import React, {lazy} from 'react';
import {Link} from 'react-router-dom';
import {Layout, Breadcrumb, Row, Col, Table, Space} from "antd";

const {Content} = Layout;

const GeneralModal = lazy(() => import("../common/modal"));

class ProfReq extends React.Component {
    /**
     * Professor Request Page
     * @param props
     * @constructor
     */
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

    /**
     * Fetch professor list
     * @param values - values from form
     */
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

    /**
     * Handle add professor request.
     * @param key - request id
     */
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

    /**
     * Decline professor request
     * @param key - request id
     */
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
