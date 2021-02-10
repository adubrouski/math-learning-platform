const { Router } = require('express');
const Exams = require('../models/exams');

const router = Router();

router.get('/', async (req, res) => {
  const exams = await Exams.find().exec();
  const normalizeExams = exams[0].exams.map((exam) => ({
    exam,
  }));

  res.status(200).json({ ...normalizeExams });
});

module.exports = router;
