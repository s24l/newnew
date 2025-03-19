const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Admin access granted
  } else {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

module.exports = verifyAdmin;
