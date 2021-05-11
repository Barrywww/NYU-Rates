import React from "react";
import {Switch, List, Skeleton, Avatar, Space} from "antd";
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Statistic, Row, Col } from 'antd';

/*const listData = [];
for (let i = 0; i < 3; i++) {
    listData.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}*/

const listData = [];
for (let i = 0; i < 20; i++) {
    listData.push({
        course_name: `Barry ${i}`,
        course_code: "yw3752",
        course_link: 'https://ant.design',
        comment: "I am Barry",
        rating: 5.0,
        likes: 100,
        num_comments: 100,
    });
}

const IconText = ({ icon, text }) => (
    <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
        {text}
  </span>
);


class ResultsList extends React.Component {
    state = {
        loading: true,
    };

    onChange = checked => {
        this.setState({ loading: !checked });
    };

    render() {
        const { loading } = this.state;

        return (
            <>
                <Switch checked={!loading} onChange={this.onChange} />

                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                            document.body.scrollIntoView();
                        },
                        pageSize: 10,
                    }}
                    dataSource={listData}
                    renderItem={item => (
                        <List.Item
                            className="listItemGeneral"
                            key={item.title}
                            actions={
                                !loading && [
                                    <IconText icon={LikeOutlined} text={item.likes} key="list-vertical-like-o" />,
                                    <IconText icon={MessageOutlined} text={item.num_comments} key="list-vertical-message" />,
                                ]
                            }

                            extra={
                                !loading && (
                                    <Row>
                                        <Col span={200}>
                                            <Statistic title="Rate"
                                                       value={item.rating}
                                                       prefix={<StarOutlined />}
                                                       suffix=" / 5"
                                                       valueStyle={{fontSize:"40px",marginTop:"15px"}}
                                                       className="statisticsGeneral"
                                            />

                                        </Col>
                                    </Row>

                                )
                            }
                        >
                            <Skeleton loading={loading} active avatar>
                                <Row style={{marginTop:"10px"}}>
                                    <Col span={4}>
                                        <List.Item.Meta
                                            title={<a href={item.course_link} style={{fontSize:"18px"}}>{item.course_name}</a>}
                                            description={item.course_code}
                                        />
                                    </Col>
                                    <Col span={20}>
                                        {item.comment}
                                    </Col>
                                </Row>

                            </Skeleton>
                        </List.Item>
                    )}
                />
            </>
        );
    }
}

export default ResultsList;