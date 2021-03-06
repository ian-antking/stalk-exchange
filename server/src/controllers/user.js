const User = require('../models/user');
const Price = require('../models/price');

exports.addUser = (req, res) => {
  const { name, island, password, friendCode } = req.body;

  const user = new User({
    name: name.trim(),
    island: island.trim(),
    password,
    friendCode: friendCode.toUpperCase(),
  });

  user
    .save()
    .then(() => {
      res.status(201).json(user.sanitize());
    })
    .catch(error => {
      if(error.errors.friendCode) {
        res.status(400).json(error.errors.friendCode.message);
      } else {
        res.status(500).send(error);
      }

    });
};

exports.getUserById = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  const prices = await Price.find({ user: req.params.id }).lean();
  return user ? res.status(200).json(user.sanitize(prices)) : res.status(500);
};

exports.updateUser = (req, res) => {
  const options = { new: true, useFindAndModify: false };
  User.findByIdAndUpdate(req.authorizer._id, req.body, options, (err, user) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(user.sanitize());
    }
  });
};

exports.getUsers = async (_, res) => {
  const users = await User.find({});
  const prices = await Price.find({}).lean();
  const sanitizedUsers = users.map(user => {
    const userPrices = prices.filter(price => price.user.toString() === user._id.toString())
    return user.sanitize(userPrices)
  });
  res.status(200).json(sanitizedUsers);
};
