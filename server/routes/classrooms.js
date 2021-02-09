const { Router } = require('express');
const Topics = require('../models/topics');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const topics = await Topics.find().exec();
    const data = topics[0].topics.map((item) => ({
      name: item.name,
      id: item._id,
      type: item.type,
      grade: item.grade,
    }));

    res.status(200).json({
      secGrade: data.filter((item) => item.grade === 2),
      thirdGrade: data.filter((item) => item.grade === 3),
      fourthGrade: data.filter((item) => item.grade === 4),
      fifthGrade: data.filter((item) => item.grade === 5),
      sixthGrade: data.filter((item) => item.grade === 6),
      seventhGrade: data.filter((item) => item.grade === 7),
    });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так...' });
  }
});

router.get('/classroom', async (req, res) => {
  try {
    const topics = await Topics.find().exec();
    const data = topics[0].topics.map((item) => ({
      name: item.name,
      id: item._id,
      type: item.type,
      grade: item.grade,
    }));
    const filtered = data.filter((item) => item.grade === +req.query.grade);
    res.status(200).json({ ...filtered });
  } catch (e) {
    req.status(404).json({ message: 'Страницы не найдена' });
  }
});

module.exports = router;
