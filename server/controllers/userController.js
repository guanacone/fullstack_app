const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const checkMongoError = (ex) => {
  if (ex.name === 'ValidationError') {
    let errors = {};

    Object.keys(ex.errors).forEach((key) => {
      errors[key] = ex.errors[key].message;
    });

    return createError(400, JSON.stringify(errors));
  }

  if (ex.name === 'MongoError' && ex.code === 11000) {
    return createError(400, 'email already registered');
  }
};


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
  try {
    const newUser = await new User({
      firstName: req.body.firstName,
      familyName: req.body.familyName,
      email: req.body.email,
      password: req.body.password,
    })
      .save();
    return res
      .status(201)
      .json(newUser);
  } catch(err) {
    next(checkMongoError(err));
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
      return res
        .status(404)
        .json({ message: 'User not found' });
    }
    return res.json(userinstance);
  } catch(err) {
    next(checkMongoError(err));
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

// login user
exports.loginUser = async (req, res, next) => {
  passport.authenticate(
    'login',
    async (user, info) => {
      try {
        if (!user) {
          const { status, message } = info;
          return res
            .status(status)
            .json({ message });
        }

        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);

            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, 'TOP_SECRET');

            return res.json({ token, info });
          },
        );
      } catch (error) {
        return next(error);
      }
    },
  )(req, res, next);
};