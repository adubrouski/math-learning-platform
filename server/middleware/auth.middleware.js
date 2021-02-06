const jwt = require('jsonwebtoken');
const config = require('config');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Токен недействителен, авторизуйтесь заново' });
  } else {
    jwt.verify(token, config.get('jwt-key'), (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Токен недействителен, авторизуйтесь заново' });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};

module.exports = authMiddleware;
