import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../context/ProtectedRoute';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import BuyerDashboard from './BuyerDashboard';
import ArtisanDashboard from './ArtisanDashboard';
import MarketingDashboard from './MarketingDashboard';
import AdminDashboard from './AdminDashboard';

// Component to handle role-based routing
const RoleBasedDashboard = () => {
  const { user } = useAuth();
  
  switch (user?.role) {
    case 'buyer':
      return <BuyerDashboard />;
    case 'artisan':
      return <ArtisanDashboard />;
    case 'marketing':
      return <MarketingDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      
      {/* Protected Dashboard Route - Auto-redirects based on role */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <RoleBasedDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Role-specific direct routes with protection */}
      <Route 
        path="/buyer" 
        element={
          <ProtectedRoute allowedRoles={['buyer']}>
            <BuyerDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/artisan" 
        element={
          <ProtectedRoute allowedRoles={['artisan']}>
            <ArtisanDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/marketing" 
        element={
          <ProtectedRoute allowedRoles={['marketing']}>
            <MarketingDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;