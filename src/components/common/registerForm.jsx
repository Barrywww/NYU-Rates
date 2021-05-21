import React, { useState } from 'react';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import http from "../../services/httpService";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState("student");

  const onFinish = async(values) => {
      if (selectedRole === "student"){
        http.post("public/regist_student",{
          email : values.email,
          netid: values.email.split("@")[0],
          password : values.password,
          name : values.name
        }).then(response => {
        if (response.data.code === 200){
          alert("Register success!");
          window.location.href="/login";
        }
        else{
          alert("Register failed. Please check your information.")
        }
        })
      }
      else if (selectedRole === "professor"){
        http.post("public/regist_professor",{
          email : values.email,
          netid: values.email.split("@")[0],
          password : values.password,
          name : values.name,
          dept: values.department
        }).then(response => {
        if (response.data.code === 200){
          alert("Register success!");
          window.location.href="/login";
        }
        else{
          alert("Register failed. Please check your information.")
        }
        })
      }

  };

  const handleSelect = (value) => {
    setSelectedRole(value);
  };

  const professorDept = (
    <Form.Item
      name="department"
      label="Department"
      rules={[
        {
          required: true,
          message: 'Please input your department',
          whitespace: true,
        },
      ]}
      >
      <Input />
   </Form.Item>
  )
    
  let placeholder;
    if (selectedRole === "professor")  {
        placeholder = professorDept;
    }
    else{
        placeholder = "";    
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
    <Form.Item name="role" label="Role" rules={[
          {
            required: true,
            message: 'Please select a role!'
          },
        ]}>
        <Select
            id = "role-input"
            placeholder="Select a role"
            onChange={handleSelect}
            allowClear
        >
            <Option value="student">Student</Option>
            <Option value="professor">Professor</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        tooltip="Must be a legit NYU email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
          {
              pattern:'[a-zA-Z0-9.-]+@nyu\.edu',
              message: 'This is not an NYU email!',
          }
        ]}
      >
        <Input id="email-input"/>
      </Form.Item>



      <Form.Item
        name="password"
        label="Password"
        tooltip="No rules for password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password id="password-input"/>
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
            whitespace: true,
          },
        ]}
      >
        <Input id="name-input"/>
      </Form.Item>

      {placeholder}

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm ;