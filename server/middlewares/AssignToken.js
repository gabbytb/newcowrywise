const jwt = require("jsonwebtoken");
const { secretKey, expiresIn } =  process.env;


const assignToken = (id) => {
    return jwt.sign({ id }, secretKey, { expiresIn: expiresIn });
};
module.exports = assignToken;