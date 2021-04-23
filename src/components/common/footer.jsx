import React from "react";
import {Layout} from "antd";

const {Footer} = Layout;

function MainFooter(){
    return (
        <Footer id={"globalFooter"} style={{ textAlign: 'center' }}>
            <p style={{margin: 0}}>
                NYU Rates © 2020-2021
            </p>
            <p style={{margin: 0}}>
                Proudly Presented By Barry, Joseph, Kaan, Max.
            </p>
        </Footer>
    )
}

export default MainFooter;