import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated by looking for auth token in localStorage
  const isAuthenticated = localStorage.getItem('authToken') !== null;

  // Optional: Check if token is expired
  const isTokenExpired = () => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  if (!isAuthenticated || isTokenExpired()) {
    // Clear any expired tokens
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 