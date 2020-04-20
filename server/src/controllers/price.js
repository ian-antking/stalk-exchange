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
  };

  if (date) priceData.date = date;

  const price = new Price(priceData);

  price
    .save()
    .then((price) => {
      User.findOne(user._id, (_, user) => {
        user.prices.push(price._id);
        user.save().then(() => res.status(201).json(price));
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.getPrices = (req, res) => {
  const query = req.query;
  Price.find(query)
    .populate('user', '-password -friendCode')
    .exec((err, prices) => {
      if (err) res.status(500).send(err);
      res.status(200).json(prices);
    });
};
