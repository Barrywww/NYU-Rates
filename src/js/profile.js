import React, {Component} from "react";
import {Layout, Select, Row, Col} from 'antd';
import "../css/index.css";
import MainHeader from "../components/common/header";
import MainFooter from "../components/common/footer";
import IndexSearchWrapper from "../components/common/searchbar";
import "../css/profile.css";
import {Table} from 'antd';
import {columns} from '../components/common/commentTable';
import http from "../services/httpService";

const {Header,Content,Footer} = Layout;
const {Option} = Select;

class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {"user" : JSON.parse(localStorage.getItem('userInfo')), data:[]};
    }

    componentDidMount() {
        http.get("student/viewhistory")
        .then(response => {
            if (response.data.code === 200){
                let d = [];
                for (let c of response.data.comments){
                    d.push({
                        key: c.comment_id,
                        name: c.professor_name,
                        course: c.course_name,
                        rate: c.rate,
                        time: c.date.split("T")[0],
                        description: c.content
                    })
                }
                this.setState({data: d});
            }
        })
    }
    
    render() { 
        return ( 
            <Layout className="layout" style={{minHeight: "100%"}}>
                <MainHeader />
                <Content>   {/*这个div是头像和欢迎-->*/}
                    <div style={{ display:"flex",justifyContent:'center', alignItems:"center", margin:'40px 0px'}}>
                        <div style={{textAlign: "center"}}>
                            <img src = "/images/userprofile.jpeg" style={{borderRadius:'80px', width:"75%"}} />
                            <p style={{marginBottom:'2px'}}>Student Profile</p>
                        </div>
                        <div style={{marginLeft:'30px'}}>
                            <h1 id='profile-bannerText'>{this.state.user.username}'s Personal Page</h1>
                            <p>You can check your comment history here</p>
                        </div>
                    </div>
                   {/*这个div是comment历史表*/}
                    <div className = "CommentSection" style={{margin:'40px 50px'}}>
                        <Table columns={columns} expandable={{
                            expandedRowRender: record => <p style={{ margin: 0,fontSize:'1rem' }}>{record.description}</p>,
                            rowExpandable: record => record.name !== 'Not Expandable',
                            }} dataSource={this.state.data}/>
                    </div>
                </Content>
                <MainFooter />
            </Layout>
         );
    }
}
 
export default profile;