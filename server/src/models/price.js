const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  bells: {
    type: Number,
    required: true,
  },
  date: {
    type: Number,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }
});

const Price = mongoose.model('Price', priceSchema);

module.exports = Price;
