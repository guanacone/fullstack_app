const mailgun = require('mailgun.js');
const mgApiKey = process.env.MAILGUN_API_KEY;
const mgDomain = process.env.MAILGUN_DOMAIN;
const mg = mailgun.client({ username: 'api', key: mgApiKey });

exports.sendEmail = async (data) => {
  try {
    const body = await mg.messages.create(mgDomain, data);
    console.log(body);
  } catch (error) {
    console.log(error);
  }
};