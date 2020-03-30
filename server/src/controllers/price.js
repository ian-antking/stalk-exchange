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

exports.getPrices = (req, res) => {
  const type = req.query.type;
  const search = {};
  if (type) search.type = type;
  Price.find(search, (err, prices) => {
    if (err) res.status(500).send(err);
    res.status(200).json(prices);
  });
}