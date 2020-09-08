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
