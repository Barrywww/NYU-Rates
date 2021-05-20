import React from "react";
import {Layout, Row, Col, Skeleton, Switch, List, Breadcrumb} from "antd";
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import MainHeader from "../components/common/header";
import MainFooter from "../components/common/footer";
import IndexSearchWrapper from "../components/common/searchbar.jsx";
import ResultsList from "../components/common/searchResultList";
import ResultsListProf from "../components/common/searchResultListProf";

import "../css/fonts.css";
import "../css/search.css";
import {Link} from "react-router-dom";


class SearchPage extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.location.search);
        let param = this.props.location.search.slice(1).replace("%20", " ");
        param = param.split("&");
        let st;
        let val;
        for (let v of param){
            let sub = v.split("=");
            if (sub[0] == "st"){
                st = sub[1];
            }
            else if(sub[0] == "v"){
                val = sub[1];
            }
        }
        this.state = {
            st: st, val: val, result: [], loading:true
        }
        
        console.log(this.state);
        
    }

    componentDidMount(){
		if (this.state.st === "Professor"){
			const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({netid: this.state.val, name:this.state.val}),
            credentials: "include"
			}
			fetch("http://localhost:8081/public/search_professor/", requestOptions)
			.then(response => {
				if (response.status === 200) {
					return response.json()
				}
				else{
					alert("Search Failed. Please try again!");
				}
			}).then(json => {
				if (json.code === 200){
					const listData = [];
					for (let p of json.profList){
						listData.push({
							professor_name: p.name,
							department: p.dept,
							professor_link: `/profPage?v=${p.netid}`,
							comment: p.hot_comment,
							rating: p.rate
						})
					}
					setTimeout(()=>{this.setState({result: listData, loading: false})}, 1000);
					console.log(this.state);
				}
			})
		}
		else if (this.state.st === "Course"){
			const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({course_code: this.state.val, course_name:this.state.val}),
            credentials: "include"
			}
			fetch("http://localhost:8081/public/search_course/", requestOptions)
			.then(response => {
				if (response.status === 200) {
					return response.json()
				}
				else{
					alert("Search Failed. Please try again!");
				}
			}).then(json => {
				if (json.code === 200){
					const listData = [];
					for (let p of json.courseList){
						listData.push({
							course_name: p.course_name,
                            course_code: p.course_code,
							course_link: `/coursePage?v=${p.course_code}`,
							comment: p.hot_comment,
							rating: p.rate
						})
					}
					setTimeout(()=>{this.setState({result: listData, loading: false})}, 1000);
					console.log("set",this.state);
				}
			})
		}
    }

    render(){
        let resultList;
        if (this.state.st === "Professor"){
            resultList = <ResultsListProf data={this.state.result} loading={this.state.loading} />
        }
        else {
            resultList = <ResultsList data={this.state.result} loading={this.state.loading} />
        }
    
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
                    <div id={"searchWrapperInner"} style={{minWidth: "100%"}}>
                        <h1>Showing Results For:  <span style={{fontSize:"1.8rem", fontFamily:"GothamBook"}}>{this.state.st + ", " + this.state.val}</span></h1>
                        <IndexSearchWrapper history={this.props.history} styles={{maxHeight: "50px", width:"70%", zIndex:"90", position: "relative", margin:"15px auto"}}/>
                        {resultList}
                    </div>
                </div>
                <MainFooter />
            </Layout>
        )
    }

}

export default SearchPage;
