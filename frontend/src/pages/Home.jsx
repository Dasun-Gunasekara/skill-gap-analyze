import React from 'react';
import { Typography, Button, Row, Col, Card } from 'antd';
import { UserAddOutlined, LoginOutlined, SafetyCertificateOutlined, RocketOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in" style={{ padding: '40px 20px', textAlign: 'center' }}>
      <div 
        className="hero-section" 
        style={{
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(15, 23, 42, 1) 100%)',
          borderRadius: '24px',
          padding: '80px 20px',
          marginBottom: '60px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 10 }}>
          <SafetyCertificateOutlined style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '20px' }} />
          <Title style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '20px', background: 'linear-gradient(90deg, #fff, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Empower Your Career
          </Title>
          <Paragraph style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            Identify your skill gaps and unlock your full potential. Our platform connects your current abilities to the industry's most demanding roles.
          </Paragraph>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              type="primary" 
              size="large" 
              icon={<UserAddOutlined />} 
              onClick={() => navigate('/register')}
              style={{ padding: '0 40px', height: '50px', fontSize: '1.1rem' }}
            >
              Get Started
            </Button>
            <Button 
              size="large" 
              icon={<LoginOutlined />} 
              onClick={() => navigate('/login')}
              className="glass-panel"
              style={{ padding: '0 40px', height: '50px', fontSize: '1.1rem', borderColor: 'rgba(255,255,255,0.2)' }}
            >
              Log In
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
