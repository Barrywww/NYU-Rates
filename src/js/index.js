import React, {Component} from "react";
import {Layout, Select, Row, Col} from 'antd';
import MainHeader from "../components/common/header";
import MainFooter from "../components/common/footer";
import IndexSearchWrapper from "../components/common/searchbar";

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