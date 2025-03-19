import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import SubmitProposal from './pages/SubmitProposal';
import ViewProposals from './pages/ViewProposals';
import Navbar from './components/Navbar';
import ProtectedRoute from './ProtectedRoute';
import { useUser } from './context/UserContext';

function App() {
  const { loading } = useUser(); // Use loading for preventing flash

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/submit-proposal"
          element={
            <ProtectedRoute>
              <SubmitProposal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-proposals"
          element={
            <ProtectedRoute>
              <ViewProposals />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>
    </>
  );
}

export default App;
