// src/pages/ViewProposals.js
import React, { useEffect, useState } from 'react';
import { getToken } from '../auth'; // Ensure this function retrieves the stored JWT
import { motion, AnimatePresence } from 'framer-motion';

export default function ViewProposals() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const token = getToken();
        const res = await fetch('http://localhost:5000/api/proposals', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch proposals');
        }

        const data = await res.json();
        setProposals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  return (
    <motion.div
      className="bg-gray-900 min-h-screen p-8 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl mb-6 font-bold text-center">Submitted Proposals</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : proposals.length === 0 ? (
        <p className="text-center">No proposals submitted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {proposals.map((proposal) => (
              <motion.div
                key={proposal._id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-2">{proposal.title}</h3>
                <p className="mb-4">{proposal.description}</p>
                <p className="text-sm text-gray-400">
                  Proposed Date:{' '}
                  {new Date(proposal.date).toLocaleDateString('en-GB')}
                </p>
                <p className="text-sm text-gray-400">
                  Submitted by: {proposal.username}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
