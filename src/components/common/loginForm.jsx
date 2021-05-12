import React, { Component } from 'react';
import { Form, Input, Button, Select} from 'antd';
import {login} from '../../services/authService';

const {Option} = Select;

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
  

  const LoginForm = () => {
    const onFinish = async(values) => {
      try {
        // console.log('Success:', values);
        login(values.email,values.role,values.password).then((response) => {
          if (response.data.code == 200){
            response.data["role"] = values.role;
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            window.location = '/';
          }
          else{
            alert("Login failed. Please try again.")
          }
        })
      } catch (error) {
        if (error.response){
          alert("Login failed. Please try again.")
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
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your registered email!',
            },
            {
                pattern:'[a-zA-Z0-9.-]+@nyu\.edu',
                message: 'This is not an NYU email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="role" label="Role" rules={[
            {
              required: true,
              message: 'Please select a role!'
            },
          ]}>
          <Select
              placeholder="Select a role"
              onChange={console.log(0)}
              allowClear
          >
              <Option value="student">Student</Option>
              <Option value="professor">Professor</Option>
          </Select>
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    );
  };
 
export default LoginForm;