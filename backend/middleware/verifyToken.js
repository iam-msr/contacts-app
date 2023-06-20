const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, authData) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.authData = authData;
    next();
  });
}

module.exports = verifyToken;
