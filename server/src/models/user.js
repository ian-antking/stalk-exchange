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
    validate: {
      validator: (code) => /SW-[0-9]{4}-[0-9]{4}-[0-9]{4}/.test(code),
      message: 'invalid friend code',
    },
  },
  dodoCode: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  prices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Price' }],
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
  const { password, friendCode, ...rest } = this.toObject();
  return rest;
};

userSchema.methods.validatePassword = function validatePassword(guess) {
  return bcrypt.compareSync(guess, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
