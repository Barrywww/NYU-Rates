import React from "react";
import {BrowserRouter, Link} from "react-router-dom";
import {useRouteMatch} from "react-router";
import { DownOutlined, UserOutlined, ReadOutlined } from '@ant-design/icons';
import {Layout, Menu, Breadcrumb, Input, Select, AutoComplete, Row, Col, Button, Dropdown} from 'antd';

// function App() {return <h1>Hello World!</h1>}
const { Header, Content, Footer } = Layout;
const {Option} = Select;

class TestPage extends React.Component{
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
            </Layout>
            
        )
    }
}


// class TestRouter extends React.Component{
//     constructor(props) {
//         super(props);
//         this.match = props.match;
//     }
//
//     render() {
//         console.log(this.match);
//         return (
//             <TestPage/>
//         )
//     }
// }

// function TestRouter(props){
//     console.log(props.match)
// }


// const TestRouter = (match) => {
//     console.log(match);
//     let {path, url} = useRouteMatch();
//     console.log(path);
//     console.log(url);
//     return (<TestPage/>);
// }

export default TestPage;