const User = require('../models/user');

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

exports.getUserById = (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) res.status(500).send(err);
    res.status(200).json(user.sanitize());
  });
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

exports.getUsers = (_, res) => {
  User.find({})
    .populate('latestPrice')
    .exec((err, users) => {
      if (err) res.status(500).send(err);
      const sanitizedUsers = users.map((user) => user.sanitize());
      res.status(200).json(sanitizedUsers);
    });
};
