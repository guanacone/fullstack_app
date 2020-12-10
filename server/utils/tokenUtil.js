const jwt = require('jsonwebtoken');

exports.isTokenExpired = (req) => {
  const { exp } = jwt.decode(req.query.token);
  return (exp * 1e3) < Date.now() ? true : null;
};