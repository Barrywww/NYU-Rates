import React, {Component} from "react";
import {Layout, Select, Row, Col} from 'antd';
import "../css/index.css";
import MainHeader from "../components/common/header";
import MainFooter from "../components/common/footer";
import IndexSearchWrapper from "../components/common/searchbar";
import "../css/profile.css";
import {Table} from 'antd';
import ProfTable from '../components/common/profComment';


const {Header,Content,Footer} = Layout;
const {Option} = Select;

class ProfProfile extends Component {
/**
* profProfile类，教授的profile page.
* @constructor
* @param {object} state - current user's info
*/
    constructor(props) {
        super(props);
        this.state = {"user" : JSON.parse(localStorage.getItem('userInfo'))};
    }
    
    render() { 
        return ( 
            <Layout className="layout" style={{minHeight: "100%"}}>
                <MainHeader />
                <Content>   {/*这个div是头像和欢迎-->*/}
                <div style={{ display:"flex",justifyContent:'center', alignItems:"center", margin:'40px 0px'}}>
                        <div style={{textAlign: "center"}}>
                            <img src = "/images/userprofile.jpeg" style={{borderRadius:'80px', width:"75%"}} />
                            <p style={{marginBottom:'2px'}}>Professor Profile</p>
                        </div>
                        <div>
                            <h1 id='profile-bannerText'>{this.state.user.username}'s Personal Page</h1>
                            <p>You can check your received comments here</p>
                        </div>
                    </div>
                   {/*这个div是comment历史表*/}
                    <div className = "CommentSection" style={{margin:'40px 50px'}}>
                        <ProfTable/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
            </Layout>
         );
    }
}
 
export default ProfProfile;