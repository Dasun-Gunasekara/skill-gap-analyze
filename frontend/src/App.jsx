import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { ConfigProvider, theme, Layout, Menu, Button } from 'antd';
import { UserOutlined, DashboardOutlined, SafetyCertificateOutlined, SettingOutlined } from '@ant-design/icons';
import './index.css';

// User Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RolesList from './pages/RolesList';
import RoleDetails from './pages/RoleDetails';
import SkillGap from './pages/SkillGap';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersManagement from './pages/admin/UsersManagement';
import RolesManagement from './pages/admin/RolesManagement';
import AdminRoleDetails from './pages/admin/AdminRoleDetails';

const { Header, Content, Footer } = Layout;

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <Header className="navbar" style={{ padding: '0 2rem', background: '#1E293B' }}>
      <div className="navbar-brand">
        <SafetyCertificateOutlined />
        <span>SkillGap</span>
      </div>
      <div className="navbar-links">
        {!isAdmin ? (
          <>
            <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
            <Link to="/register" className={`navbar-link ${location.pathname === '/register' ? 'active' : ''}`}>Register</Link>
            <Link to="/login" className={`navbar-link ${location.pathname === '/login' ? 'active' : ''}`}>Login</Link>
            <Link to="/dashboard" className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link>
            <Link to="/roles" className={`navbar-link ${location.pathname === '/roles' ? 'active' : ''}`}>Roles</Link>
            <Link to="/skill-gap" className={`navbar-link ${location.pathname === '/skill-gap' ? 'active' : ''}`}>Skill Gap</Link>
            <Button type="primary" onClick={() => navigate('/admin')} icon={<SettingOutlined />}>Admin Portal</Button>
          </>
        ) : (
          <>
            <Link to="/admin" className={`navbar-link ${location.pathname === '/admin' ? 'active' : ''}`}>Admin Dashboard</Link>
            <Link to="/admin/users" className={`navbar-link ${location.pathname === '/admin/users' ? 'active' : ''}`}>Manage Users</Link>
            <Link to="/admin/roles" className={`navbar-link ${location.pathname === '/admin/roles' ? 'active' : ''}`}>Manage Roles</Link>
            <Button type="default" onClick={() => navigate('/dashboard')} icon={<UserOutlined />}>User Portal</Button>
          </>
        )}
      </div>
    </Header>
  );
}

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#4F46E5',
          colorBgBase: '#0F172A',
          colorBgContainer: '#1E293B',
          colorTextBase: '#F8FAFC',
          borderRadius: 8,
        },
      }}
    >
      <BrowserRouter>
        <Layout className="app-container">
          <Navigation />
          <Content className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/roles" element={<RolesList />} />
              <Route path="/roles/:id" element={<RoleDetails />} />
              <Route path="/skill-gap" element={<SkillGap />} />
              
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UsersManagement />} />
              <Route path="/admin/roles" element={<RolesManagement />} />
              <Route path="/admin/roles/:id" element={<AdminRoleDetails />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center', background: '#0F172A', color: '#94A3B8' }}>
            Skill Gap Analysis System ©{new Date().getFullYear()} Created with Ant Design
          </Footer>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
