import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import {login} from '../../services/authService';   

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  

  const AddProfForm = () => {
    const onFinish = async(values) => {
      try {
        // console.log('Success:', values);
        login(values.profName,values.Department).then((response) => {
          if (response.data.code == 200){
            alert("Adding request posted! Please wait for our review!")  //告知成功信息
            window.location = '/';
          }
          else{
            alert("Add failed. Please try again.")
          }
        })
      } catch (error) {
        if (error.response){
          alert("Add failed. Please try again.")
        }
      }
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Professor Name"
          name="profName"
          rules={[
            {
              required: true,
              message: 'Please input new professor name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
        name="Department"
        label="Department"
        tooltip="Input the department he/she works in"
        rules={[
          {
            required: true,
            message: 'Please input his/her department!',
          },
        ]}
      >
        <Input />
      </Form.Item>
  
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };
 
export default AddProfForm;