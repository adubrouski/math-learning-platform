const { Router } = require('express');
const Exams = require('../models/exams');

const router = Router();

router.get('/', async (req, res) => {
  const exams = await Exams.find().exec();

  const normalizeExams = exams[0].exams.map(({ _id, topic }) => ({
    id: _id,
    topic,
  }));
  res.status(200).json({ ...normalizeExams });
});

router.get('/exam', async (req, res) => {
  const exams = await Exams.find().exec();

  const normalizeExams = exams[0].exams
    .map(({ _id, topic, questions }) => ({
      id: _id,
      topic,
      questions,
    }))
    .filter((item) => item.id == req.query.id);

  res.status(200).json({ ...normalizeExams[0] });
});

router.post('/exams', async (req, res) => {});

module.exports = router;
