import React, { Component } from 'react';
import {LikeOutlined,LikeFilled} from "@ant-design/icons";
import { Button } from 'antd';

//input: Boolean 按没按
//output:onClick
//<LikeOutlined />
//<LikeFilled />
//还没管后端赞量，handleLike()

class Like extends Component {
    render() { 
        if (!this.props.liked)   //如果没点喜欢
            return <Button onClick={this.props.onClick} type="default" shape="circle" icon={<LikeOutlined />} />;   
        return ( //如果喜欢
            <React.Fragment>  
                <Button onClick={this.props.onClick} type="default" shape="circle" icon={<LikeFilled />} />
            </React.Fragment>
            
         );
    }
}
 
export default Like;