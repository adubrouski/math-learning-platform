const jwt = require('jsonwebtoken');

require('dotenv').config();

const protectRoute = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Вы не авторизованы' });
    } else {
      next();
    }
  });
};

module.exports = protectRoute;
