const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'yourSecretKey'; 

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token is missing' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }

        req.user = user; 
        next();
    });
}

function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            const requiredRoles = roles.join(', ');
            const userRole = req.user ? req.user.role : 'none';
            return res.status(403).json({
                error: `Access denied: insufficient privileges. Required roles: [${requiredRoles}]. Your role: [${userRole}]`
            });
        }
        next();
    };
}

module.exports = {
    authenticateToken,
    authorizeRoles,
};



