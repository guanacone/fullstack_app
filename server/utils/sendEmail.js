const mailgun = require('mailgun-js');
const mgApiKey = '***REMOVED***';
const domain = 'sandboxfc5e54316a7244c1b1b13fe82614124c.mailgun.org';
const mg = mailgun({ apiKey: mgApiKey, domain });

exports.sendEmail = (data) => {
  mg.messages().send(data, (error, body) => {
    console.log(body);
  });
};