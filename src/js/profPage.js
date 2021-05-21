import React from "react";
import {
    Layout,
    Menu,
    Breadcrumb,
    Input,
    Select,
    AutoComplete,
    Row,
    Col,
    Dropdown,
    Form,
    Checkbox,
    List, Statistic
} from 'antd';
import MainHeader from "../components/common/header";
import {
    LikeOutlined,
    MessageOutlined,
    StarOutlined,
    DislikeOutlined,
    WarningOutlined,
    DownOutlined, DownCircleOutlined, LikeFilled, LikeTwoTone,DislikeTwoTone
} from "@ant-design/icons";
import { UserOutlined } from '@ant-design/icons';
import Avatar from "antd/es/avatar/avatar";
import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Rate } from 'antd'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';

import "../css/profPage.css";

// function App() {return <h1>Hello World!</h1>}
const { Header, Content, Footer } = Layout;
const {Option} = Select;

const listData = {
    professor_name:"",
    department:"",
    rating:5.0,
    comment:[],
    total_comments:0,
    course_history:[]
}
for (let i = 0; i < listData.total_comments; i++) {
    listData.comment.push({
        time: "",
        course_code:"",
        username:"",
        rating: 5.0,
        content: '',
    });
}

const IconText = ({ icon, text, onClick, style }) => (
    <span onClick={onClick} style={style}>
    {React.createElement(icon, { style: { marginRight: 8 } })}
        {text}
  </span>
);

class LikeBtn extends React.Component{
    constructor(props){
        super(props)
        this.state={
            like:0,
            liked:null,
        };
    }
    islike =()=>{
        let liked=this.state.liked;
        if(liked){
            if(liked==='like'){
                this.setState({liked:null})
                this.setState({like:this.state.like-1});
            }
            else
            {
                this.setState({liked:'like'});
                this.setState({like:this.state.like+1});

            }
        }
        else {
            this.setState({
                like:this.state.like+1
            });
            this.setState({liked:'like'});
        }
    };
    render(){
        let icon = LikeOutlined;
        if (this.state.liked !== null){
            icon = LikeTwoTone;
        }
        return(
                <IconText
                          onClick={this.islike}
                          icon={icon}
                          text={this.state.like}
                          key="list-vertical-like-o"
                          style={{width:60, cursor: "pointer"}}
                />
        );
    }
}

class DisLikeBtn extends React.Component{
    constructor(props){
        super(props)
        this.state={
            dislike:0,
            disliked:null,
        };
    }
    isdislike =()=>{
        let disliked=this.state.disliked;
        if(disliked){
            if(disliked==='dislike'){
                this.setState({disliked:null})
                this.setState({dislike:this.state.dislike-1});
            }
            else
            {
                this.setState({disliked:'dislike'});
                this.setState({dislike:this.state.dislike+1});

            }
        }
        else {
            this.setState({
                dislike:this.state.dislike+1
            });
            this.setState({disliked:'dislike'});
        }
    };
    render(){
        let icon = DislikeOutlined;
        if (this.state.disliked !== null){
            icon = DislikeTwoTone;
        }
        return(
            <IconText
                onClick={this.isdislike}
                icon={icon}
                text={this.state.dislike}
                key="list-vertical-like-o"
                style={{width:60, cursor: "pointer"}}
            />
        );
    }
}

const Report = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <IconText icon={WarningOutlined} text="Report" onClick={showModal} style={{ cursor: "pointer"}}/>
            <Modal title="Report" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p style={{fontWeight:"bolder", fontFamily:"GothamBook"}}>
                    Are you sure to report this comment?
                </p>
                <Form
                    name="basic"
                    style={{fontSize:"3.0rem",fontWeight:"bolder", fontFamily:"GothamBook"}}
                >
                    <Form.Item
                        label="Report reason"
                        name="Reason"
                        rules={[{ required: true, message: 'Please leave your reason!' }]}
                    >
                        <Input.TextArea bordered={false} placeholder="Report reason..." style={{height:"80px",width:"350px"}}/>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};





class ProfPage extends React.Component{
    constructor(props){
        super(props)        
        let param = this.props.location.search.slice(1).split("=");
        this.state = {listData: listData, param:param};
        if (param[0] !== "v"){
            alert("Request not allowed!");
            window.location.href = "/";
        }
    }

    componentDidMount(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({netid: this.state.param[1]}),
            credentials: "include"
			}
        fetch("http://localhost:8081/public/view_professor", requestOptions)
        .then(response => {
            if (response.status === 200){
                return response.json();
            }
        })
        .then(json => {
            console.log(json);
            if (json.code === 200){
                console.log("setting");
                listData.professor_name = json.professor_name;
                listData.department = json.department;
                listData.rating = json.rating;
                listData.total_comments = json.total_comments;
                for (let h of json.courses){
                    listData.course_history.push({
                        course_name: h.course_name,
                        course_code: h.course_code,
                        semester:h.semester})
                }
                for (let c of json.comments){
                    listData.comment.push({
                        time: c.date.split("T")[0],
                        course_code:c.course_code,
                        username:c.student_id,
                        rating: c.rate,
                        content: c.content,
                        likes: c.likes,
                        dislikes: c.dislikes
                    });
                }
                
                this.setState({listData: listData})
                console.log(this.state.listData)
            }
        })
    }

    render(){
        let arr = this.state.listData.course_history;
        console.log("arr",arr);
        return(
            <Layout className="layout" style={{minHeight: "100%"}}>
                <MainHeader />
                <Breadcrumb style={{margin:"20px 8%"}}>
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Professor
                        </Breadcrumb.Item>
                </Breadcrumb>
                <Content className='ContentArea'>
                    <Row style={{marginTop:"10px", minHeight:"100%"}}>

                        <Col span={7} offset={1}>

                            <Row style={{height:"160px",marginTop:"20px" ,marginBottom:"80px"}}>
                                <h1 style={{fontSize:"2.0rem",fontWeight:"bolder", fontFamily:"GothamBook",width:"400px"}}>{this.state.listData.professor_name} </h1>
                                <h3 style={{fontSize:"1.5rem",fontWeight:"bold", fontFamily:"GothamBook",width:"400px"}}>{"from "+this.state.listData.department} </h3>
                                <Statistic style={{fontFamily:"GothamBook"}}
                                           value={this.state.listData.rating}
                                           suffix={" / 5 based on " + this.state.listData.total_comments +" comments"}
                                           valueStyle={{fontSize:"60px"}}
                                />
                            </Row>

                            <Row style={{marginTop:"40px"}}>
                                <h3 style={{fontSize:"1.0rem",fontWeight:"bolder",width:"400px"}}>
                                    {"Professor " + this.state.listData.professor_name + " has taught: "}
                                </h3>

                                <ul style={{fontSize:"1.0rem",fontWeight:"normal",width:"400px"}}>
                                    {
                                        arr.map((item, index) => {
                                            return <li key={index} style={{marginBottom:"5px"}}>
                                                {item.course_name + ", " + item.semester}
                                                <ul style={{fontSize:"12px"}}>
                                                    <li>
                                                        {"Course Code: "+item.course_code}
                                                    </li>
                                                </ul>
                                            </li>
                                        })
                                    }
                                </ul>
                            </Row>
                        </Col>

                        <Col span={15} style={{minHeight: "100%"}}>

                            <List
                                itemLayout="vertical"
                                size="large"
                                pagination={{
                                    onChange: page => {
                                        console.log(page);
                                        document.body.scrollIntoView();
                                    },
                                    pageSize: 5,
                                }}
                                dataSource={this.state.listData.comment}
                                style={{minHeight: "100%"}}
                                renderItem={item => (
                                    <List.Item
                                        className="listItemGeneral"
                                        style = {{marginTop:"15px",minHeight:"150px"}}
                                        key={item.title}
                                        actions={[
                                            <LikeBtn num={item.likes}/>,
                                            // <DisLikeBtn/>,
                                            <Report/>
                                        ]}
                                        extra={
                                            <Row>
                                                <Col span={24}>
                                                    <Statistic title="Rate"
                                                               value={item.rating}
                                                               prefix={<StarOutlined />}
                                                               suffix=" / 5"
                                                               valueStyle={{fontSize:"40px",marginTop:"15px"}}
                                                    />

                                                </Col>
                                            </Row>
                                        }
                                    >
                                        <List.Item.Meta
                                            className="listItemMetaGeneral"
                                            title={<p>{item.username+" from "+item.course_code}</p>}
                                            description={item.time}
                                        />
                                        {item.content}
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </Content>
                <Footer style={{ textAlign: 'center' }}>NYU Rates © 2021</Footer>
            </Layout>
        )
    }
}

export default ProfPage;