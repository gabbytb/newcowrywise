const jwt = require("jsonwebtoken");
const { secretKey, expirationTime } =  process.env;




const createJWT = (id) => {
    return jwt.sign({ id }, secretKey, {
        expiresIn: expirationTime,
    });
};



module.exports = createJWT;