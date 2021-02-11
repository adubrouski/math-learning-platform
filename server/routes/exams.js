const { Router } = require('express');
const Exams = require('../models/exams');
const User = require('../models/user');

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

router.post('/', async (req, res) => {
  const user = await User.findOne({ _id: req.body.userId });

  try {
    await user.addTestResult({ examId: req.body.examId, isPassed: req.body.isPassed });
    res.status(201).json({ message: 'Ваш результат записан!' });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так...' });
  }
});

module.exports = router;
