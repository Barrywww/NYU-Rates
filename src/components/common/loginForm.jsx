import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
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
  

  const LoginForm = () => {
    const onFinish = async(values) => {
      try {
        console.log('Success:', values);
        const {data} = await login(values.email,values.role,values.password);
        localStorage.setItem('userInfo',values);
        window.location = '/';

      } catch (error) {
        if (error.response && error.response.status == 400){
            alert(error.response.data);
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
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
        name="role"
        label="Role"
        tooltip="either 'student' or 'professor' NO CAPS"
        rules={[
          {
            required: true,
            message: 'Please input your role!',
          },
          {
              pattern:'(?:professor|student)',
              message: 'Input not valid! Check the tooltip!',
          }
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
  
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };
 
export default LoginForm;