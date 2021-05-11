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
import "../css/AboutUs.css";
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
import { Modal } from 'antd';

// function App() {return <h1>Hello World!</h1>}
const { Header, Content, Footer } = Layout;
const {Option} = Select;







// const listData = [];
// for (let i = 0; i < 23; i++) {
//     listData.push({
//         href: 'https://ant.design',
//         title: `ant design part ${i}`,
//         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//         description:
//             'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//         content:
//             'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//     });
// }

const listData = {
    course_name:"Introduce To Computer Porgramming",
    rating:5.0,
    comment:[],
    total_comments:23,
    offered_semesters:["Spring 2020","Spring 2020","Spring 2020","Spring 2020","Spring 2020"]
}
for (let i = 0; i < listData.total_comments; i++) {
    listData.comment.push({
        time: "2021-05-06 01:53",
        username:`Barry ${i}`,
        rating: "5",
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

function handleChange(value) {
    console.log(`selected ${value}`);
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
            like:100,
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
            dislike:100,
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
                        <Input.TextArea bordered={false} placeholder="Leave your comment here!" style={{height:"80px",width:"350px"}}/>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};



class AboutUs extends React.Component{

    render(){
        let arr = listData.offered_semesters
        return(
            <Layout className="layout" style={{minHeight: "100%"}}>
                <MainHeader />
                <Content className='ContentArea'>
                    <Row style={{marginTop:"10px"}}>

                        <Col span={7} offset={3}>

                            <Row style={{height:"160px", marginTop:"20px" ,marginBottom:"80px"}}>
                                <h1 style={{fontSize:"2.0rem",fontWeight:"bolder", fontFamily:"GothamBook",width:"400px"}}>{listData.course_name} </h1>
                                <Statistic style={{fontFamily:"GothamBook"}}
                                           value={listData.rating}
                                           suffix={" / 5 based on " + listData.total_comments +" comments"}
                                           valueStyle={{fontSize:"60px"}}
                                />
                            </Row>



                            <Row style={{marginTop:"40px"}}>
                                <h3 style={{fontSize:"1.0rem",fontWeight:"bolder",width:"400px"}}>
                                    Course is offered in:
                                </h3>

                                <ul style={{fontSize:"1.0rem",fontWeight:"normal",width:"400px"}}>
                                    {
                                        arr.map((item, index) => {
                                            return <li key={index}>{item}</li>
                                        })
                                    }
                                </ul>
                            </Row>

                            <p>
                                <h2 style={{fontSize:"1.0rem",width:"400px"}}>
                                    Rate This Course below
                                    <DownCircleOutlined style={{marginLeft: "10px"}}/>
                                </h2>

                            </p>


                            <Form
                                name="basic"

                                style={{fontSize:"3.0rem",fontWeight:"bolder", fontFamily:"GothamBook"}}
                            >
                                <Form.Item
                                    label="Rate"
                                    name="rate"
                                    rules={[{ required: true, message: 'Please input your rate!' }]}
                                >
                                    <Rate style={{marginLeft:"35px"}}/>
                                </Form.Item>

                                <Form.Item
                                    label="Comment"
                                    name="comment"
                                    rules={[{ required: true, message: 'Please leave your comment!' }]}
                                >
                                    <Input.TextArea placeholder="Leave your comment here!" style={{height:"120px",width:"280px"}}/>
                                </Form.Item>

                                <Form.Item >
                                    <Button type="primary" htmlType="submit" >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>

                        <Col span={11}>

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
                                dataSource={listData.comment}

                                renderItem={item => (
                                    <List.Item
                                        className="listItemGeneral"
                                        style = {{marginTop:"15px",minHeight:"150px"}}
                                        key={item.title}
                                        actions={[
                                            <LikeBtn/>,
                                            <DisLikeBtn/>,
                                            <Report/>
                                        ]}
                                        extra={
                                            <Row>
                                                <Col span={200}>
                                                    <Statistic title="Rate"
                                                               value={5}
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
                                            avatar={<Avatar icon={<UserOutlined/>} />}
                                            title={<a href={item.href}>{item.username}</a>}
                                            description={item.time}
                                        />
                                        {item.content}
                                    </List.Item>
                                )}
                            />


                        </Col>
                    </Row>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
            </Layout>


        )
    }
}

export default AboutUs;