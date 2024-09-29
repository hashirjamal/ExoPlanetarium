const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOtions = {
    from: {
      name: "ExoPlanetarium support<support@ExoPlanetarium.com>",
      address: process.env.EMAIL_USER,
    },
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOtions);
};
module.exports = sendEmail;
