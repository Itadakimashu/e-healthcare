import React, { useState } from 'react';
import { Card, Avatar, Typography, Button, Form, Input, DatePicker, Select, message } from 'antd';
import { EditOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons';
// import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const initialValues = {
    name: 'Edward Vincent',
    email: 'richardjameswap@gmail.com',
    phone: '+1 123 456 7890',
    address: '57th Cross, Richmond Circle, Church Road, London',
    gender: 'Male',
    birthday: moment('2024-07-20'),
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    message.success('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <Card style={{ maxWidth: 600, margin: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <Avatar size={64} src="https://xsgames.co/randomusers/avatar.php?g=male" />
        <Avatar size={64} icon={<UserOutlined />} style={{ marginLeft: 10 }} />
      </div>
      <Title level={2}>{initialValues.name}</Title>
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={onFinish}
        layout="vertical"
      >
        <Text strong>CONTACT INFORMATION</Text>
        <Form.Item name="email" label="Email Id:">
          {isEditing ? <Input /> : <Text>{initialValues.email}</Text>}
        </Form.Item>
        <Form.Item name="phone" label="Phone:">
          {isEditing ? <Input /> : <Text>{initialValues.phone}</Text>}
        </Form.Item>
        <Form.Item name="address" label="Address:">
          {isEditing ? <Input.TextArea rows={2} /> : <Text>{initialValues.address}</Text>}
        </Form.Item>
        <Text strong>BASIC INFORMATION</Text>
        <Form.Item name="gender" label="Gender:">
          {isEditing ? (
            <Select>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          ) : (
            <Text>{initialValues.gender}</Text>
          )}
        </Form.Item>
        <Form.Item name="birthday" label="Birthday:">
          {isEditing ? <DatePicker /> : <Text>{initialValues.birthday.format('DD MMM, YYYY')}</Text>}
        </Form.Item>
        <Form.Item>
          {isEditing ? (
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save Information
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)} icon={<EditOutlined />}>
              Edit
            </Button>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default MyProfile;