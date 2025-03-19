import { useState, useEffect } from 'react';
import { getToken } from '../auth';

export default function AdminPanel() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetch('/api/admin/proposals', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(res => res.json())
      .then(data => setProposals(data))
      .catch(err => console.error(err));
  }, []);

  const approveProposal = (id) => {
    fetch(`/api/admin/proposals/${id}/approve`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(() => {
        setProposals(proposals.map(p => p._id === id ? { ...p, status: 'Approved' } : p));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Admin Panel</h2>
      {proposals.map(p => (
        <div key={p._id} className="bg-gray-200 p-4 mb-4 rounded">
          <h3 className="font-bold">{p.title}</h3>
          <p>{p.description}</p>
          <p>Status: {p.status || "Pending"}</p>
          {p.status !== "Approved" && (
            <button 
              onClick={() => approveProposal(p._id)} 
              className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
            >
              Approve
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
