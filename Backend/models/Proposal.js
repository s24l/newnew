const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  username: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' } // NEW
});

module.exports = mongoose.model('Proposal', proposalSchema);
