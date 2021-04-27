import React, { Component } from 'react';
import axios from 'axios';

export const columns = [
    {
      title: 'Professor Name',
      dataIndex: 'name',
    },
    {
      title: 'Course Name',
      dataIndex: 'course',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
    },
    {
        title: 'Comment Time',
        dataIndex: 'time',
    },
  ];

 
export const {data : comments} = async () => await axios.get('xxxx'); //从后端获取comment数据
                                                                    //需要做成规范样式作为param传进table

export const data = [
    {
      key: 1,
      name: 'John Brown',
      course: 'Maths',
      rate: 32,
      time: 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: 2,
      name: 'Jim Green',
      course: 'Maths',
      rate: 42,
      time: 'London No. 1 Lake Park',
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      key: 3,
      name: 'John',
      course: 'Maths',
      rate: 29,
      time: 'Jiangsu No. 1 Lake Park',
      description: 'I hate him.',
    },
    {
      key: 4,
      name: 'Joe Black',
      course: 'Maths',
      rate: 32,
      time: 'Sidney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
    {
        key: 5,
        name: 'Joe Black',
        course: 'Maths',
        rate: 32,
        time: 'Sidney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
      },
      {
        key: 6,
        name: 'Joe Black',
        course: 'Maths',
        rate: 32,
        time: 'Sidney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
      },
      {
        key: 7,
        name: 'Joe Black',
        course: 'Maths',
        rate: 32,
        time: 'Sidney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
      },
      {
        key: 8,
        name: 'Joe Black',
        course: 'Maths',
        rate: 32,
        time: 'Sidney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
      },
      {
        key: 9,
        name: 'Joe Black',
        course: 'Maths',
        rate: 32,
        time: 'Sidney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
      },
      {
        key: 10,
        name: 'Joe Black',
        course: 'Maths',
        rate: 32,
        time: 'Sidney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
      },
      {
        key: 10,
        name: 'Joe Black',
        course: 'Maths',
        rate: 32,
        time: 'Sidney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
      },
  ];


