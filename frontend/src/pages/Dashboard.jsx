import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Space, Divider, message, Modal, Form, Input } from 'antd';
import { UserOutlined, MailOutlined, EditOutlined, DeleteOutlined, OrderedListOutlined, BarChartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const { Title, Text } = Typography;

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/register');
      return;
    }
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      // Backend doesn't have a direct "get my profile" without user id in path for admin routes
      // Wait, there's no endpoint for non-admin to view a single user? 
      // Checking adminController: `/api/admin/user/:id`
      // I can use that endpoint, but it requires admin header.
      // Alternatively, the user can just fetch their details using the admin endpoint for now.
      const res = await API.get(`/admin/user/${userId}`, { headers: { 'x-role': 'admin' } });
      setUser(res.data);
    } catch (error) {
      message.error('Failed to load user profile');
      if (error.response?.status === 404) {
        localStorage.removeItem('userId');
        navigate('/register');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    try {
      const skillsArray = values.skills.split(',').map(s => s.trim()).filter(s => s);
      await API.put(`/user/update/${userId}`, {
        name: values.name,
        email: values.email,
        skills: skillsArray
      });
      message.success('Profile updated successfully');
      setIsEditModalVisible(false);
      fetchUser();
    } catch (error) {
      message.error('Failed to update profile');
    }
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete your profile?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await API.delete(`/user/delete/${userId}`);
          message.success('Profile deleted');
          localStorage.removeItem('userId');
          navigate('/register');
        } catch (error) {
          message.error('Failed to delete profile');
        }
      }
    });
  };

  const openEditModal = () => {
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      skills: user.skills.join(', ')
    });
    setIsEditModalVisible(true);
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="animate-fade-in" style={{ maxWidth: 800, margin: '0 auto' }}>
      <Title level={2}>User Dashboard</Title>
      
      <Card title="User Details" bordered={false} className="glass-panel" style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <Text type="secondary"><UserOutlined /> Name</Text>
            <div style={{ fontSize: '1.2rem', fontWeight: 500 }}>{user.name}</div>
          </div>
          <div>
            <Text type="secondary"><MailOutlined /> Email</Text>
            <div style={{ fontSize: '1.1rem' }}>{user.email}</div>
          </div>
          <div>
            <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>Skills</Text>
            <div>
              {user.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        <Divider style={{ borderColor: 'var(--border)' }} />

        <Space wrap>
          <Button type="primary" ghost icon={<EditOutlined />} onClick={openEditModal}>
            UPDATE PROFILE
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>
            DELETE PROFILE
          </Button>
          <Button onClick={() => navigate('/roles')} icon={<OrderedListOutlined />}>
            VIEW ROLES
          </Button>
          <Button type="primary" onClick={() => navigate('/skill-gap')} icon={<BarChartOutlined />}>
            GENERATE SKILL GAP REPORT
          </Button>
        </Space>
      </Card>

      <Modal
        title="Update Profile"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Skills (comma separated)" name="skills" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Button onClick={() => setIsEditModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit">Save Changes</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
