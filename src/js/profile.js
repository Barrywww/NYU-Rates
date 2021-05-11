import React, {Component} from "react";
import {Layout, Select, Row, Col} from 'antd';
import "../css/index.css";
import MainHeader from "../components/common/header";
import MainFooter from "../components/common/footer";
import IndexSearchWrapper from "../components/common/searchbar";
import "../css/profile.css";
import {Table} from 'antd';
import {data,columns,comments} from '../components/common/commentTable';

const {Header,Content,Footer} = Layout;
const {Option} = Select;

class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {"user" : JSON.parse(localStorage.getItem('userInfo'))};
    }

    componentDidMount() {
        const commentContent = {comments};
    }
    
    render() { 
        return ( 
            <Layout className="layout" style={{minHeight: "100%"}}>
                <MainHeader />
                <Content>   {/*这个div是头像和欢迎-->*/}
                    <div style={{ display:"flex",justifyContent:'center',margin:'40px 0px'}}>
                        <div>
                            <img src = "/images/userprofile.jpeg" style={{display:"block",borderRadius:'80px'}} />
                            <p style={{marginBottom:'2px'}}>Student Profile</p>
                            <p>email : {this.state.user.email}</p>
                        </div>
                        <div style={{marginLeft:'70px',marginTop:'50px'}}>
                            <h1 id='profile-bannerText'>{this.state.user.username}'s Personal Page</h1>
                            <p>You can check your comment history here</p>
                        </div>
                    </div>
                   {/*这个div是comment历史表*/}
                    <div className = "CommentSection" style={{margin:'40px 50px'}}>
                        <Table columns={columns} expandable={{
                            expandedRowRender: record => <p style={{ margin: 0,fontSize:'1rem' }}>{record.description}</p>,
                            rowExpandable: record => record.name !== 'Not Expandable',
                            }} dataSource={data}/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
            </Layout>
         );
    }
}
 
export default profile;