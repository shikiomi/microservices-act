const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey'; 

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'Token missing or invalid' });
  }

  jwt.verify(token, secretKey, (err, customer) => {
    if (err) {
      return res.status(403).send({ message: 'Invalid token' });
    }

    req.customer = customer; 
    next(); 
  });
};

module.exports = authenticateToken;