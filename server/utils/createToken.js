const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.createToken = (body, secret, expireTime) => {
  return jwt.sign({ user: body }, secret, { expiresIn: expireTime });
};