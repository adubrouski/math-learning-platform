const { Router } = require('express');
const User = require('../models/user');

const router = Router();

router.post('/login', async (req, res) => {
  res.end('placeholder');
});

router.post('/register', async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  try {
    await user.save();
    res.json(req.body);
  } catch (e) {
    res.json({ error: 'Ошибка' });
  }
});

module.exports = router;
