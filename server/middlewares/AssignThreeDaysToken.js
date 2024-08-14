const jwt = require("jsonwebtoken");
const { secretKey, expiresInThreeDays } =  process.env;


const assignThreeDaysToken = (id) => {
    return jwt.sign({ id }, secretKey, { expiresIn: expiresInThreeDays });
};
module.exports = assignThreeDaysToken;