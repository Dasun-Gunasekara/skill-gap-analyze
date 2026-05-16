import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

const { Title, Text } = Typography;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await API.post('/user/login', {
        email: values.email
      });

      message.success('Logged in successfully!');
      
      // Store user ID temporarily to access dashboard
      localStorage.setItem('userId', res.data._id);
      navigate('/dashboard');
    } catch (error) {
      message.error(error.response?.data?.message || 'Login failed. User not found.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <Card style={{ width: '100%', maxWidth: 450, padding: '20px' }} className="glass-panel">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0, color: 'var(--primary)' }}>Welcome Back</Title>
          <Text type="secondary">Log in to track your skill gaps</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish} size="large">
          <Form.Item 
            label="Email" 
            name="email" 
            rules={[{ required: true, message: 'Please enter your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="john@example.com" />
          </Form.Item>

          <Form.Item style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" block loading={loading}>
              LOG IN
            </Button>
          </Form.Item>
          
          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">Don't have an account? </Text>
            <Link to="/register">Register</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
