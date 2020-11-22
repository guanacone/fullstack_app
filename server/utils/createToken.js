const jwt = require('jsonwebtoken');

exports.createToken = (body, secret, expireTime) => {
  return jwt.sign({ user: body }, secret, { expiresIn: expireTime });
};