const jwt = require("jsonwebtoken");
// FOR JWT: Replace with a secure, secret key.
const { secretKey, expiresInThreeDays } =  process.env;

// Generate a JWT Using HS256:
const assignThreeDaysToken = (id, email) => {

    // Create a payload
    const payload = {
        id: id,
        email: email,
    };    
    return jwt.sign(payload, secretKey, { algorithm: 'HS256', expiresIn: expiresInThreeDays }); 
};
module.exports = assignThreeDaysToken;