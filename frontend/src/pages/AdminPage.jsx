import { useEffect, useState } from 'react';
import { getToken } from '../auth';

export default function AdminPage() {
  const [proposals, setProposals] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch('/api/admin/proposals', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(res => res.json())
      .then(data => setProposals(data))
      .catch(() => setMessage('Error fetching proposals'));
  }, []);

  const handleAction = (id, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this proposal?`)) return;
    
    fetch(`/api/admin/${action}/${id}`, {
      method: 'PUT',
      headers: { 
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setMessage(`Proposal ${action}d successfully!`);
        setProposals(proposals.map(p => p._id === id ? { ...p, status: action } : p));
      })
      .catch(() => setMessage('Error processing request'));
  };

  const filteredProposals = proposals.filter(p =>
    (filter === 'all' || p.status === filter) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) ||
     p.author.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <h1>Admin Panel</h1>
      {message && <p>{message}</p>}
      
      <input 
        type="text" 
        placeholder="Search proposals..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
      
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProposals.map(p => (
            <tr key={p._id}>
              <td>{p.title}</td>
              <td>{p.author}</td>
              <td>{p.status}</td>
              <td>
                {p.status === 'pending' && (
                  <>
                    <button onClick={() => handleAction(p._id, 'approve')}>Approve</button>
                    <button onClick={() => handleAction(p._id, 'reject')}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}