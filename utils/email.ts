// mailer.js
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();


// Create a transporter object
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your email provider's SMTP server
    port: 587, // Common port for SMTP
    secure: false, // Set to true if using port 465
    auth: {
        user: 'vandankumar94312@gmail.com', // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
    },
});

export const sendEmail = async (to:any, subject:any, text:any, html:any) => {
    const mailOptions = {
        from: 'vandankumar94312@gmail.com', // Sender address
        to, // Recipient address
        subject,
        text, // Plain text body
        html, // HTML body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
