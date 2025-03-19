// frontend/src/components/UserRoleDisplay.js

import React, { useEffect, useState } from 'react';

const UserRoleDisplay = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  return (
    <div className="text-white">
      {userRole ? `Role: ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}` : 'Role: Guest'}
    </div>
  );
};

export default UserRoleDisplay;
