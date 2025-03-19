const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure correct path to User model
const secret = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Replace as per your .env

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token missing' });

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.userId); // Fetch user data
    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user = {
      id: user._id,
      name: user.name,
      role: user.role,
    }; // Attach user info

    next(); // Pass control
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
