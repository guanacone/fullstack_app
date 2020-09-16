const User = require('../models/user');

// index of all users
// no error handling as the frontend has no options (maybe add a catch for error 500?)
exports.indexUser = async (req, res) => {
  const users = await User.find({}).exec();
  return res.json({ users });
};

// create new user
exports.createUser = async (req, res) => {
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
    return res
      .status(500)
      .json({ message: 'An error occurred trying to process your request' });
  }
};

// show user
exports.showUser = async (req, res) => {
  try {
    const userinstance = await User.findById(req.params.id);
    if (userinstance === null) {
      return res
        .status(404)
        .json({ message: 'User not found' });
    }
    return res.json(userinstance);
  } catch(err) {
    return res
      .status(500)
      .json({ message: 'An error occurred trying to process your request' });
  }
};

// update user
// no 404 error as frontend allows update only on existing users
exports.updateUser = async (req, res) => {
  if (!req.body.firstName || !req.body.familyName) {
    return res
      .status(400)
      .json({ message: 'Missing first name or family name' });
  }
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        familyName: req.body.familyName,
      },
      { new: true },
    );
    return res.json(user);
  } catch(err) {
    return res
      .status(500)
      .json({ message: 'An error occurred trying to process your request' });
  }
};

// destroy user
// no errors as frontend allows only to destroy existing users
exports.destroyUser = async (req, res) => {
  const deletedUser = await User.findByIdAndRemove(req.params.id);
  return res.json(deletedUser);
};