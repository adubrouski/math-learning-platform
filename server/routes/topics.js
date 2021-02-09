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

    const algebra = data.filter((item) => item.type === 'algebra');
    const geometry = data.filter((item) => item.type === 'geometry');
    res.status(200).json({
      algebra,
      geometry,
    });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так...' });
  }
});

router.get('/topic', async (req, res) => {
  try {
    const topics = await Topics.find().exec();
    const data = topics[0].topics.map((item) => ({
      id: item._id,
      markup: item.markup,
      name: item.name,
    }));

    const topic = data.filter((item) => item.id == req.query.id);
    res.status(200).json({ ...topic[0] });
  } catch (e) {
    res.status(404).json({ message: 'Страница не найдена' });
  }
});

module.exports = router;
