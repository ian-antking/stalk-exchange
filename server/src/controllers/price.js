const Price = require('../models/price');

exports.addPrice = (req, res) => {
  const { bells } = req.body;
  const { type } = req.params;
  const user = req.authorizer._id;

  const price = new Price({
    bells,
    type,
    user,
  })

  price.save().then(() => {
    res.status(201).json(price);
  })
    .catch((error) => {
        res.status(500).json(error);
    });
}