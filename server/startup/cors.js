const cors = require('cors');
require('dotenv').config();

module.exports = (app) => {
  app.use(
    cors({
      origin: process.env.APP_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    }),
  );
};
