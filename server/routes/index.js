const auth = require('./auth');
const topics = require('./topics');
const classrooms = require('./classrooms');
const exams = require('./exams');

const protectRoute = require('../middleware/protectRoute');

module.exports = (app) => {
  app.use('/api/auth', auth);
  app.use('/api/topics', protectRoute, topics);
  app.use('/api/classrooms', protectRoute, classrooms);
  app.use('/api/exams', protectRoute, exams);
};
