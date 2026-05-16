import React, { useState, useEffect } from 'react';
import { Typography, Table, Button, message, Form, Input, Card, Modal, Row, Col, Space } from 'antd';
import { OrderedListOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import API from '../../api';

const { Title, Text } = Typography;

export default function RolesManagement() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await API.get('/admin/getskills', { headers: { 'x-role': 'admin' } });
      setRoles(res.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setRoles([]);
      } else {
        message.error('Failed to fetch roles');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (values) => {
    try {
      const skillsArray = values.requiredSkills.split(',').map(s => s.trim()).filter(s => s);
      await API.post('/admin/create', {
        role: values.role,
        requiredSkills: skillsArray
      }, { headers: { 'x-role': 'admin' } });
      
      message.success('Role created successfully');
      form.resetFields();
      fetchRoles();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to create role');
    }
  };

  const handleUpdate = async (values) => {
    try {
      const skillsArray = values.requiredSkills.split(',').map(s => s.trim()).filter(s => s);
      await API.put(`/admin/update/${editingRole._id}`, {
        role: values.role,
        requiredSkills: skillsArray
      }, { headers: { 'x-role': 'admin' } });
      
      message.success('Role updated successfully');
      setIsEditModalVisible(false);
      fetchRoles();
    } catch (error) {
      message.error('Failed to update role');
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this role?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      onOk: async () => {
        try {
          await API.delete(`/admin/delete/${id}`, { headers: { 'x-role': 'admin' } });
          message.success('Role deleted successfully');
          fetchRoles();
        } catch (error) {
          message.error('Failed to delete role');
        }
      }
    });
  };

  const openEditModal = (record) => {
    setEditingRole(record);
    editForm.setFieldsValue({
      role: record.role,
      requiredSkills: record.requiredSkills.join(', ')
    });
    setIsEditModalVisible(true);
  };

  const columns = [
    {
      title: 'Role Name',
      dataIndex: 'role',
      key: 'role',
      render: (text, record) => (
        <Button type="link" onClick={() => navigate(`/admin/roles/${record._id}`)} style={{ padding: 0 }}>
          {text}
        </Button>
      )
    },
    {
      title: 'Required Skills',
      key: 'requiredSkills',
      render: (_, record) => (
        <div>
          {record.requiredSkills.slice(0, 3).map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
          {record.requiredSkills.length > 3 && (
            <span className="skill-tag" style={{ background: 'transparent', borderStyle: 'dashed' }}>
              +{record.requiredSkills.length - 3}
            </span>
          )}
        </div>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            ghost 
            icon={<EditOutlined />} 
            onClick={() => openEditModal(record)}
            size="small"
          >
            EDIT
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record._id)}
            size="small"
          >
            DELETE
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Title level={2} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <OrderedListOutlined style={{ color: 'var(--primary)' }} />
        Role Management
      </Title>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={8}>
          <Card title="Create New Role" className="glass-panel">
            <Form form={form} layout="vertical" onFinish={handleCreate}>
              <Form.Item 
                label="Role Name" 
                name="role" 
                rules={[{ required: true, message: 'Please enter a role name' }]}
              >
                <Input placeholder="e.g. Frontend Developer" />
              </Form.Item>
              <Form.Item 
                label="Required Skills" 
                name="requiredSkills" 
                rules={[{ required: true, message: 'Please enter required skills' }]}
                extra="Comma separated (e.g. React, JS, CSS)"
              >
                <Input placeholder="React, JS, CSS" />
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button type="primary" htmlType="submit" block icon={<PlusOutlined />}>
                  CREATE ROLE
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Table 
            dataSource={roles} 
            columns={columns} 
            rowKey="_id" 
            loading={loading}
            className="glass-panel"
            pagination={{ pageSize: 8 }}
          />
        </Col>
      </Row>

      <Modal
        title="Edit Role"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={editForm} layout="vertical" onFinish={handleUpdate}>
          <Form.Item 
            label="Role Name" 
            name="role" 
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Required Skills (comma separated)" 
            name="requiredSkills" 
            rules={[{ required: true }]}
          >
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
