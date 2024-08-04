const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;







const verifyToken = async (token) => {

    try {
        // Verify the token
        const decodedData = await new Promise((resolve, reject) => {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    return reject(err); // Reject if there's an error
                }
                resolve(decoded); // Resolve with decoded data if successful
            });
        });

        // Token is valid and not expired
        console.log('Token is valid:', decodedData);
        // Proceed with your application logic
    } catch (error) {
        // Handle errors
        if (error.name === 'TokenExpiredError') {
            // Token has expired
            console.error('Token has expired.');
        } else if (error.name === 'JsonWebTokenError') {
            // Invalid token
            console.error('Invalid token.');
        } else {
            // Other errors
            console.error('Token verification error:', error.message);
        }
    }

};

module.exports = verifyToken;