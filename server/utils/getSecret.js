const inHeroku = process.env.HEROKU === 'true';

exports.accessTokenSecret = inHeroku ? process.env.TOKEN_SECRET : 'asdf';
exports.refreshTokenSecret = inHeroku ? process.env.REFRESH_TOKEN_SECRET : 'asdf';