const Proposal = require('../models/Proposal');

const getAdminProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find();
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching proposals' });
  }
};

module.exports = { getAdminProposals };
