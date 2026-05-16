import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, MailOutlined, CodeOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

const { Title, Text } = Typography;

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Split skills by comma and trim
      const skillsArray = values.skills.split(',').map(skill => skill.trim()).filter(s => s);
      
      const res = await API.post('/user/create', {
        name: values.name,
        email: values.email,
        skills: skillsArray
      });

      message.success('User created successfully!');
      
      // Store user ID temporarily to access dashboard
      localStorage.setItem('userId', res.data._id);
      navigate('/dashboard');
    } catch (error) {
      message.error(error.response?.data?.message || 'Registration failed. User might already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <Card style={{ width: '100%', maxWidth: 450, padding: '20px' }} className="glass-panel">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0, color: 'var(--primary)' }}>Skill Gap Analysis System</Title>
          <Text type="secondary">Create an account to track your skills</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish} size="large">
          <Form.Item 
            label="Name" 
            name="name" 
            rules={[{ required: true, message: 'Please enter your name!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="John Doe" />
          </Form.Item>

          <Form.Item 
            label="Email" 
            name="email" 
            rules={[{ required: true, message: 'Please enter your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="john@example.com" />
          </Form.Item>

          <Form.Item 
            label="Skills (comma separated)" 
            name="skills" 
            rules={[{ required: true, message: 'Please enter at least one skill!' }]}
            extra="Example: React, Node, MongoDB"
          >
            <Input prefix={<CodeOutlined className="site-form-item-icon" />} placeholder="React, Node, MongoDB" />
          </Form.Item>

          <Form.Item style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" block loading={loading}>
              CREATE USER
            </Button>
          </Form.Item>
          
          <div style={{ textAlign: 'center' }}>
            <Link to="/dashboard">Go to Dashboard (if already registered)</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
