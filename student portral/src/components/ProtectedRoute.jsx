import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute checks for a dummy token in localStorage.
 * If present, it allows access to the child component.
 * If not present, it redirects the user to the login page.
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
