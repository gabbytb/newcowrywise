const jwt = require("jsonwebtoken");
const { secretKey } = process.env;


const verifyToken = (token) => {
    return jwt.verify(token, secretKey);
}

module.exports = verifyToken;
