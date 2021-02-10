const auth = require('./auth');
const topics = require('./topics');
const classrooms = require('./classrooms');
const exams = require('./exams');

module.exports = (app) => {
  app.use('/api/auth', auth);
  app.use('/api/topics', topics);
  app.use('/api/classrooms', classrooms);
  app.use('/api/exams', exams);
};
