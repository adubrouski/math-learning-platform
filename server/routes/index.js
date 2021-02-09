const auth = require('./auth');
const topics = require('./topics');
const classrooms = require('./classrooms');

module.exports = (app) => {
  app.use('/api/auth', auth);
  app.use('/api/topics', topics);
  app.use('/api/classrooms', classrooms);
};
