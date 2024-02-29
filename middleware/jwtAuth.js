require('dotenv').config();

const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    const secretKey = "your-secret-key"
    if (!token) return res.status(401).json({
        success: false,
        message: 'Access denied'
    });
    try {
        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(420).json({
                success: false,
                message: 'Token expired'
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
    }
};

module.exports = verifyToken;