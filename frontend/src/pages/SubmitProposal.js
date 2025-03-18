import { useState } from 'react';
import { getToken } from '../auth';
import { motion, AnimatePresence } from 'framer-motion';

export default function SubmitProposal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getToken(); // Get token from storage

    if (!token) {
      alert('You must be logged in to submit a proposal');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/proposals', { // Use full URL if frontend runs on port 3000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Important
        },
        body: JSON.stringify({ title, description, date }),
      });

      const data = await res.json();
      if (res.ok) {
        // Clear form
        setTitle('');
        setDescription('');
        setDate('');
        // Show success popup
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      } else {
        alert(data.message || 'Error submitting proposal');
      }
    } catch (err) {
      console.error(err);
      alert('Submission failed');
    }
  };

  return (
    <motion.div 
      className="bg-gray-900 min-h-screen flex justify-center items-center text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl mb-4 text-center font-bold">Submit Proposal</h2>
        <form onSubmit={handleSubmit}>
          <input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Title" 
            required
            className="block w-full mb-3 p-2 rounded bg-gray-700"
          />
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Description"
            required 
            className="block w-full mb-3 p-2 rounded bg-gray-700"
          />
          <input 
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)} 
            required
            className="block w-full mb-3 p-2 rounded bg-gray-700"
          />
          <button 
            type="submit"
            className="bg-blue-500 px-4 py-2 rounded w-full hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>

        {/* Success Popup */}
        <AnimatePresence>
          {showPopup && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed top-10 right-10 bg-green-500 text-white px-4 py-2 rounded shadow-lg"
            >
              Proposal Submitted!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
