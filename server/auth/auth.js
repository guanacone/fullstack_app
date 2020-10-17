const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { status: 404, message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { status: 401, message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    },
  ),
);