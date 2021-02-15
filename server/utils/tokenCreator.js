const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const createAccessToken = (options) => {
  return jwt.sign(
    {
      type: 'Access',
      ...options,
    },
    JWT_SECRET,
    { expiresIn: '15m' },
  );
};

const createRefreshToken = (options) => {
  return jwt.sign(
    {
      type: 'Refresh',
      ...options,
    },
    JWT_SECRET,
    { expiresIn: '30d' },
  );
};

module.exports = { createAccessToken, createRefreshToken };
