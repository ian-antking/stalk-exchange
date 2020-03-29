const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  friendCode: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: [8, 'Password must be at least 8 characters long'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;