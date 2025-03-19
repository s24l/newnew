import React, { useState, useEffect } from 'react';
import { getToken } from '../auth';

export default function AdminPanel() {
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);

  useEffect(() => {
    fetch('/api/admin/proposals', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(res => res.json())
      .then(data => setProposals(data))
      .catch(err => console.error(err));
  }, []);

  const handleStatusUpdate = (id, action) => {
    fetch(`/api/admin/proposals/${id}/${action}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(res => res.json())
      .then(updated => {
        setProposals(proposals.map(p => p._id === id ? updated : p));
        setSelectedProposal(null);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4 text-white">Admin Panel</h2>

      {proposals.map(p => (
        <div key={p._id} 
             className="bg-gray-800 p-4 mb-4 rounded cursor-pointer"
             onClick={() => setSelectedProposal(p)}>
          <h3 className="font-bold text-white">{p.title}</h3>
          <p className="text-gray-400">Status: {p.status || "Pending Review"}</p>
        </div>
      ))}

      {/* Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
          <div className="bg-white p-6 rounded shadow-lg w-1/2 relative">
            <h3 className="text-xl font-bold mb-2">{selectedProposal.title}</h3>
            <p className="mb-2">{selectedProposal.description}</p>
            <p className="mb-2">Proposed Date: {new Date(selectedProposal.date).toLocaleDateString()}</p>
            <p className="mb-2">Submitted by: {selectedProposal.submittedBy}</p>
            <p className="mb-4">Status: {selectedProposal.status || "Pending Review"}</p>

            {selectedProposal.status !== "Approved" && selectedProposal.status !== "Rejected" && (
              <div className="flex gap-4">
                <button 
                  onClick={() => handleStatusUpdate(selectedProposal._id, 'approve')}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>
                <button 
                  onClick={() => handleStatusUpdate(selectedProposal._id, 'reject')}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            )}

            <button 
              onClick={() => setSelectedProposal(null)} 
              className="absolute top-2 right-4 text-lg"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
