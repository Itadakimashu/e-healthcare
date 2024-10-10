import React from 'react';
import { Form, Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddDoctor = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
    message.success('Doctor added successfully!');
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="add-doctor-form">
      <h2>Add Doctor</h2>
      <Form
        form={form}
        name="add_doctor"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Upload doctor picture</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="name" label="Doctor name" rules={[{ required: true, message: 'Please input the doctor\'s name!' }]}>
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item name="specialty" label="Specialty" rules={[{ required: true, message: 'Please select the specialty!' }]}>
          <Select placeholder="General physician">
            <Option value="general">General physician</Option>
            <Option value="cardiology">Cardiology</Option>
            <Option value="neurology">Neurology</Option>
          </Select>
        </Form.Item>

        <Form.Item name="email" label="Doctor Email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
          <Input placeholder="Your email" />
        </Form.Item>

        <Form.Item name="education" label="Education" rules={[{ required: true, message: 'Please input the education!' }]}>
          <Input placeholder="Education" />
        </Form.Item>

        <Form.Item name="password" label="Doctor Password" rules={[{ required: true, message: 'Please input the password!' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item name="address1" label="Address" rules={[{ required: true, message: 'Please input the address!' }]}>
          <Input placeholder="Address 1" />
        </Form.Item>

        <Form.Item name="address2">
          <Input placeholder="Address 2" />
        </Form.Item>

        <Form.Item name="experience" label="Experience" rules={[{ required: true, message: 'Please select the experience!' }]}>
          <Select placeholder="Experience">
            <Option value="1-3">1-3 years</Option>
            <Option value="4-6">4-6 years</Option>
            <Option value="7+">7+ years</Option>
          </Select>
        </Form.Item>

        <Form.Item name="fees" label="Fees" rules={[{ required: true, message: 'Please input the fees!' }]}>
          <Input placeholder="Your fees" />
        </Form.Item>

        <Form.Item name="about" label="About me">
          <Input.TextArea rows={4} placeholder="Write about yourself" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add doctor
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddDoctor;