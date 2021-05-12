import React from "react";
import {Button, Col, Dropdown, Input, Menu, Row} from "antd";
import {DownOutlined, ReadOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";

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

    componentDidMount() {
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

class IndexSearchWrapper extends React.Component{
    constructor(props) {
        super(props);
        this.state = {inputPrompt: "", selectedType: "", collapse: false}
        if (window.innerWidth < 900){
            this.setState((state) => ({collapse: true}))
        }
        this.inputRef = React.createRef();
    }

    handleSearch(){
        console.log(this.inputRef.current);
        // this.props.history.push("/search?st="+this.state.selectedType + "&v=" + this.inputRef.current.state.value);
        window.location.href = "/search?st="+this.state.selectedType + "&v=" + this.inputRef.current.state.value;
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

    componentDidMount(){
        this.inputRef.current.focus();
    }

    render() {
        let inputPrompt = "";
        if (this.state.selectedType === "Professor"){
            inputPrompt = "Professor name...";
        }
        else if (this.state.selectedType === "Course"){
            inputPrompt = "Course name...";
        }

        let SearchButton = <Button id={"indexSearchButton"} className={"buttons"} onClick={this.handleSearch.bind(this)}>Search</Button>;

        if (this.state.collapse){
            SearchButton = <Button id={"indexSearchButton"} shape="circle" icon={<SearchOutlined />} onClick={this.handleSearch.bind(this)}/>;
        }


        return(
            <div id={"indexSearchWrapper"} style={this.props.styles}>
                <Row align={"middle"} justify={"center"}>
                    <Col span={14} style={{borderRadius: "32px"}}>
                        <Input ref={this.inputRef} className={"inputs"} placeholder={inputPrompt}
                               style={{height: "50px", lineHeight:"32px", fontSize:"26px", borderRadius:"32px 0 0 32px", opacity:"0.9", paddingLeft:"20px"}}/>
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

export default IndexSearchWrapper;