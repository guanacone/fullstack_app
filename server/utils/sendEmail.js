const nodemailer = require('nodemailer');

exports.sendEmail = (receiver, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'login',
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'gilles.rusca@gmail.com',
    to: receiver,
    subject: 'Test mail',
    text: `Sending test email ${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};