
/**
 * @file mailer.js
 * @description this file handles sending verification emails using Nodemailer and an HTML template.
 */


const nodemailer = require("nodemailer")
const fs = require("fs")
const path = require("path")


const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * * Sends a verification email to the specified recipient with a unique code.
 * 
 *@async
 *@function sendVerificationEmail
 *@description sends a verification email to the user with the verification token
 *@param {string} to - the email of the user
 *@param {string} code - the verification token
 *@returns {Promise<void>} - @returns {Promise<void>} - Nothing is returned, but logs the message ID upon success.
 *@throws {Error} Throws an error if the email fails to send or if the template file cannot be read.
 *@example
* await sendVerificationEmail("user@example.com","789456")
*/

async function sendVerificationEmail(to, code) {

    const template_path = path.join(__dirname,"../templates/verification-email.html")
    const template = fs.readFileSync(template_path,"utf-8")

    const html = template
        .replace("{{CODE}}", code)
        .replace("{{YEAR}}", new Date().getFullYear())

    const info = await transporter.sendMail({
        from: `"MyApp" <${process.env.EMAIL_USER}>`,
        to : to,
        subject: "🔐 رمز التحقق من البريد الإلكتروني - MyApp",
        html: html
    });

    console.log("✅ تم إرسال الإيميل:", info.messageId);
}


module.exports = { sendVerificationEmail };
