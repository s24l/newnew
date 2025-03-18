import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../auth";

const Navbar = () => {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-between">
      <div className="text-lg font-semibold">Student Club Proposals</div>
      <div>
        <Link to="/view-proposals" className="mx-2 hover:underline">
          View Proposals
        </Link>
        <Link to="/submit-proposal" className="mx-2 hover:underline">
          Submit Proposal
        </Link>

        {!token && (
          <>
            <Link to="/register" className="mx-2 hover:underline">
              Register
            </Link>
            <Link to="/login" className="mx-2 hover:underline">
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
      </div>
    </nav>
  );
};

export default Navbar;
