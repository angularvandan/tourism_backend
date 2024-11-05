// mailer.js
import nodemailer from 'nodemailer';

// Create a transporter object
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your email provider's SMTP server
    port: 587, // Common port for SMTP
    secure: false, // Set to true if using port 465
    auth: {
        user: 'your-email@example.com', // Your email
        pass: 'your-email-password', // Your email password or app password
    },
});

export const sendEmail = async (to:any, subject:any, text:any, html:any) => {
    const mailOptions = {
        from: 'your-email@example.com', // Sender address
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
