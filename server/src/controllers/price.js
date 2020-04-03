const Price = require('../models/price');
const User = require('../models/user');

exports.addPrice = (req, res) => {
  const { bells, date } = req.body;
  const { type } = req.params;
  const user = req.authorizer._id;

  const priceData = {
    bells,
    type,
    user,
  }

  if (date) priceData.date = date;

  const price = new Price(priceData)

  price.save((err, savedPrice) => {
    err && res.status(500).json(err);
    User.findOneAndUpdate(req.authorizer._id, { latestPrice: savedPrice._id }, { new: true }, (error) => {
      error && res.status(500).send(error);
      res.status(201).json(price);
    })
  });
}

exports.getPrices = (req, res) => {
  const query = req.query;
  Price.find(query)
    .populate('user', '-password')
    .exec((err, prices) => {
      if (err) res.status(500).send(err);
      res.status(200).json(prices);
    })

}