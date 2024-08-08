// require nodemailer
const nodemailer = require('nodemailer');

// function to send email
const sendEmail = async (options) => {
    // create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    // create mail options
    const mailOptions = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    // send email
    await transporter.sendMail(mailOptions);
};

// export function
module.exports = sendEmail;