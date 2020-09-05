const User = require('../models/user');

// return list of all Authors.
exports.userList = (req, res) => {
  User.find()
    .exec((err, users) => {
      res.json({ users });
    });
};

// return details for a specific user.
exports.userDetail = (req, res) => {
  User.findById(req.params.id)
    .exec((err, userinstance) => {
      res.json({ userinstance });
    });
};
