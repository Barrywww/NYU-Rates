import React from "react";
import {List, Skeleton} from "antd";
import { StarOutlined} from '@ant-design/icons';
import { Statistic, Row, Col } from 'antd';

const listData = [];
for (let i = 0; i < 10; i++) {
    listData.push({
        professor_name: "",
        department: "",
        professor_link: '/',
        comment: "",
        rating: 5.0,
    });
}

class ResultsList extends React.Component {
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
        const loading  = this.state.loading;

        let fallback;
        if (!loading & this.state.data.length === 0){
            fallback = (<h3 style = {{textAlign: "center"}}><a href="/addProf">No Result? Try add a new profeesor here!</a></h3>)
        }

        return (
            <div>
                {fallback}
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
                                !loading && (
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
                            <Skeleton loading={loading} active avatar>
                                <Row style={{marginTop:"10px"}}>
                                    <Col span={6}>
                                        <List.Item.Meta
                                            title={<a href={item.professor_link} style={{fontSize:"24px"}}>{item.professor_name}</a>}
                                            description={item.department}
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
            </div>
        );
    }
}

export default ResultsList;