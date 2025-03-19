import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../auth";

const Navbar = () => {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };
  // Get the user role from localStorage

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <a href="/submit-proposal" className="text-white">Submit Proposal</a>
        </li>
        <li>
          <a href="/view-proposals" className="text-white">View Proposals</a>
        </li>
        {!token && (
          <>
            <Link to="/register" className={"mx-2 hover:underline text-white"}>
              Register
            </Link>
            <Link to="/login" className="mx-2 hover:underline text-white">
              Login
            </Link>
          </>
        )}
        {token && (
          <button
            onClick={handleLogout}
            className="mx-2 hover:underline bg-red-600 px-2 py-1 rounded"
          >
            Logout
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
