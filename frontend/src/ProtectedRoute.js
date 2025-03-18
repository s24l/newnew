import React, { useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from './auth';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  const location = useLocation();
  const hasShownToast = useRef(false); // Ref to control toast

  if (!token) {
    if (!hasShownToast.current) {
      toast.error("You must be logged in to access this page!");
      hasShownToast.current = true;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
