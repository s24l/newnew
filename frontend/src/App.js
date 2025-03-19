import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import the Navbar component
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register"; // Import RegisterPage component
import SubmitProposalPage from "./pages/SubmitProposal";
import ViewProposalsPage from "./pages/ViewProposals";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar /> {/* Add the Navbar here */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* Add this line */}
        <Route 
          path="/submit-proposal" 
          element={
            <ProtectedRoute>
              <SubmitProposalPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/view-proposals" 
          element={
            <ProtectedRoute>
              <ViewProposalsPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<LoginPage />} /> {/* Default */}
      </Routes>
    </Router>
  );
}

export default App;
