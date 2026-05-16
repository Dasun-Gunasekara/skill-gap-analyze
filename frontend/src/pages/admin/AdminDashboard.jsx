import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, Statistic, Spin, message } from 'antd';
import { UserOutlined, SettingOutlined, TeamOutlined, OrderedListOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import API from '../../api';

const { Title } = Typography;

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, roles: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [usersRes, rolesRes] = await Promise.all([
        API.get('/admin/users', { headers: { 'x-role': 'admin' } }).catch(e => e.response?.status === 404 ? { data: [] } : Promise.reject(e)),
        API.get('/admin/getskills', { headers: { 'x-role': 'admin' } }).catch(e => e.response?.status === 404 ? { data: [] } : Promise.reject(e))
      ]);
      
      setStats({
        users: usersRes.data.length,
        roles: rolesRes.data.length
      });
    } catch (error) {
      message.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>;

  return (
    <div className="animate-fade-in" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Title level={2} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--primary)' }}>
        <SettingOutlined /> Admin Dashboard
      </Title>

      <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
        <Col xs={24} sm={12}>
          <Card className="glass-panel" hoverable onClick={() => navigate('/admin/users')}>
            <Statistic 
              title="Total Users" 
              value={stats.users} 
              prefix={<TeamOutlined style={{ color: 'var(--secondary)', marginRight: 8 }} />} 
              valueStyle={{ fontSize: '2.5rem', fontWeight: 600 }}
            />
            <Button type="primary" style={{ marginTop: 24 }} block icon={<TeamOutlined />}>
              MANAGE USERS
            </Button>
          </Card>
        </Col>
        
        <Col xs={24} sm={12}>
          <Card className="glass-panel" hoverable onClick={() => navigate('/admin/roles')}>
            <Statistic 
              title="Total Roles" 
              value={stats.roles} 
              prefix={<OrderedListOutlined style={{ color: 'var(--primary)', marginRight: 8 }} />} 
              valueStyle={{ fontSize: '2.5rem', fontWeight: 600 }}
            />
            <Button type="primary" style={{ marginTop: 24 }} block icon={<OrderedListOutlined />}>
              MANAGE ROLES
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
