require('dotenv').config();
const jwt = require('jsonwebtoken');
function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  console.log(token); //debug
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    // If the token is invalid or expired, send a 401 Unauthorized error
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = authMiddleware;
