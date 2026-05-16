import React, { useState, useEffect } from 'react';
import { Typography, Card, Button, message, Select, Form, Row, Col, Progress, Statistic } from 'antd';
import { BarChartOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const { Title, Text } = Typography;
const { Option } = Select;

export default function SkillGap() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/register');
      return;
    }
    fetchRoles();
  }, [userId]);

  const fetchRoles = async () => {
    try {
      const res = await API.get('/user/roles');
      setRoles(res.data);
    } catch (error) {
      if (error.response?.status !== 404) {
        message.error('Failed to load roles');
      }
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    setReport(null);
    try {
      const res = await API.get(`/user/skillgap/${userId}?role=${encodeURIComponent(values.role)}`);
      setReport(res.data);
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: 900, margin: '0 auto' }}>
      <Title level={2} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <BarChartOutlined style={{ color: 'var(--primary)' }} />
        Skill Gap Analysis
      </Title>
      
      <Card className="glass-panel" style={{ marginBottom: 24 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={16} align="bottom">
            <Col xs={24} sm={18}>
              <Form.Item 
                name="role" 
                label="Select Target Role" 
                rules={[{ required: true, message: 'Please select a role' }]}
                style={{ marginBottom: 0 }}
              >
                <Select size="large" placeholder="Select a role to analyze your skills against">
                  {roles.map(role => (
                    <Option key={role._id} value={role.role}>{role.role}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large" 
                block 
                loading={loading}
                style={{ marginTop: '16px' }}
              >
                GENERATE REPORT
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      {report && (
        <Card className="glass-panel animate-fade-in" title="Analysis Report">
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8} style={{ textAlign: 'center' }}>
              <Progress 
                type="dashboard" 
                percent={parseFloat(report.percentageMatch)} 
                strokeColor={parseFloat(report.percentageMatch) > 70 ? 'var(--secondary)' : parseFloat(report.percentageMatch) > 40 ? '#F59E0B' : 'var(--danger)'}
                size={180}
              />
              <Statistic 
                title="Match Percentage" 
                value={report.percentageMatch} 
                style={{ marginTop: 16 }} 
              />
            </Col>
            <Col xs={24} md={16}>
              <div style={{ marginBottom: 24, padding: 16, background: 'rgba(30, 41, 59, 0.5)', borderRadius: 8 }}>
                <Title level={5} style={{ marginTop: 0, color: 'var(--text-muted)' }}>Recommendation</Title>
                <Text style={{ fontSize: '1.2rem' }}>{report.recommendation}</Text>
              </div>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Card size="small" title={<><CheckCircleOutlined style={{ color: 'var(--secondary)' }}/> Matched Skills</>} style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                    {report.matchedSkills.length > 0 ? (
                      report.matchedSkills.map((skill, index) => (
                        <span key={index} className="skill-tag matched">{skill}</span>
                      ))
                    ) : (
                      <Text type="secondary">None</Text>
                    )}
                  </Card>
                </Col>
                <Col xs={24} sm={12}>
                  <Card size="small" title={<><CloseCircleOutlined style={{ color: 'var(--danger)' }}/> Missing Skills</>} style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)', marginTop: window.innerWidth < 576 ? 16 : 0 }}>
                    {report.missingSkills.length > 0 ? (
                      report.missingSkills.map((skill, index) => (
                        <span key={index} className="skill-tag missing">{skill}</span>
                      ))
                    ) : (
                      <Text type="secondary">None! You're fully qualified.</Text>
                    )}
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
}
