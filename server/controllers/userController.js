const User = require('../models/user');

// index of all users
exports.indexUser = async (req, res, next) => {
  try {
    const users = await User.find({}).exec();
    return res.json(users);
  } catch(err) {
    next(err);
  }
};

// create new user
exports.createUser = async (req, res, next) => {
  if (!req.body.firstName || !req.body.familyName) {
    return res
      .status(400)
      .json({ message: 'Missing first name or family name' });
  }
  try {
    const newUser = await new User({
      firstName: req.body.firstName,
      familyName: req.body.familyName,
    })
      .save();
    return res
      .status(201)
      .json(newUser);
  } catch(err) {
    next(err);
  }
};

// show user
exports.showUser = async (req, res, next) => {
  try {
    const userinstance = await User.findById(req.params.id);
    if (userinstance === null) {
      return res
        .status(404)
        .json({ message: 'User not found' });
    }
    return res.json(userinstance);
  } catch(err) {
    next(err);
  }
};

// update user
exports.updateUser = async (req, res, next) => {
  if (!req.body.firstName || !req.body.familyName) {
    return res
      .status(400)
      .json({ message: 'Missing first name or family name' });
  }
  try {
    const userinstance = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        familyName: req.body.familyName,
      },
      { new: true },
    );
    if (userinstance === null) {
      return res
        .status(404)
        .json({ message: 'User not found' });
    }
    return res.json(userinstance);
  } catch(err) {
    next(err);
  }
};

// destroy user
exports.destroyUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (deletedUser === null) {
      return res
        .status(404)
        .json({ message: 'User not found' });
    }
    return res.json(deletedUser);
  } catch(err) {
    next(err);
  }
};