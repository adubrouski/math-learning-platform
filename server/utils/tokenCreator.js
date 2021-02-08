const jwt = require('jsonwebtoken');
const config = require('config');

const createAccessToken = (options) => {
  return jwt.sign(
    {
      type: 'Access',
      ...options,
    },
    config.get('jwt-key'),
    { expiresIn: '30m' },
  );
};

const createRefreshToken = (options) => {
  return jwt.sign(
    {
      type: 'Refresh',
      ...options,
    },
    config.get('jwt-key'),
    { expiresIn: '30d' },
  );
};

module.exports = { createAccessToken, createRefreshToken };
