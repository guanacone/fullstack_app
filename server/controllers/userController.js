const User = require('../models/user');
const Blacklist = require('../models/blacklist');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { sendEmail } = require('../utils/sendEmail');
const { extractTokenFromHeader, isTokenExpired } = require('../utils/tokenUtil');
const { frontEndURL } = require('../utils/frontEndURL');
const bcrypt = require('bcrypt');

const checkMongoError = (ex) => {
  if (ex.name === 'ValidationError') {
    let errors = {};

    Object.keys(ex.errors).forEach((key) => {
      errors[key] = ex.errors[key].message;
    });

    throw createError(400, JSON.stringify(errors));
  }

  if (ex.name === 'MongoError' && ex.code === 11000) {
    throw createError(400, 'email already registered');
  }
};

// index of all users
exports.indexUser = async (req, res) => {
  const users = await User.find({}).exec();
  return res.json(users);
};

// create new user
exports.createUser = async (req, res) => {
  try {
    const newUser = await new User({
      firstName: req.body.firstName,
      familyName: req.body.familyName,
      email: req.body.email,
      password: req.body.password,
      expireAt: new Date(Date.now() + 6.049e8),
    })
      .save();
    const body = { _id: newUser._id, email: newUser.email };
    const activationToken = jwt.sign({ user: body }, process.env.CONFIRMATION_TOKEN_SECRET, { expiresIn: '7d' });
    const data = {
      from: 'account_activation@rusca.dev',
      to: newUser.email,
      subject: 'Activate your account',
      html: `<p>Please <a href=${frontEndURL}/user/activation?activationToken=${activationToken}>activate your account</a> by following the previous link`,
    };
    await sendEmail(data);
    return res
      .status(201)
      .json({ newUser });
  } catch(err) {
    checkMongoError(err);
    throw err;
  }
};

//activate account
exports.activateAccount = async(req, res) => {
  try {
    if (isTokenExpired(req)) throw createError(401, 'Expired activation token');
    const userinstance = await User.findByIdAndUpdate(
      req.user._id,
      {
        isActivated: true,
        expireAt: null,
      },
      { new: true },
    );
    if (userinstance === null) {
      throw createError(404, 'User not found');
    }
    return res.json(userinstance);
  } catch(err) {
    console.log(err);
  }
};

// show user
exports.showUser = async (req, res) => {
  const userinstance = await User.findById(req.params.id);
  if (userinstance === null) {
    throw createError(404, 'User not found');
  }
  return res.json(userinstance);
};

// update user
exports.updateUser = async (req, res, next) => {
  try {
    const userinstance = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        familyName: req.body.familyName,
        email: req.body.email,
      },
      { new: true },
    );
    if (userinstance === null) {
      throw createError(404, 'User not found');
    }
    return res.json(userinstance);
  } catch(err) {
    next(checkMongoError(err));
  }
};

// update password
exports.updatePassword = async (req, res) => {

  const newHashedPassword = await await bcrypt.hash(req.body.newPassword, 10);

  let user = await User.findById(req.params.id);

  if (user === null) {
    throw createError(404, 'User not found');
  }

  const validate = await user.isValidPassword(req.body.oldPassword);

  if(!validate) {
    throw createError(401, 'Old password does not match');
  }

  user = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: newHashedPassword,
    },
    { new: true },
  );

  return res.json(user);
};

// send reset password link
exports.sendResetPasswordLink = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const body = { _id: user._id, email: user.email };
    const resetToken = jwt.sign({ user: body }, process.env.RESET_TOKEN_SECRET, { expiresIn: '30min' });
    const data = {
      from: 'account_activation@rusca.dev',
      to: user.email,
      subject: 'Reset your password',
      html: `<p>Please reset your password <a href=${frontEndURL}/user/reset_password?resetToken=${resetToken}>here</a>.`,
    };
    await sendEmail(data);
  }
  return res
    .status(201)
    .json({ message: 'If an user with that email exists, and email has been sent.' });
};

// rest password
// exports.

// destroy user
exports.destroyUser = async (req, res) => {
  const deletedUser = await User.findByIdAndRemove(req.params.id);
  if (deletedUser === null) {
    throw createError(404, 'User not found');
  }
  return res.json(deletedUser);
};

// login user
exports.loginUser = async (req, res, next) => {
  passport.authenticate(
    'login',
    async (user, info) => {
      if (!user) {
        const { status, message } = info;
        return res
          .status(status)
          .json({ message });
      }

      req.login(
        user,
        { session: false },
        async (err) => {
          if (err) return next(err);
          const body = { _id: user._id, email: user.email };
          const accessToken = jwt.sign({ user: body }, process.env.TOKEN_SECRET, { expiresIn: 120 });
          const refreshToken = jwt.sign({ user: body }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });
          return res.json({ accessToken, refreshToken, info });
        },
      );
    },
  )(req, res, next);
};

// logout user
exports.logoutUser = async (req, res) => {
  const refreshToken = extractTokenFromHeader(req);
  const { exp } = jwt.decode(refreshToken);
  await new Blacklist({
    refreshToken,
    expireAt: new Date(exp * 1000),

  })
    .save();
  return res
    .status(201)
    .json({ message: 'logged out' });
};

// refresh access token
exports.refreshUser = (req, res) => {
  const { user } = req;
  const body = { _id: user._id, email: user.email };
  const accessToken = jwt.sign({ user: body }, process.env.TOKEN_SECRET, { expiresIn: 120 });
  return res.json({ accessToken });
};