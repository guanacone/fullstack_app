const User = require('../models/user');

// return list of all users
exports.userList = async (req, res) => {
  const users = await User.find({}).exec();
  res.json({ users });
};

// return details for a specific user
exports.userDetail = async (req, res) => {
  const userinstance = await User.findById(req.params.id).exec();
  res.json({ userinstance });
};

// create new user
exports.createUser = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    familyName: req.body.familyName,
  });

  user.save((err) => {
    if (err) return console.log(err);
    return res.json(user);
  });
};
