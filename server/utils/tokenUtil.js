const jwt = require('jsonwebtoken');

exports.isTokenExpired = (req) => {
  const { exp } = jwt.decode(req.query.token);
  return ((exp * 1000) < Date.now()) ? true : null;
};