import React, {Component} from "react";
import {Layout, Select, Row, Col} from 'antd';
import "../css/index.css";
import MainHeader from "../components/common/header";
import MainFooter from "../components/common/footer";
import IndexSearchWrapper from "../components/common/searchbar";
//import Like from '../components/common/like';
//import Dislike from '../components/common/dislike';

const {Content} = Layout;
const {Option} = Select;



class IndexPage extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
                <Layout className="layout" style={{minHeight: "100%"}}>
                    <MainHeader />
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
                        <h1 id='index-bannerText'>
                            Your ultimate registration rescuer.
                            <div id='subText'>Try searching for a course/professor here</div>
                        </h1>
                        <IndexSearchWrapper history={this.props.history} styles={{minHeight: "64px", width:"60%", zIndex:"90", position: "relative", margin:"50px  auto"}}/>
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
                    <MainFooter />
                </Layout>
                )
        }
}

export default IndexPage;