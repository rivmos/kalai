// Verify Blacklisted Token
const BlacklistedToken = require('../models/blacklistedToken')

const isTokenBlacklisted = async (token) => {
    const tokenInBlacklist = await BlacklistedToken.findOne({ token });
    return !!tokenInBlacklist;
};

// Example of using it in a middleware
const verifyTokenMiddleware = async (req, res, next) => {
    const token = getTokenFrom(req); // Removed res as it's unnecessary here
    if (!token) {
        return res.status(401).json({ error: 'Token is invalid' });
    }
    const isBlacklisted = await isTokenBlacklisted(token);
    if (isBlacklisted) {
        return res.status(401).json({ error: 'Token is invalid' });
    }

    // Your existing token verification logic here

    next();
};

const getTokenFrom = (request, response) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '');
    }
    return null;
}

module.exports = { getTokenFrom, verifyTokenMiddleware} 