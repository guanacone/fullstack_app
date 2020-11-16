const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const Blacklist = require('../models/blacklist');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const dotenv = require('dotenv');

dotenv.config();

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
          return done(false, { status: 404, message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(false, { status: 401, message: 'Wrong Password' });
        }

        return done(user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  'access token',
  new JWTstrategy(
    {
      secretOrKey: process.env.TOKEN_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

passport.use(
  'refresh token',
  new JWTstrategy(
    {
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    },
    async (req, token, done) => {
      try {
        const { authorization } = req.headers;
        const refreshToken = authorization.split(' ')[1];
        const invalidToken = await Blacklist.findOne({ refreshToken });
        if(invalidToken){
          console.log('in db!!!');
          return done(false, { status: 401, message: 'Blacklisted token' });
        }
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    },
  ),
);