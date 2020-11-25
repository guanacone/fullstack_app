const inHeroku = process.env.HEROKU === 'true';

exports.getSecrets = () => ({
  accessTokenSecret: inHeroku ? process.env.TOKEN_SECRET : 'asdf',
  refreshTokenSecret: inHeroku ? process.env.REFRESH_TOKEN_SECRET: 'asdf',
});