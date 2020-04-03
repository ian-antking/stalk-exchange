const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  island: {
    type: String,
    required: true,
  },
  friendCode: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  latestPrice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Price',
  }
});

userSchema.plugin(uniqueValidator);

userSchema.pre('save', function encryptPassword(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    bcrypt.hash(this.password, 10, (error, hash) => {
      if (error) {
        next(error);
      }
      this.password = hash;
      return next();
    });
  }
});

userSchema.methods.sanitize = function sanitize() {
  const { password, ...rest } = this.toObject();
  return rest;
};

userSchema.methods.validatePassword = function validatePassword(guess) {
  return bcrypt.compareSync(guess, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;