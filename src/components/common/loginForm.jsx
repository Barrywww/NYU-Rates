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
        name="role"
        label="Role"
        tooltip="either 'student' or 'professor' NO CAPS"
        rules={[
          {
            required: true,
            message: 'Please input your role!',
          },
          {
              pattern:'(^professor$|^student$)',
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