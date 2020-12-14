const mailgun = require('mailgun-js');
const mgApiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const mg = mailgun({ apiKey: mgApiKey, domain });

exports.sendEmail = async (data) => {
  try {
    const body = await mg.messages().send(data);
    console.log(body);
  } catch (error) {
    console.log(error);
  }
};