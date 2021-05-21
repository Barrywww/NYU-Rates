import React from 'react';
import { Form, Input, Button } from 'antd';

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
    /**
     * Submit Prof Request Form
     * @return React.Component
     */
    const onFinish = async(values) => {
      const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        credentials: "include"
      }
      fetch("http://localhost:8081/student/addprofessor", requestOption).then(response => {
        if (response.status === 200){
          return response.json();
        }
        else{
          alert("Request failed, please try again!");
        }
      })
      .then(json => {
        if (json.code === 200){
          alert("Your request has been post. Please wait for our review!");
          window.location.href = "/";
        }
        else{
          alert("Request failed, please try again!");
        }
      })
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
          name="professor_name"
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
          label="Professor Email"
          name="professor_email"
          rules={[
            {
              required: true,
              message: 'Please input new professor email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
        name="professor_dept"
        label="Professor Department"
        rules={[
          {
            required: true,
            message: 'Please input his/her department!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="professor_course_name"
        label="Course Name"
        rules={[
          {
            required: true,
            message: 'Please input the course name that you rate.'
          },
        ]}
      >
        <Input />
      </Form.Item>

      
      <Form.Item
        name="professor_course_code"
        label="Course Code"
        rules={[
          {
            required: true,
            message: 'Please input the course code that you rate.'
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="professor_course_semester"
        label="Semester"
        rules={[
          {
            required: true,
            message: 'Please input the course semester that you rate.'
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