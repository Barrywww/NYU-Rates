import React,{ useState } from 'react';
import {Link} from "react-router-dom";
import {Layout, Menu} from "antd";
import { TreeSelect } from 'antd';
import "../../css/index.css"
const {Header} = Layout;
const { TreeNode } = TreeSelect;



class MainHeader extends React.Component{
    constructor(props){
        super(props)
        this.state = {"user":JSON.parse(localStorage.getItem('userInfo'))} //用给下面conditional rendering
    }
    
    render(){
        let conditionMenu = (
                <React.Fragment>
                    <Menu.Item key="1">
                        <Link to={"/login"}>Login</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={"/register"}>Register</Link>
                    </Menu.Item>
                </React.Fragment>
        );
        if (this.state.user !== null){
            if (this.state.user.role == "student"){
                conditionMenu = (
                    <React.Fragment>
                        <Menu.Item key="1">
                            <Link to={"/profile"}>Hi, {this.state.user.username}!</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={"/logout"}>Logout</Link>
                        </Menu.Item>
                    </React.Fragment> 
                )
            }
            else if (this.state.user.role == "professor"){
                conditionMenu = (
                    <React.Fragment>
                        <Menu.Item key="1">
                            <Link to={"/profprofile"}>Hi, {this.state.user.username}!</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={"/logout"}>Logout</Link>
                        </Menu.Item>
                    </React.Fragment>
                )
            }
        }

        return (
            <Header className={"indexHeader"} style={{backgroundColor: 'white'}}>
                <a className="logo" href="/">
                    <img src="/images/logo_withtitle.png" height="60px"/>
                </a>

                <TreeSelect
                    showSearch={false}
                    style={{ width: '120px', marginTop: "22px" }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'scroll', minWidth:"250px" }}
                    placeholder="Departments"
                    allowClear
                    treeDefaultExpandAll = {false}
                >
                    <TreeNode value="natural science" title="natural science" selectable={false}>
                        <TreeNode value="Biology"  title="Biology" selectable={false}>
                            <TreeNode value="Foundations of Biology I" title="Foundations of Biology I" selectable={false}/>
                            <TreeNode value="Foundations of Biology II" title="Foundations of Biology II" selectable={false}/>
                            <TreeNode value="FoS Biology Lab*" title="FoS Biology Lab*" selectable={false}/>
                        </TreeNode>
                        <TreeNode value="Chemistry"  title="Chemistry"selectable={false}>
                            <TreeNode value="Foundations of Chemistry I" title="Foundations of Chemistry I"selectable={false} />
                            <TreeNode value="Foundations of Chemistry II" title="Foundations of Chemistry II" selectable={false}/>
                            <TreeNode value="FoS Chemistry I Lab" title="FoS Chemistry I Lab" selectable={false}/>
                        </TreeNode>
                        <TreeNode value="Physics"  title="Physics" selectable={false}>
                            <TreeNode value="Foundations of Physics I Honors" title="Foundations of Physics I Honors" selectable={false}/>
                            <TreeNode value="Foundations of Physics II Honors" title="Foundations of Physics II Honors" selectable={false}/>
                            <TreeNode value="FoS Physics I Lab" title="FoS Physics I Lab" selectable={false}/>
                        </TreeNode>
                    </TreeNode>

                    <TreeNode value="Business" title="Business" selectable={false}>
                        <TreeNode value="Business and Marketing"  title="Business and Marketing"selectable={false}>
                            <TreeNode value="Introduction to Marketing" title="Introduction to Marketing" selectable={false}/>
                            <TreeNode value="Strategic Marketing in China" title="Strategic Marketing in China" selectable={false}/>
                        </TreeNode>
                        <TreeNode value="Business and Finance"  title="Business and Finance"selectable={false}>
                            <TreeNode value="Corporate Finance" title="Corporate Finance" selectable={false}/>
                            <TreeNode value="Investing & Financing in China" title="Investing & Financing in China" selectable={false}/>
                        </TreeNode>
                        <TreeNode value="Economics"  title="Economics"selectable={false}>
                            <TreeNode value="International Economics" title="International Economics" selectable={false}/>
                            <TreeNode value="Political Economy of East Asia" title="Political Economy of East Asia" selectable={false}/>
                        </TreeNode>
                    </TreeNode>

                    <TreeNode value="Computer" title="Computer" >
                        <TreeNode value="Computer Science"  title="Computer Science">
                            <TreeNode value="Introduction to Computer Science" title="Introduction to Computer Science" />
                            <TreeNode value="Data Structures" title="Data Structures" />
                        </TreeNode>
                        <TreeNode value="Computer Systems Engineering"  title="Computer Systems Engineering">
                            <TreeNode value="Machine Learning" title="Machine Learning" />
                        </TreeNode>
                        <TreeNode value="Data Science"  title="Data Science">
                            <TreeNode value="Machine Learning" title="Machine Learning" />
                        </TreeNode>
                        <TreeNode value="Electrical and Systems Engineering"  title="Electrical and Systems Engineering">
                            <TreeNode value="Feedback Control Systems" title="Feedback Control Systems" />
                        </TreeNode>
                    </TreeNode>

                    <TreeNode value="Math" title="Math" >
                        <TreeNode value="Mathematics"  title="Mathematics">
                            <TreeNode value="Multivariable Calculus" title="Multivariable Calculus" />
                        </TreeNode>
                        <TreeNode value="Honors Mathematics"  title="Honors Mathematics">
                            <TreeNode value="Honors Analysis I" title="Honors Analysis I" />
                        </TreeNode>
                    </TreeNode>

                    <TreeNode value="Social" title="Social" >
                        <TreeNode value="Global China Studies"  title="Global China Studies">
                            <TreeNode value="The Concept of China" title="The Concept of China" />
                        </TreeNode>
                        <TreeNode value="Humanities"  title="Humanities">
                            <TreeNode value="Honors Analysis I" title="Honors Analysis I" />
                        </TreeNode>
                        <TreeNode value="Social Science"  title="Social Science">
                            <TreeNode value="Ethnographic Thinking" title="Ethnographic Thinking" />
                        </TreeNode>
                    </TreeNode>
                </TreeSelect>


                <Menu className="headerMenu menus" theme="light" mode="horizontal">
                    {conditionMenu}
                    <Menu.Item key="3">
                        <Link to={"/AboutUs"}>About Us</Link>
                    </Menu.Item>
                </Menu>
            </Header>
        )
    }
}

export default MainHeader;