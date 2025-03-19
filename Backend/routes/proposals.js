const express = require('express');
const router = express.Router();
const Proposal = require('../models/Proposal');
const authenticateToken = require('../middleware/authenticateToken'); // Correct middleware
const adminMiddleware = require('../middleware/adminMiddleware'); // Correct middleware

// Submit Proposal
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, proposedDate } = req.body;
    const newProposal = new Proposal({
      title,
      description,
      proposedDate,
      submittedBy: req.user.name,
    });
    await newProposal.save();
    res.status(201).json({ message: 'Proposal submitted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// View All Proposals
router.get('/', authenticateToken, async (req, res) => {
  try {
    const proposals = await Proposal.find();
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching proposals' });
  }
});

// Approve / Reject Proposal
router.put('/:id', authenticateToken, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedProposal = await Proposal.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedProposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }
    res.json({ message: 'Proposal status updated!', updatedProposal });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status' });
  }
});

module.exports = router;
