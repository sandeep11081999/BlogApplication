const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sandeep.solanki1108@gmail.com",
    pass: "wlrvoxredempejek",
  },
});

module.exports = { transporter };
