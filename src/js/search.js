import React from "react";
import {Layout, Row, Col, Skeleton, Switch, List, Breadcrumb} from "antd";
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import MainHeader from "../components/common/header";
import MainFooter from "../components/common/footer";
import IndexSearchWrapper from "../components/common/searchbar.jsx";
import ResultsList from "../components/common/searchResultList";

import "../css/fonts.css";
import "../css/search.css";
import {Link} from "react-router-dom";


class SearchPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            st:"", val:""
        }
    }

    componentDidMount() {
        console.log(this.props.location.search);
    }

    render(){
        return(
            <Layout className="layout" style={{minHeight: "100%"}}>
                <MainHeader/>
                <div id={"searchWrapperOuter"}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Search
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div id={"searchWrapperInner"}>
                        <h1>Showing Results For:  <span style={{fontSize:"1.8rem", fontFamily:"GothamBook"}}>Professor, Paul Andre Mellies</span></h1>
                        <IndexSearchWrapper history={this.props.history} styles={{maxHeight: "50px", width:"70%", zIndex:"90", position: "relative", margin:"15px auto"}}/>
                        <ResultsList />
                    </div>
                </div>
                <MainFooter />
            </Layout>
        )
    }

}

export default SearchPage;
