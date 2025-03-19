import React from 'react';

const Navbar = () => {
  // Get the user role from localStorage
  const userRole = localStorage.getItem('role');

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <a href="/" className="text-white">Home</a>
        </li>
        <li>
          <a href="/submit-proposal" className="text-white">Submit Proposal</a>
        </li>
        <li>
          <a href="/view-proposals" className="text-white">View Proposals</a>
        </li>
        {/* Conditionally render admin message */}
        {userRole === 'admin' && (
          <li>
            <span className="text-green-500">You are logged in as an Admin</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
