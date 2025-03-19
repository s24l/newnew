import { useEffect, useState } from 'react';
import { getToken } from '../auth';

export default function AdminPage() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetch('/api/admin/proposals', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(res => res.json())
      .then(data => setProposals(data));
  }, []);

  const handleAction = (id, action) => {
    fetch(`/api/admin/${action}/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(() => window.location.reload());
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Admin Panel - Manage Proposals</h2>
      {proposals.map(p => (
        <div key={p._id} className="border p-4 mb-2 rounded bg-gray-100">
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <p>Date: {p.date}</p>
          <p>Status: {p.status}</p>
          <button onClick={() => handleAction(p._id, 'approve')} className="bg-green-500 px-3 py-1 mr-2 rounded">Approve</button>
          <button onClick={() => handleAction(p._id, 'reject')} className="bg-red-500 px-3 py-1 rounded">Reject</button>
        </div>
      ))}
    </div>
  );
}
