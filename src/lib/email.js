const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * sendUserReceiptEmail
 * @param {Object} message { name, email, message, siteName }
 * @returns {Object} mailId
 */
export async function sendUserReceiptEmail(message) {
    let info = await transporter.sendMail({
        from: `"${message.siteName}" <${process.env.SMTP_USER}>`,
        to: message.email, // list of receivers
        subject: `Your inquiry has been received – ${message.siteName}`,
        text: `
            Hello ${message.name},

            Your message to ${message.siteName} has been received.
            You should expect a reply within 2~3 working days.

            Regards,
            ${message.siteName}
        `,
    });

    return info.messageId;
}

/**
 * sendAdminReceiptEmail
 * @param {Object} message { name, email, message, siteName }
 * @returns {Object} mailId
 */
export async function sendAdminReceiptEmail(message) {
    let info = await transporter.sendMail({
        from: `"${message.siteName}" <${process.env.MAIL_NOREPLY}>`,
        to: process.env.SMTP_USER, // list of receivers
        subject: `Customer inquiry received – ${message.siteName}`,
        text: `
            The following inquiry has been received:
            
            Name: ${message.name}
            Email: ${message.email}
            Message: ${message.message}
        `,
    });

    return info.messageId;
}
