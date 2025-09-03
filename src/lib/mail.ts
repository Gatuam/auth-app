import nodemailer from "nodemailer";

const SMTP_SERVER_USERNAME = process.env.APP_USER;
const SMTP_SERVER_PASS = process.env.APP_PASS;
if (!SMTP_SERVER_PASS && !SMTP_SERVER_USERNAME) {
  console.log("please add user, password");
}
const transporter = nodemailer.createTransport({
  secure: false,
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

async function sendMail(to: string, subject: string, html: string) {
  try {
    const info = await transporter.sendMail({
      from: process.env.APP_USER,
      to: to,
      subject: subject,
      html: html,
    });
    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Failed to send mail:", err);
  }
}
export default sendMail;
