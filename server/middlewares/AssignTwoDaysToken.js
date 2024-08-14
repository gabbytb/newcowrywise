const jwt = require("jsonwebtoken");
const { secretKey, expiresInTwoDays } =  process.env;


const assignTwoDaysToken = (id) => {
    return jwt.sign({ id }, secretKey, { expiresIn: expiresInTwoDays });
};
module.exports = assignTwoDaysToken;