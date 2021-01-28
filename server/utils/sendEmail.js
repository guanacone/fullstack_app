const mailgun = require('mailgun-js');
const mgApiKey = process.env.CONFIRMATION_TOKEN_SECRET;
const domain = process.env.MAILGUN_DOMAIN;
const mg = mailgun({ apiKey: mgApiKey, domain });

exports.sendEmail = (data) => {
  mg.messages().send(data, (error, body) => {
    console.log(body);
  });
};