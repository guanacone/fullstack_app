const jwt = require('jsonwebtoken');

exports.extractTokenFromHeader = (req) => {
  const { authorization } = req.headers;
  const bearer = authorization.split(' ');
  const token = bearer[1];
  return token;
};

exports.isTokenExpired = (req) => {
  const token = this.extractTokenFromHeader(req);
  const { exp } = jwt.decode(token);
  return (exp * 1e3) < Date.now();
};