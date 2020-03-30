const User = require('../models/user');

exports.addUser = (req, res) => {
  const {
    name,
    island,
    password,
    friendCode,
  } = req.body;

  const user = new User({
    name,
    island,
    password,
    friendCode
  });

  user.save().then(() => {
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
  })
}

exports.getUsers = (_, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).send(err);
    const sanitizedUsers = users.map(user => user.sanitize());
    res.status(200).json(sanitizedUsers);
  });
}