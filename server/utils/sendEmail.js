const mailgun = require('mailgun-js');
const mgApiKey = '83953b8460b588a67a3c6e26a5945f22-95f6ca46-b77626b0';
const domain = 'sandboxfc5e54316a7244c1b1b13fe82614124c.mailgun.org';
const mg = mailgun({ apiKey: mgApiKey, domain });

exports.sendEmail = (data) => {
  mg.messages().send(data, (error, body) => {
    console.log(body);
  });
};