const User = require('../models/user');

// index of all users
exports.indexUser = async (req, res) => {
  const users = await User.find({}).exec();
  res.json({ users });
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

// show user
exports.showUser = async (req, res) => {
  const userinstance = await User.findById(req.params.id).exec();
  res.json({ userinstance });
};

// update user
exports.updateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    firstName: req.body.firstName,
    familyName: req.body.familyName,
  }, { new: true });
  res.send('success');
};

// destroy user
exports.destroyUser = async (req, res) => {
  await User.findByIdAndRemove(req.params.id);
  res.send('success');
};