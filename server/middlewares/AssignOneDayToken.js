const jwt = require("jsonwebtoken");
// FOR JWT: Replace with a secure, secret key.
const { secretKey, expiresInOneDay } =  process.env || '!wasinvincibleallalongtheydunno!';   // 32 bytes for AES-256;;

// Generate a JWT Using HS256:
const assignOneDayToken = (id, email) => {

    // Create a payload
    const payload = {
        id: id,
        email: email,
    }
    return jwt.sign(payload, secretKey, { algorithm: 'HS256', expiresIn: expiresInOneDay });
};
module.exports = assignOneDayToken;