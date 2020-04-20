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
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.getUserById = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  return user ? res.status(200).json(user.sanitize()) : res.status(500);
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

exports.getUsers = async (req, res) => {
  const query = { _id: req.param.id };
  const users = await User.find(query);
  const sanitizedUsers = users.map(user => {
    return user.sanitize()
  });
  res.status(200).json(sanitizedUsers);
};
