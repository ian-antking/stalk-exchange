const Price = require('../models/price');

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

  price.save().then(() => {
    res.status(201).json(price);
  })
    .catch((error) => {
        res.status(500).json(error);
    });
}