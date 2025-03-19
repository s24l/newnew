const express = require("express");
const router = express.Router();
const Proposal = require("../models/Proposal");
const adminMiddleware = require("../middleware/adminMiddleware");

// Get all proposals for Admin
router.get("/proposals", adminMiddleware, async (req, res) => {
  try {
    const proposals = await Proposal.find();
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ message: "Error fetching proposals" });
  }
});

// Approve proposal
router.put("/proposals/:id/approve", adminMiddleware, async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );
    res.json(proposal);
  } catch (err) {
    res.status(500).json({ message: "Error approving proposal" });
  }
});

// Reject proposal
router.put("/proposals/:id/reject", adminMiddleware, async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" },
      { new: true }
    );
    res.json(proposal);
  } catch (err) {
    res.status(500).json({ message: "Error rejecting proposal" });
  }
});

module.exports = router;
