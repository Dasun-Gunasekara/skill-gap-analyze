import React, { useState, useEffect } from 'react';
import { Typography, Table, Button, message, Modal, Descriptions, Spin } from 'antd';
import { EyeOutlined, TeamOutlined } from '@ant-design/icons';
import API from '../../api';

const { Title } = Typography;

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/admin/users', { headers: { 'x-role': 'admin' } });
      setUsers(res.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setUsers([]);
      } else {
        message.error('Failed to fetch users');
      }
    } finally {
      setLoading(false);
    }
  };

  const viewUserDetails = async (id) => {
    try {
      const res = await API.get(`/admin/user/${id}`, { headers: { 'x-role': 'admin' } });
      setSelectedUser(res.data);
      setIsModalVisible(true);
    } catch (error) {
      message.error('Failed to fetch user details');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<EyeOutlined />} 
          onClick={() => viewUserDetails(record._id)}
          size="small"
        >
          VIEW USER DETAILS
        </Button>
      ),
    },
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Title level={2} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <TeamOutlined style={{ color: 'var(--primary)' }} />
        Users List
      </Title>

      <Table 
        dataSource={users} 
        columns={columns} 
        rowKey="_id" 
        loading={loading}
        className="glass-panel"
        style={{ marginTop: 24 }}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="User Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>
        ]}
        width={600}
      >
        {selectedUser ? (
          <Descriptions column={1} bordered size="small" style={{ marginTop: 16 }}>
            <Descriptions.Item label="Name">{selectedUser.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
            <Descriptions.Item label="Skills">
              {selectedUser.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}><Spin /></div>
        )}
      </Modal>
    </div>
  );
}
