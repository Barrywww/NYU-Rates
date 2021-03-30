import React, {Component} from "react";
import {Link} from "react-router-dom";
import {DownOutlined, UserOutlined, ReadOutlined, SearchOutlined} from '@ant-design/icons';
import {Layout, Menu, Breadcrumb, Input, Select, AutoComplete, Row, Col, Button, Dropdown} from 'antd';
//import { Button, Tooltip } from 'antd';
import "../css/index.css";
import 'antd/dist/antd.compact.css'
//import Like from '../components/common/like';
//import Dislike from '../components/common/dislike';

const { Header, Content, Footer } = Layout;
const {Option} = Select;

class IndexDropDown extends React.Component{
    constructor(props) {
        super(props);
        this.props = props;
        console.log(this.props);
        this.state = {selectedType: "", collapse: false};
        this.menu = (
            <Menu className={"menus"} style={{borderRadius:"5px"}} onClick={props.handleClick.bind(this)}>
                <Menu.Item key="Professor" icon={<UserOutlined style={{fontSize:"1rem"}}/>} style={{fontSize:"1rem"}}>
                    Professor
                </Menu.Item>
                <Menu.Item key="Course" icon={<ReadOutlined style={{fontSize:"1rem"}}/>} style={{fontSize:"1rem"}}>
                    Course
                </Menu.Item>
            </Menu>
        );
    }

    componentWillMount() {
        window.addEventListener('resize', this.props.handleResize.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.props.handleResize.bind(this))
    }

    render() {
        let prompt_words = "Search Type"
        if (this.props.selectedType !== "") {
             prompt_words = this.props.selectedType;
        }
        if (this.props.collapse){
            prompt_words = ""
        }
        return(
            <Dropdown overlay={this.menu} className={"dropdowns"}>
                <Button className={"buttons"} id={"indexTypeButton"} style={{height:"50px", width:"100%", borderRadius: "0 32px 32px 0", opacity:"0.9"}}>
                    {prompt_words} <DownOutlined />
                </Button>
            </Dropdown>
        )
    }
}

class IndexSearchWrapper extends Component{
    constructor(props) {
        super(props);
        this.state = {inputPrompt: "", selectedType: "", collapse: false}
        if (window.innerWidth < 900){
            this.setState((state) => ({collapse: true}))
        }
    }

    handleMenuClick({key}){
        this.setState((state) => ({selectedType: key}))
    }

    handleResize(){
        if (window.innerWidth < 900){
            this.setState((state) => ({collapse: true}))
        }
        else{
            this.setState((state) => ({collapse: false}))
        }
    }

    render() {
        let inputPrompt = "";
        if (this.state.selectedType === "Professor"){
            inputPrompt = "Professor name...";
        }
        else if (this.state.selectedType === "Course"){
            inputPrompt = "Course name...";
        }

        let SearchButton = <Button id={"indexSearchButton"} className={"buttons"}>Search</Button>;

        if (this.state.collapse){
            SearchButton = <Button id={"indexSearchButton"} shape="circle" icon={<SearchOutlined />} />;
        }


        return(
            <div id={"indexSearchWrapper"} style={{minHeight: "64px", width:"60%", zIndex:"90", position: "relative", margin:"50px  auto"}}>
                <Row align={"middle"} justify={"center"}>
                    <Col span={14} style={{borderRadius: "32px"}}>
                        <Input className={"inputs"} placeholder={inputPrompt} style={{height: "50px", lineHeight:"32px", fontSize:"26px", borderRadius:"32px 0 0 32px", opacity:"0.9", paddingLeft:"20px"}}/>
                    </Col>
                    <Col span={4}>
                        {/*<Input style={{height: "50px", lineHeight:"45px", fontSize:"26px", borderRadius:"0 32px 32px 0"}}/>*/}
                        <IndexDropDown collapse={this.state.collapse} selectedType={this.state.selectedType} handleClick={this.handleMenuClick.bind(this)} handleResize={this.handleResize.bind(this)}/>
                    </Col>
                    <Col span={1}/>
                    <Col span={4}>
                        {SearchButton}
                    </Col>
                </Row>
            </div>
        )
    }

}

class IndexPage extends Component{
    render(){
        return(
                <Layout className="layout" style={{minHeight: "100%"}}>
                    <Header className={"indexHeader"} style={{backgroundColor: 'white'}}>
                        <Link className="logo" to={"/"}>
                                <img src="/images/logo_withtitle.png" height="60px"/>
                        </Link>
                        <Menu className="headerMenu menus" theme="light" mode="horizontal">
                            <Menu.Item key="1">
                                <Link to={"/test"}>Login</Link>
                            </Menu.Item>
                            <Menu.Item key="2">Register</Menu.Item>
                            <Menu.Item key="3">About Us</Menu.Item>
                        </Menu>
                    </Header>
                    <div id={"bannerWrapper"}>
                        <div id={"bannerShade"}/>
                        <div className="imageRow1">
                            {/*<div class="imageColumn1">*/}
                            {/*    <img src = "/images/pointingRight.png" width="100%;"/>*/}
                            {/*    <p class="image1">This is where you can start!</p>*/}
                            {/*</div>*/}
                            {/*<div class="imageColumn1">*/}
                            {/*    <p class="image1">这里放搜索框，先别吐槽我这块怎么弄的😂整个页面背景颜色调的跟我图片搭一点，几乎看不出来的那种。css里也可以改图片间距，依搜索框大小而定吧</p>*/}
                            {/*</div>*/}
                            {/*<img id="indexBanner" src="/images/index_banner2.jpg" width="100%"/>*/}
                        </div>
                        <h1 id='bannerText'>
                            Your ultimate registration rescuer.
                            <div id='subText'>Try searching for a course/professor here</div>
                        </h1>
                        <IndexSearchWrapper />
                    </div>
                    <Content style={{ padding: '0 50px'}}>
                    </Content>
                    {/*这下面是管align好的三张图的 */}
                    <Row align={"middle"} justify={"center"} style={{marginTop:"40px"}}>
                        <Col span={8}>
                            <img src = "/images/Anonymity.png" style={{display:"block", margin:"20px auto", width:"50%"}} />
                            <p className="imageDesc">Anonymous</p>
                        </Col>
                        <Col span={8}>
                            <img src = "/images/Improvement.png" style={{display:"block", margin:"20px auto", width:"50%"}}/>
                            <p className="imageDesc">Improve Everyone</p>
                        </Col>
                        <Col span={8}>
                            <img src = "/images/Honesty.png" style={{display:"block", margin:"20px auto", width:"50%"}}/>
                            <p className="imageDesc">Be Honest</p>
                        </Col>
                    </Row>
                    {/*这里结束*/}

                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
                </Layout>
                )
        }
}

export default IndexPage;