const auth = require('./auth');

module.exports = (app) => {
  app.use('/api/auth', auth);
};
