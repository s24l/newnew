import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SubmitProposalPage from "./pages/SubmitProposal";
import ViewProposalsPage from "./pages/ViewProposals";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
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
