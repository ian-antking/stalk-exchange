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