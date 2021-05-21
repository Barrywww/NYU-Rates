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
//填充data
export const data = [
    {
      key: 1,
      name: 'Paul Andre Mellies',
      course: 'Computer Architecture',
      rate: 5.0,
      time: '2020-12-15',
      description: 'This course is good to take!',
    },    
    {
      key: 2,
      name: 'Paul Andre Mellies',
      course: 'Computer Architecture',
      rate: 3.5,
      time: '2021-04-15',
      description: 'Nice Professor!',
    },
    {
      key: 3,
      name: 'Paul Andre Mellies',
      course: 'Computer Architecture',
      rate: 5.0,
      time: '2020-09-15',
      description: 'Learned a lot!',
    },
    
  ];


