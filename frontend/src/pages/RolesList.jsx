import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, message, Spin } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const { Title, Text } = Typography;

export default function RolesList() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await API.get('/user/roles');
      setRoles(res.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setRoles([]);
      } else {
        message.error('Failed to load roles');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <Title level={2} style={{ margin: 0 }}>Available Job Roles</Title>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>
      ) : roles.length === 0 ? (
        <Card className="glass-panel" style={{ textAlign: 'center', padding: '40px' }}>
          <Text type="secondary">No roles available at the moment.</Text>
        </Card>
      ) : (
        <Row gutter={[24, 24]}>
          {roles.map(role => (
            <Col xs={24} sm={12} lg={8} key={role._id}>
              <Card 
                title={<span style={{ fontSize: '1.2rem' }}>{role.role}</span>}
                className="glass-panel"
                actions={[
                  <Button type="primary" onClick={() => navigate(`/roles/${role._id}`)} icon={<EyeOutlined />}>
                    VIEW DETAILS
                  </Button>
                ]}
              >
                <div style={{ marginBottom: 8 }}>
                  <Text type="secondary">Required Skills:</Text>
                </div>
                <div style={{ minHeight: '60px' }}>
                  {role.requiredSkills.slice(0, 4).map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                  {role.requiredSkills.length > 4 && (
                    <span className="skill-tag" style={{ background: 'transparent', borderStyle: 'dashed' }}>
                      +{role.requiredSkills.length - 4} more
                    </span>
                  )}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
