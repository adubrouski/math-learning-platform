const jwt = require('jsonwebtoken');
const config = require('config');
const tokenCreator = require('../utils/tokenCreator');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Токен недействителен, авторизуйтесь заново' });
  } else {
    jwt.verify(token, config.get('jwt-key'), (err, decoded) => {
      if (err) {
        jwt.verify(req.signedCookies.hashed, config.get('jwt-key'), (err, decoded) => {
          if (err) {
            res.status(401).json({ message: 'Сессия недействительна, авторизуйтесь заново' });
          } else {
            if (decoded.type === 'Refresh') {
              const token = tokenCreator.createAccessToken({
                userId: decoded.userId,
                username: decoded.username,
              });
              req.userData = decoded;
              req.token = token;
              next();
            } else {
              res.status(401).json({ message: 'Сессия недействительна, авторизуйтесь заново' });
            }
          }
        });
      } else {
        req.userData = decoded;
        req.token = token;
        next();
      }
    });
  }
};

module.exports = authMiddleware;
