const jwt = require('jsonwebtoken');
const tokenCreator = require('../utils/tokenCreator');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const checkToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!req.signedCookies.hashRefresh || !token) {
    res.status(401).json({ message: 'Токен недействителен, авторизуйтесь заново' });
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        jwt.verify(req.signedCookies.hashRefresh, JWT_SECRET, (err, decoded) => {
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

module.exports = checkToken;
