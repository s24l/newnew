const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  username: String,
  status: { type: String, default: 'Pending' } // Add this
});

module.exports = mongoose.model('Proposal', ProposalSchema);
