const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'member'], // This defines the valid enum values
    default: 'member' // Default value if no role is assigned
  },
});

module.exports = mongoose.model('User', userSchema);
