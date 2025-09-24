const fs = require('fs');
const path = require('path');
const transporter = require("../config/mail.config")


const{GMAIL_USER, APP_NAME} = process.env

exports.sendVerificationEmail = async(to, fullName, code)=>{
    const templatePath = path.join(__dirname, "..", "template", "verification.html");
    let html = fs.readFileSync(templatePath, "utf8");

    html = html
           .replace("{{fullName}}", fullName)
           .replace("{{code}}", code)
           .replace("{{year}}", new Date().getFullYear());


  const mailOptions = {
     from: `${APP_NAME} <${GMAIL_USER}>`,
     to,
     subject: "Verify Your Email",
     html,
  }

  return transporter.sendMail(mailOptions)

}
exports.sendPasswordResetEmail = async(to, fullName, token)=>{
    const templatePath = path.join(__dirname, "..", "template", "passwordReset.html");
    let html = fs.readFileSync(templatePath, "utf8");

      const resetLink = `https://spellahub.com/reset-password?token=${token}&email=${to}`;
    html = html
           .replace("{{fullName}}", fullName)
           .replace("{{code}}", token)
           .replace("{{resetLink}}", resetLink)
           .replace("{{year}}", new Date().getFullYear());


  const mailOptions = {
     from: `${APP_NAME} <${GMAIL_USER}>`,
     to,
     subject: "Reset Password 🔐",
     html,
  }

  return transporter.sendMail(mailOptions)

}


