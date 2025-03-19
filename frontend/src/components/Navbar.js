import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="flex justify-between p-4 bg-blue-600 text-white">
      <div className="flex gap-4">
        {user && (
          <>
            <Link to="/submit-proposal">Submit Proposal</Link>
            <Link to="/view-proposals">View Proposals</Link>
          </>
        )}
      </div>
      <div className="flex gap-4">
        {user ? (
          <>
            <span>{user.name} ({user.role})</span>
            <button onClick={handleLogout} className="bg-red-500 px-2 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
