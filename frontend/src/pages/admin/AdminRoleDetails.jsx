import React, { useState, useEffect } from 'react';
import { Typography, Card, Button, message, Spin, List } from 'antd';
import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api';

const { Title, Text } = Typography;

export default function AdminRoleDetails() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoleDetails();
  }, [id]);

  const fetchRoleDetails = async () => {
    try {
      const res = await API.get(`/admin/getskill/${id}`, { headers: { 'x-role': 'admin' } });
      setRole(res.data);
    } catch (error) {
      message.error('Failed to load role details');
      navigate('/admin/roles');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>;
  if (!role) return <div>Role not found</div>;

  return (
    <div className="animate-fade-in" style={{ maxWidth: 800, margin: '0 auto' }}>
      <Button 
        type="link" 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/admin/roles')}
        style={{ marginBottom: 24, padding: 0 }}
      >
        BACK TO ROLE MANAGEMENT
      </Button>
      
      <Card className="glass-panel">
        <Title level={2} style={{ marginTop: 0, color: 'var(--primary)' }}>Role Details (Admin)</Title>
        
        <div style={{ marginBottom: 32 }}>
          <Text type="secondary" style={{ fontSize: '1.1rem' }}>Role Name</Text>
          <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{role.role}</div>
        </div>

        <div>
          <Text type="secondary" style={{ fontSize: '1.1rem', display: 'block', marginBottom: 16 }}>
            Required Skills
          </Text>
          <List
            bordered
            dataSource={role.requiredSkills}
            renderItem={skill => (
              <List.Item style={{ borderColor: 'var(--border)' }}>
                <Typography.Text style={{ color: 'var(--text)', fontSize: '1.1rem' }}>
                  <CheckCircleOutlined style={{ color: 'var(--primary)', marginRight: 12 }} />
                  {skill}
                </Typography.Text>
              </List.Item>
            )}
            style={{ borderColor: 'var(--border)', borderRadius: '8px' }}
          />
        </div>
      </Card>
    </div>
  );
}
