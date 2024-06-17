const db = require("../models");
const User = db.users;
const Role = db.roles;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const encryptPassword = require("../middlewares/EncryptPassword");
const createJWT = require("../middlewares/CreateToken");
const nodemailer = require("nodemailer");
const { secretKey, mailServiceProvider, mailServiceUser, mailServicePwd } = process.env;
console.log("***********************************************",
            "\n*********    E-MAIL SERVICE CONFIG    *********",
            `\n\nService Provider: ${mailServiceProvider}`,
            `\nE-mail (Admin): ${mailServiceUser}`);









const sendEmail = () => {

    // Attempt to send email function
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error sending email:', error.message);

            // Implement retry logic here
            if (retryAttempts < maxRetries) {
                console.log(`Retrying... Attempt ${retryAttempts + 1} of ${maxRetries}`);
                retryAttempts++;
                // Retry sending after a delay (e.g., 5 seconds)
                setTimeout(sendEmail, 15000); // Retry after 5 seconds
            } else {
                console.log(`Max retries (${maxRetries}) exceeded. Could not send email.`);
            }
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
};


// Define variables for retry logic
let retryAttempts = 0;
const maxRetries = 3; // Maximum number of retry attempts


// Call the sendEmail function to start sending the email
module.exports = sendEmail();
