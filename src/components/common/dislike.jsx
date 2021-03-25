import React, { Component } from 'react';
import {DislikeOutlined,DislikeFilled} from "@ant-design/icons";
import { Button } from 'antd';

//input: Boolean 按没按
//output:onClick
//<DislikeOutlined />
//<DislikeFilled />
//还没管后端不赞量,handleDislike()

class Dislike extends Component {
    render() { 
        if (!this.props.disliked)   //如果没点不喜欢
            return <Button onClick={this.props.onClick} type="default" shape="circle" icon={<DislikeOutlined />} />;   
        return ( //如果点了不喜欢
            <React.Fragment>  
                <Button onClick={this.props.onClick} type="default" shape="circle" icon={<DislikeFilled />} />
            </React.Fragment>
            
         );
    }
}
 
export default Like;