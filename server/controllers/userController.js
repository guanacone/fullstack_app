const User = require('../models/user');
const Blacklist = require('../models/blacklist');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const token = require('../utils/createToken');
const { sendEmail } = require('../utils/sendEmail');


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
    })
      .save();
    const body = { _id: newUser._id, email: newUser.email };
    const activationToken = token.createToken(body, process.env.CONFIRMATION_TOKEN_SECRET, '1d');
    const data = {
      from: 'account_activation@sandboxfc5e54316a7244c1b1b13fe82614124c.mailgun.org',
      to: 'gilles.rusca@gmail.com',
      subject: 'Activate your account',
      html: `<a href=http://localhost:1337/api/user/activate_account?token=${activationToken}>Activate your account</a>`,
    };
    sendEmail(data);
    return res
      .status(201)
      .json(newUser);
  } catch(err) {
    checkMongoError(err);
    throw err;
  }
};

//activate account
exports.activateAccount = async(req, res, next) => {
  try {
    const userinstance = await User.findByIdAndUpdate(
      req.user._id,
      {
        isActivated: true,
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
        password: req.body.password,
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
          if (!user.isActivated) {
            return res
              .status(200)
              .json({ user, message: 'User not activated', info });
          }

          const body = { _id: user._id, email: user.email };
          const accessToken = token.createToken(body, process.env.TOKEN_SECRET, 120);
          const refreshToken = token.createToken(body, process.env.REFRESH_TOKEN_SECRET, '1y');

          return res.json({ accessToken, refreshToken, info });
        },
      );
    },
  )(req, res, next);
};

// logout user
exports.logoutUser = async (req, res) => {
  const { authorization } = req.headers;
  const bearer = authorization.split(' ');
  const refreshToken = bearer[1];
  const { exp } = jwt.decode(refreshToken);

  try {
    await new Blacklist({
      refreshToken,
      expireAt: new Date(exp * 1000),

    })
      .save();
    return res
      .status(201)
      .json({ message: 'logged out' });
  }catch(err) {
    checkMongoError(err);
    throw err;
  }
};

// refresh access token
exports.refreshUser = (req, res) => {
  const { user } = req;
  const body = { _id: user._id, email: user.email };
  const accessToken = jwt.sign({ user: body }, process.env.TOKEN_SECRET, { expiresIn: 120 });

  return res.json({ accessToken });
};