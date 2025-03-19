const express = require("express");
const router = express.Router(); // ✅ Define router here

const authMiddleware = require("../middleware/authMiddleware");  // Import as default
const adminMiddleware = require("../middleware/adminMiddleware"); // Import adminMiddleware as default
const { getAdminProposals } = require("../controllers/adminController");

console.log("getAdminProposals:", getAdminProposals);  // Debugging

// Define the route correctly
router.get("/proposals", authMiddleware, adminMiddleware, getAdminProposals);

module.exports = router;  // ✅ Ensure router is exported
