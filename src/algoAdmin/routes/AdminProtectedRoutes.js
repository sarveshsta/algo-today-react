import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminProtectedRoute = () => {
  // Check for admin access token in cookies or localStorage
  const token = Cookies.get('adminAccessToken') && localStorage.getItem('adminAccessToken');

  if (!token) {
    // Not authenticated, redirect to admin login
    return <Navigate to="/admin" replace />;
  }

  // Authenticated, render the child route
  return <Outlet />;
};

export default AdminProtectedRoute;
