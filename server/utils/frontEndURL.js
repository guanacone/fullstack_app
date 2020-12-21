exports.frontEndURL = process.env.HEROKU_APP_NAME
  ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
  : 'http://localhost:8000';

console.log(this.frontEndURL);