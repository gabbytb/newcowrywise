const requireAUTH = (req, res, next) => {

    
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader || !bearerHeader.startsWith('Bearer ')) {
        const responseData = { 
            success: false, 
            message: "Unauthorized",
        }
        return res.status(401).json(responseData);
    };

    next();
}


module.exports = requireAUTH;