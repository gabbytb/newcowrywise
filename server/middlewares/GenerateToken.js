const jwt = require("jsonwebtoken");
const { secretKey, expiresIn } =  process.env;


const createJWT = (id) => {
    return jwt.sign({ id }, secretKey, { expiresIn: expiresIn });
};
module.exports = createJWT;