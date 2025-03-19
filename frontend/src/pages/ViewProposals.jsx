import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const ViewProposals = () => {
  const [proposals, setProposals] = useState([]);
  const { token, role } = useContext(UserContext);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/proposals', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProposals(res.data);
      } catch (err) {
        console.log('Failed to fetch proposals', err);
      }
    };
    if (token) fetchProposals();
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Proposals</h2>
      {proposals.map((proposal) => (
        <div key={proposal._id} className="border p-4 mb-4 rounded shadow">
          <h3 className="text-xl font-bold">{proposal.title}</h3>
          <p>{proposal.description}</p>
          <p>Status: {proposal.status}</p>
          <p>Submitted by: {proposal.submittedBy}</p>
          {role === 'admin' && (
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => updateStatus(proposal._id, 'Approved')}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(proposal._id, 'Rejected')}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  async function updateStatus(id, status) {
    try {
      await axios.put(
        `http://localhost:5000/api/proposals/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh proposals after update
      const res = await axios.get('http://localhost:5000/api/proposals', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProposals(res.data);
    } catch (err) {
      console.log('Error updating proposal status', err);
    }
  }
};

export default ViewProposals;
