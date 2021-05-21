import React from "react";
import {List, Skeleton} from "antd";
import { StarOutlined} from '@ant-design/icons';
import { Statistic, Row, Col } from 'antd';

const listData = [];
for (let i = 0; i < 10; i++) {
    listData.push({
        course_name: "",
        course_code: "",
        course_link: '/',
        comment: "",
        rating: 5.0
    });
}


class ResultsList extends React.Component {
    /**
     * the search result list for course
     * @param {object} state - the result list for courses that match with the input information
     */
	constructor(props){
        super(props)
		this.state = {loading: true, data: listData};
	}
	
    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.loading === false){
            console.log(nextProps.data);
            return {data: nextProps.data, loading: false};
        }
        return null;
    }

    render() {
        return (
            <>
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
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item
                            className="listItemGeneral"
                            key={item.title}

                            extra={
                                !this.state.loading && (
                                    <Row>
                                        <Col span={24}>
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
                            <Skeleton loading={this.state.loading} active avatar>
                                <Row style={{marginTop:"10px"}}>
                                    <Col span={6}>
                                        <List.Item.Meta
                                            title={<a href={item.course_link} style={{fontSize:"24px"}}>{item.course_name}</a>}
                                            description={item.course_code}
                                        />
                                    </Col>
                                    <Col span={18}>
										<h2>- Hot Comment -</h2>
                                        <h3>{item.comment}</h3>
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