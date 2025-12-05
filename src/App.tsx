import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { EmergencyStatus } from './types';
import Dashboard from './pages/Dashboard';
import VisitorCheckin from './pages/VisitorCheckin';
import Security from './pages/Security';
import Events from './pages/Events';
import Emergency from './pages/Emergency';
import Volunteers from './pages/Volunteers';
import Reports from './pages/Reports';
import SchoolManagementSystem from './pages/SchoolManagementSystem';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [emergencyStatus, setEmergencyStatus] = useState<EmergencyStatus>({
    active: false,
    type: null,
    startTime: null,
    description: '',
    responseLevel: 'normal'
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  // Check if user is already authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (email: string, password: string) => {
    // In a real app, you would validate credentials with a server
    // For demo purposes, we'll check against registered users
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      console.log('Login successful for:', email);
      setIsAuthenticated(true);
      return true;
    } else {
      // For API login, we assume it was successful since we're navigating to dashboard
      // The token check is already done in the useEffect
      console.log('Login processed for:', email);
      return true;
    }
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  const handleSignup = (userData: any) => {
    // In a real app, you would submit to a server
    // For demo purposes, we'll store in local state
    setUsers([...users, userData]);
    console.log('User registered:', userData);
  };

  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
      <Route path="/login" element={<Login onLogin={handleLogin} setAuth={setIsAuthenticated} />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Protected Routes */}
      <Route path="/" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <Dashboard 
          currentTime={currentTime}
          emergencyStatus={emergencyStatus}
          visitorCount={42}
        />
      </Layout> : <Navigate to="/login" />} />
      
      <Route path="/dashboard" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <Dashboard 
          currentTime={currentTime}
          emergencyStatus={emergencyStatus}
          visitorCount={42}
        />
      </Layout> : <Navigate to="/login" />} />
      
      <Route path="/visitor-checkin" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <VisitorCheckin />
      </Layout> : <Navigate to="/login" />} />
      
      <Route path="/security" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <Security />
      </Layout> : <Navigate to="/login" />} />
      
      <Route path="/events" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <Events />
      </Layout> : <Navigate to="/login" />} />
      
      <Route path="/emergency" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <Emergency emergencyStatus={emergencyStatus} setEmergencyStatus={setEmergencyStatus} />
      </Layout> : <Navigate to="/login" />} />
      
      <Route path="/volunteers" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <Volunteers />
      </Layout> : <Navigate to="/login" />} />
      
      <Route path="/reports" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <Reports />
      </Layout> : <Navigate to="/login" />} />
      
      <Route path="/school-management" element={isAuthenticated ? <Layout onLogout={handleLogout}>
        <SchoolManagementSystem />
      </Layout> : <Navigate to="/login" />} />
      
      {/* Redirect to dashboard if authenticated, otherwise to login */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
};

export default App;