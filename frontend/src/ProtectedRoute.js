import React, { useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken, getUserRole } from '../auth';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = getToken();
  const role = getUserRole();
  const location = useLocation();
  const hasShownToast = useRef(false); // Prevent duplicate toast

  if (!token) {
    if (!hasShownToast.current) {
      toast.error("You must be logged in to access this page!");
      hasShownToast.current = true;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check
  if (roleRequired && role !== roleRequired) {
    if (!hasShownToast.current) {
      toast.error("Access denied: Admins only!");
      hasShownToast.current = true;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
